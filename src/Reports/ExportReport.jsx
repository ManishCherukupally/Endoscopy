import React, { useEffect, useRef, useState } from 'react'
import { ActionIcon, Button, Card, Center, Checkbox, ColorSwatch, Container, Flex, Group, Image as MantineImage, Menu, Modal, Overlay, Radio, Select, SimpleGrid, Slider, Space, Stack, Text, Textarea, TextInput, Tooltip, useMantineTheme } from '@mantine/core'
import Vector from "../assets/Vector.png"
import Pic from "../assets/intestine.png"
import { MdOutlineEdit, MdOutlineChevronLeft, MdArrowDownward, MdAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { RxCross2, RxReset } from 'react-icons/rx'
import { TbCircleDashedPlus, TbPrinter } from 'react-icons/tb'
import { FiChevronDown, FiSave } from 'react-icons/fi'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { hover } from '@testing-library/user-event/dist/hover'
import HospitalCard from '../Components/LoginForm/HospitalCard'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { format } from 'date-fns'
import ReactDOM from 'react-dom/client';


import axios from 'axios'
import client from '../Components/Api'
import { IconBrush, IconCrop, IconPalette, IconShape, IconSun } from '@tabler/icons-react'

const ImageEditor = ({ imageSrc, onSave }) => {
    const [penPaths, setPenPaths] = useState([]);
    const currentPath = useRef([]);

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const imageRef = useRef(null);
    const [drawMode, setDrawMode] = useState("pen"); // "pen", "circle", "rectangle", "square", "triangle", "arrow"
    const [shapeStart, setShapeStart] = useState(null);
    const [shapes, setShapes] = useState([]);

    const [isDrawing, setIsDrawing] = useState(false);
    const [penColor, setPenColor] = useState("black");
    const [penSize, setPenSize] = useState(3);
    const [brightness, setBrightness] = useState(100);

    // Cropping states
    const [isCropping, setIsCropping] = useState(false);
    const [cropStart, setCropStart] = useState(null);
    const [cropEnd, setCropEnd] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;

        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            imageRef.current = image;
            applyBrightness();
        };
    }, [imageSrc]);

    useEffect(() => {
        if (imageRef.current) {
            applyBrightness();
        }
    }, [brightness]);

    const startDrawing = (e) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        if (isCropping) return;

        if (drawMode === "pen") {
            const ctx = ctxRef.current;
            ctx.strokeStyle = penColor;
            ctx.lineWidth = penSize;
            ctx.beginPath();
            ctx.moveTo(x, y);
            currentPath.current = [{ x, y }]; // Start recording path
            setIsDrawing(true);
        } else {
            setShapeStart({ x, y });
        }
    };



    const drawShape = (ctx, type, start, end, color, size) => {
        const { x: startX, y: startY } = start;
        const { x, y } = end;
        const width = x - startX;
        const height = y - startY;

        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.beginPath();

        switch (type) {
            case "rectangle":
                ctx.strokeRect(startX, startY, width, height);
                break;
            case "square":
                const side = Math.min(Math.abs(width), Math.abs(height));
                ctx.strokeRect(startX, startY, Math.sign(width) * side + startX, Math.sign(height) * side + startY);
                break;
            case "circle":
                ctx.ellipse(startX + width / 2, startY + height / 2, Math.abs(width / 2), Math.abs(height / 2), 0, 0, 2 * Math.PI);
                ctx.stroke();
                break;
            case "triangle":
                ctx.moveTo(startX + width / 2, startY);
                ctx.lineTo(startX, startY + height);
                ctx.lineTo(startX + width, startY + height);
                ctx.closePath();
                ctx.stroke();
                break;
            case "arrow":
                drawArrow(ctx, startX, startY, x, y);
                break;
        }
    };


    function drawArrow(ctx, fromX, fromY, toX, toY) {
        const headlen = 10 + penSize * 2;
        const dx = toX - fromX;
        const dy = toY - fromY;
        const angle = Math.atan2(dy, dx);

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 5), toY - headlen * Math.sin(angle - Math.PI / 5));
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 5), toY - headlen * Math.sin(angle + Math.PI / 5));
        ctx.stroke();
    }


    const draw = (e) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        const ctx = ctxRef.current;

        if (isCropping || (drawMode !== "pen" && !shapeStart)) return;

        if (drawMode === "pen" && isDrawing) {
            ctx.lineTo(x, y);
            ctx.stroke();
            currentPath.current.push({ x, y }); // Keep recording
        } else if (shapeStart) {
            const previewEnd = { x, y };

            // Clear canvas and redraw everything (image + previous shapes/paths)
            const canvas = canvasRef.current;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(imageRef.current, 0, 0);

            // Apply brightness again
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                data[i] = data[i] * (brightness / 100);
                data[i + 1] = data[i + 1] * (brightness / 100);
                data[i + 2] = data[i + 2] * (brightness / 100);
            }

            ctx.putImageData(imageData, 0, 0);

            // Redraw existing shapes and pen paths
            shapes.forEach(({ type, start, end, color, size }) => {
                drawShape(ctx, type, start, end, color, size);
            });
            penPaths.forEach(({ points, color, size }) => {
                drawPenPath(ctx, points, color, size);
            });

            // Draw current shape preview
            drawShape(ctx, drawMode, shapeStart, previewEnd, penColor, penSize);
        }
    };


    const stopDrawing = (e) => {
        if (drawMode === "pen" && isDrawing) {
            ctxRef.current.closePath();
            setPenPaths((prev) => [...prev, {
                points: currentPath.current,
                color: penColor,
                size: penSize
            }]);
            currentPath.current = [];
            setIsDrawing(false);
        } else if (shapeStart) {
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            setShapes((prev) => [...prev, {
                type: drawMode,
                start: shapeStart,
                end: { x, y },
                color: penColor,
                size: penSize,
            }]);
            setShapeStart(null);
        }
    };


    const drawPenPath = (ctx, path, color, size) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.beginPath();
        for (let i = 0; i < path.length; i++) {
            const { x, y } = path[i];
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    };



    const applyBrightness = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imageRef.current, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i] * (brightness / 100);
            data[i + 1] = data[i + 1] * (brightness / 100);
            data[i + 2] = data[i + 2] * (brightness / 100);
        }

        ctx.putImageData(imageData, 0, 0);

        // Draw all saved shapes
        shapes.forEach(({ type, start, end, color, size }) => {
            drawShape(ctx, type, start, end, color, size);
        });

        // Draw all saved pen paths
        penPaths.forEach(({ points, color, size }) => {
            drawPenPath(ctx, points, color, size);
        });

    };


    const handleSave = () => {
        const canvas = canvasRef.current;
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.6); // Reduce size & quality
        onSave(compressedDataUrl);
    };


    // ----------- CROP FUNCTIONALITY ------------
    const startCrop = (e) => {
        setIsCropping(true);
        setCropStart({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    };

    const drawCropRectangle = (e) => {
        if (!isCropping || !cropStart) return;

        const ctx = ctxRef.current;
        const x = cropStart.x;
        const y = cropStart.y;
        const width = e.nativeEvent.offsetX - x;
        const height = e.nativeEvent.offsetY - y;

        setCropEnd({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

        // Redraw the image with the overlay crop box
        applyBrightness();

        // Set dashed line
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]); // Dashed line (5px dash, 5px gap)

        ctx.strokeRect(x, y, width, height);

        // Reset line dash to solid for future drawings
        ctx.setLineDash([]);
    };


    const endCrop = () => {
        setIsCropping(false);
    };

    const applyCrop = () => {
        if (!cropStart || !cropEnd) return;

        let x = Math.min(cropStart.x, cropEnd.x);
        let y = Math.min(cropStart.y, cropEnd.y);
        let width = Math.abs(cropEnd.x - cropStart.x);
        let height = Math.abs(cropEnd.y - cropStart.y);

        if (width === 0 || height === 0) {
            console.error("Invalid crop area. Please select a valid crop region.");
            return;
        }

        const originalCanvas = canvasRef.current;
        const originalCtx = originalCanvas.getContext("2d");

        // Create an offscreen canvas to maintain original resolution
        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = imageRef.current.width;
        offscreenCanvas.height = imageRef.current.height;
        const offscreenCtx = offscreenCanvas.getContext("2d");

        // Draw the cropped part at its original resolution
        offscreenCtx.drawImage(
            originalCanvas,
            x, y, width, height, // Source crop area
            0, 0, imageRef.current.width, imageRef.current.height // Destination (scaling up to original size)
        );

        // Replace the original canvas content with the resized cropped image
        originalCtx.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
        originalCtx.drawImage(offscreenCanvas, 0, 0);

        // Reset crop selection
        setCropStart(null);
        setCropEnd(null);
    };

    const theme = useMantineTheme();
    const swatches = Object.keys(theme.colors).map((color) => (
        <ColorSwatch key={color} color={theme.colors[color][6]} />
    ));
    const handleReset = () => {
        // Clear drawings and shapes
        setPenPaths([]);
        setShapes([]);
        setIsDrawing(false);
        setShapeStart(null);

        // Reset brightness
        setBrightness(100);

        // Reset crop
        setCropStart(null);
        setCropEnd(null);
        setIsCropping(false);

        // Re-draw original image at full size
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = imageRef.current;

        if (image) {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
        }
    };


    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <canvas
                ref={canvasRef}
                style={{ cursor: isCropping ? "crosshair" : "default", display: "block" }}
                onMouseDown={isCropping ? startCrop : startDrawing}
                onMouseMove={isCropping ? drawCropRectangle : draw}
                onMouseUp={isCropping ? endCrop : stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <div style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(30, 28, 28, 0.9)",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                zIndex: 10
            }}>

                <Menu shadow="md" width={160} position="left-start" transitionProps={{ transition: 'rotate-right', duration: 150 }}>
                    <Menu.Target>
                        <ActionIcon variant="transparent" size="lg">
                            <IconShape size={20} style={{ color: '#ffffff' }} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Shapes</Menu.Label>
                        <Stack p="xs" gap="xs">
                            {["pen", "circle", "rectangle", "triangle", "arrow"].map((mode) => (
                                <Button color="violet" key={mode} size="xs" variant={drawMode === mode ? "filled" : "light"} onClick={() => setDrawMode(mode)}>
                                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                </Button>
                            ))}
                        </Stack>
                    </Menu.Dropdown>
                </Menu>

                <Menu shadow="md" width={200} position="left-start" transitionProps={{ transition: 'rotate-right', duration: 150 }}>
                    <Menu.Target>
                        <ActionIcon variant="transparent" size="lg">
                            <IconPalette size={20} style={{ color: '#ffffff' }} />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Pen Color</Menu.Label>
                        <div style={{ padding: '10px' }}>
                            {/* <ColorInput
                                value={penColor}
                                onChange={setPenColor}

                                format="hex"
                                swatches={[
                                    '#25262b', '#868e96', '#fa5252', '#e64980',
                                    '#be4bdb', '#7950f2', '#4c6ef5', '#228be6',
                                    '#15aabf', '#12b886', '#40c057', '#82c91e',
                                    '#fab005', '#fd7e14'
                                ]}
                            /> */}
                            <Group position="center" spacing="xs">
                                {Object.keys(theme.colors).map((color) => {
                                    const swatchColor = theme.colors[color][6];
                                    return (
                                        <ColorSwatch
                                            key={color}
                                            color={swatchColor}
                                            onClick={() => setPenColor(swatchColor)}
                                            style={{
                                                cursor: 'pointer',
                                                border: penColor === swatchColor ? '2px solid white' : 'none',
                                            }}
                                        />
                                    );
                                })}
                            </Group>

                        </div>
                    </Menu.Dropdown>
                </Menu>
                <Menu shadow="md" width={180} position="left-start" transitionProps={{ transition: 'rotate-right', duration: 150 }}>
                    <Menu.Target>
                        <ActionIcon variant="transparent" size="lg">
                            <IconBrush size={20} style={{ color: '#ffffff' }} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Pen Size</Menu.Label>
                        <div style={{ padding: '10px' }}>
                            <Slider
                                value={penSize}
                                onChange={setPenSize}
                                min={1}
                                max={10}
                                label="Pen Size"
                            />
                        </div>
                    </Menu.Dropdown>
                </Menu>

                {/* Brightness Menu */}
                <Menu shadow="md" width={180} position="left-start" transitionProps={{ transition: 'rotate-right', duration: 150 }}>
                    <Menu.Target>
                        <ActionIcon variant="transparent" size="lg">
                            <IconSun size={20} style={{ color: '#ffffff' }} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Brightness</Menu.Label>
                        <div style={{ padding: '10px' }}>
                            <Slider
                                value={brightness}
                                onChange={setBrightness}
                                min={50}
                                max={150}
                                label="Brightness"
                            />
                        </div>
                    </Menu.Dropdown>
                </Menu>

                {/* Crop Menu */}
                <Menu shadow="md" width={160} position="left-start" transitionProps={{ transition: 'rotate-right', duration: 150 }}>
                    <Menu.Target >
                        <ActionIcon variant="transparent" size="lg">
                            <IconCrop size={20} style={{ color: '#ffffff' }} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {/* <Menu.Label>Application</Menu.Label> */}
                        <Stack p="xs" gap="xs">
                            <Button
                                onClick={() => setIsCropping(!isCropping)}
                                color="blue"
                                size="xs"
                            >
                                {isCropping ? "Cancel Crop" : "Start Crop"}
                            </Button>
                            {cropStart && cropEnd && (
                                <Button onClick={applyCrop} color="red" size="xs">
                                    Apply Crop
                                </Button>
                            )}
                        </Stack>
                    </Menu.Dropdown>
                </Menu>
                {/* <Button onClick={handleSave} color="green">
                    Save
                </Button> */}

                <ActionIcon variant="transparent" size="lg" onClick={handleSave}><FiSave size={20} style={{ color: '#ffffff' }} /></ActionIcon>
                <Tooltip label='Reset'>
                    <ActionIcon onClick={handleReset} variant="transparent" size="lg">
                        <RxReset size={20} style={{ color: '#ffffff' }} />
                    </ActionIcon>
                </Tooltip>
            </div>
        </div>
    );

};

const ExportReport = () => {
    const navigate = useNavigate()
    // const [hoverCard, setHoverCard] = useState(null)
    // const [commentModal, setcommentModal] = useState(false)
    const [selectImage, setselectImage] = useState(false)
    const [selectVideo, setselectVideo] = useState(false)

    const imageRefs = useRef([]);
    const targetRef = useRef()
    const [selectedImages, setSelectedImages] = useState([]);
    const [capturedImages, setCapturedImages] = useState([]);

    const [capturedVideos, setCapturedVideos] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);




    const [medicationText, setMedicationText] = useState('')
    const [remarksText, setRemarksText] = useState('')
    const [reportModal, setReportModal] = useState(false)

    const [printReport, setPrintReport] = useState(false)

    const selectedPatient = JSON.parse(localStorage.getItem('selectedpatient'))
    const [value, setValue] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [reportId, setReportId] = useState(null)
    const [comments, setComments] = useState([]);

    const [exportbutton, setExportbutton] = useState(true)
    const [editingIndex, setEditingIndex] = useState(null);
    const [editImageModal, seteditImageModal] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [deleteIndex, setdeleteIndex] = useState(null)
    const [preview, setpreview] = useState(false)
    const [deleteVideoModal, setdeleteVideoModal] = useState(false)
    // console.log(value);

    // const [fileModal, setfileModal] = useState(false)
    // const [file, setFile] = useState(null);
    // const selectedPatient = JSON.parse(localStorage.getItem('selectedpatient'))

    // console.log(dateandTime[0]);

    // const handleFullscreen = (index) => {
    //     const element = imageRefs.current[index];
    //     if (element.requestFullscreen) {
    //         element.requestFullscreen();
    //     } else if (element.mozRequestFullScreen) {
    //         element.mozRequestFullScreen(); // Firefox
    //     } else if (element.webkitRequestFullscreen) {
    //         element.webkitRequestFullscreen(); // Chrome, Safari, Opera
    //     } else if (element.msRequestFullscreen) {
    //         element.msRequestFullscreen(); // IE/Edge
    //     }
    // };

    if (selectedImages.length > 0) {
        window.localStorage.setItem('selectedImages', JSON.stringify(selectedImages))
    }
    if (selectedVideos.length > 0) {
        window.localStorage.setItem('selectedVideos', JSON.stringify(selectedVideos))
    }

    useEffect(() => {
        const savedImages = JSON.parse(localStorage.getItem('capturedImages')) || [];
        setCapturedImages(savedImages);

        const savedVideos = JSON.parse(localStorage.getItem('capturedVideos')) || [];
        setCapturedVideos(savedVideos);
        setComments(JSON.parse(localStorage.getItem('imageComments')) || []);

    }, [])

    useEffect(() => {
        if (capturedImages.length > 0) {
            const defaultSelected = capturedImages.slice(0, 5);
            setSelectedImages(defaultSelected);
        }
    }, [capturedImages]);


    useEffect(() => {
        const hasRemarks = remarksText.trim().length > 0;
        const hasMedication = medicationText.trim().length > 0;

        setpreview(selectedImages.length >= 1 && hasRemarks && hasMedication && capturedImages.length >= 1);
    }, [remarksText, medicationText, selectedImages, capturedImages]);

    const handleSaveImage = (editedImage) => {
        const updatedImages = [...capturedImages];
        updatedImages[editingIndex] = editedImage;
        setCapturedImages(updatedImages);
        localStorage.setItem("capturedImages", JSON.stringify(updatedImages));
        setEditingIndex(null);
    };

    const handleCheckboxChange = (image, checked) => {
        setSelectedImages((prev) =>
            checked ? [...prev, image] : prev.filter((item) => item !== image)
        );
    };

    const handleVideoCheckboxChange = (video, checked) => {
        setSelectedVideos((prev) =>
            checked ? [...prev, video] : prev.filter((item) => item !== video)
        );
    };

    const toggleSelectMode = () => {
        if (selectImage) {
            // Exiting select mode: reset to first 5 images only
            const defaultSelected = capturedImages.slice(0, 5);
            setSelectedImages(defaultSelected);
            localStorage.setItem('selectedImages', JSON.stringify(defaultSelected));
        } else {
            // Entering select mode: don't change selection
            localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
        }
        setselectImage(!selectImage);
    };


    const toggleVideoSelectMode = () => {
        // When entering select mode, ensure the previously selected images remain checked
        if (selectedVideos) {
            // Clear the selected images from the local storage and state
            setSelectedVideos([]);
            localStorage.setItem('selectedVideos', JSON.stringify([]));
        }
        setselectVideo(!selectVideo);
    };

    // const toggleSelectMode = () => setselectImage(!selectImage);

    const handleDeleteImage = (index) => {
        // Remove the selected image and its comment
        const updatedImages = capturedImages.filter((_, i) => i !== index);
        const updatedComments = comments.filter((_, i) => i !== index);

        // Update localStorage
        localStorage.setItem('capturedImages', JSON.stringify(updatedImages));
        localStorage.setItem('imageComments', JSON.stringify(updatedComments));
        // Update state
        setCapturedImages(updatedImages);
        setComments(updatedComments);
        setTimeout(() => {
            setdeleteModal(false)
        }, 300);

    };

    const handleDeleteVideo = (index) => {
        const updatedVideos = capturedVideos.filter((_, i) => i !== index);
        localStorage.setItem('capturedVideos', JSON.stringify(updatedVideos));
        setCapturedVideos(updatedVideos);
        setTimeout(() => {
            setdeleteVideoModal(false)
        }, 300);
    };

    const handleDownloadPDF = async (dateTime) => {
        if (targetRef.current) {
            const pdf = new jsPDF();

            // Scale for the PDF page
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Create a temporary div to store all content chunks
            const chunks = document.querySelectorAll('.chunk-class'); // Assuming each chunk has a class `chunk-class`

            for (let i = 0; i < chunks.length; i++) {
                const canvas = await html2canvas(chunks[i]); // Capture each chunk
                const imgData = canvas.toDataURL("image/png");
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;

                const ratio = canvasWidth / canvasHeight;
                const scaledWidth = pdfWidth;
                const scaledHeight = scaledWidth / ratio;

                if (i > 0) pdf.addPage(); // Add a new page for every chunk except the first
                pdf.addImage(imgData, "PNG", 0, 0, scaledWidth, scaledHeight);
            }

            const fileName = `${selectedPatient.patient_name}_${dateTime[0]}${dateTime[1].replace(/:/g, "_")}.pdf`;
            setFileName(fileName);
            pdf.save(fileName);
            const videoFilenames = selectedVideos.map(item => item.name)
            // Save to the server via the API
            client.post('/patient_save_report/', {
                withCredentials: true,
                patient_details_id: selectedPatient.id,
                pdf_file_path: fileName,
                date: dateTime[0],
                time: dateTime[1],
                list_of_video_report: videoFilenames
            }).then((resp) => {
                setReportId(resp.data.report_id);
                console.log(reportId);
                setExportbutton(false)

            });
        }
    };
    // console.log(selectedVideos.map(item => item.name));


    const handleSave = () => {
        setReportModal(true);
        setTimeout(() => {
            var date = new Date()
            var dateArray = date.toISOString().split(".")
            var dateandTime = dateArray[0].split("T")
            console.log(dateandTime);

            handleDownloadPDF(dateandTime); // Call after the modal content is rendered
        }, 600);
        if (selectedImages.length > 0) {
            window.localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
        }

    }
    const handleExportReport = () => {
        if (value === 'mail') {
            client.post("/send-email/", {
                withCredentials: true,
                email: selectedPatient.patient_email,
                name: selectedPatient.patient_name,
                report_id: reportId
            })
                .then((resp) => console.log(resp.data))
        }

        else if (value === 'whatsapp') {
            window.open("https://web.whatsapp.com", "_blank");
        }


    }
    const formatDateTime = (date) => {
        let dateString = new Date(date)
        return format(dateString, "dd MMMM yyyy | h:mm a");
    };

    const handlePrint = () => {
        const originalContent = document.body.innerHTML; // Save the original content of the page

        // Render the HospitalCard in the body for printing
        const selectedImages = JSON.parse(localStorage.getItem('selectedImages')) || [];
        document.body.innerHTML = `
            <div id="printContainer">
                <style>
                    @page { size: auto; margin: 10mm; } /* Optional: Adjust margins for printing */
                    body { margin: 0; padding: 0; }
                </style>
            </div>
        `;

        const printContainer = document.getElementById("printContainer");
        ReactDOM.createRoot(printContainer).render(
            <HospitalCard
                remarks={remarksText}
                medication={medicationText}
                selectedImages={selectedImages}
                comments={comments}
            />
        );

        // Trigger print and restore the page after printing
        setTimeout(() => {
            window.print();
            document.body.innerHTML = originalContent; // Restore the original page content
            window.location.reload(); // Optional: Reload to ensure proper rendering
        }, 500);
    };


    return (
        <div>

            <Modal opened={deleteModal} onClose={() => setdeleteModal(false)} centered title={'Are you sure?'}>
                You want to delete this image
                <Flex justify={"end"} mt={"1rem"}>
                    <Group>
                        <Button variant="outline" color={"violet"} onClick={() => setdeleteModal(false)}>No</Button>
                        <Button variant="filled" color={"violet"} onClick={() => handleDeleteImage(deleteIndex)}>Yes</Button>
                    </Group>

                </Flex>
            </Modal>

            <Modal opened={editImageModal} onClose={seteditImageModal} centered withCloseButton={false} size={"auto"}>
                {editingIndex !== null && (
                    <>
                        <ImageEditor
                            imageSrc={capturedImages[editingIndex]}
                            onSave={(editedImage) => {
                                handleSaveImage(editedImage);
                                seteditImageModal(false); // Close modal after saving
                            }}
                        />
                    </>
                )}
            </Modal>

            <div id="printContainer" style={{ display: "none" }}></div>
            <Modal fullScreen opened={reportModal} onClose={() => setReportModal(false)} closeButtonProps={{ size: "lg" }}>
                <div ref={targetRef}>
                    <HospitalCard comments={comments} remarks={remarksText} medication={medicationText} selectedImages={JSON.parse(localStorage.getItem('selectedImages')) || []} />
                    {/* {printReport && window.print()} */}
                </div>
            </Modal>

            <Card withBorder m={"xl"} bg={"#EBEDF4"} radius={"1rem"}>
                <Container fluid bg={"#FFFFFF"} p={"1rem"} m={"lg"} style={{ borderRadius: "1rem" }} >
                    <Flex justify={"space-between"}>
                        <Group>
                            <ActionIcon variant='light' size={"lg"} onClick={() => navigate("/selectpicture")}><MdOutlineChevronLeft size={20} /></ActionIcon>
                            <Text fz={20} fw={600}>Export Report</Text>
                        </Group>
                        <Button variant='light' color='violet' onClick={() => navigate('/allpatients')}>Get back to all patients</Button>
                    </Flex>
                    <Space h={15} />
                    <Flex justify={"space-between"} align={"center"}>
                        <Group spacing={"sm"}>
                            <MantineImage src={Vector} maw={40} mah={40} />
                            <Text fz={32} fw={600}>Endoscopy</Text>
                        </Group>


                        <Group spacing={"sm"}>
                            {/* <div style={{ border: "1px solid black", borderRadius: 8, padding: "1rem" }}>

                        </div> */}
                            <Button leftIcon={<IoPlayCircleOutline size={"1.2rem"} />} variant='light' color="violet" radius={8} h={44} disabled={!preview}
                                onClick={() => setReportModal(true)}
                            >Preview</Button>
                            <ActionIcon variant='outline' disabled={exportbutton} radius={8} h={44} w={50} size={"lg"} c={"black"}
                                onClick={handlePrint}
                            ><TbPrinter /></ActionIcon>

                            <Button disabled={!preview} color='violet' radius={8} h={44} onClick={handleSave}>Save</Button>

                            <Card withBorder p={'0.3rem'} radius={8} pl={"1rem"} style={{ overflow: "visible", position: "relative" }}>
                                <Flex gap={15} align={"center"}>
                                    <Text fz={14}>Export Report as</Text>
                                    <Select w={100} variant='filled'
                                        placeholder='Select a method'
                                        // value={"Pdf"}
                                        data={[{ value: 'mail', label: 'Mail' },
                                        { value: 'whatsapp', label: 'WhatsApp' }
                                        ]}
                                        value={value}
                                        onChange={setValue}
                                    // dropdownPosition='bottom'
                                    // dropdownComponent={props => (
                                    //     <div
                                    //         {...props}
                                    //         style={{
                                    //             zIndex: 1000, // Ensures dropdown appears on top
                                    //             ...props.style,
                                    //         }}
                                    //     />
                                    // )}
                                    />
                                </Flex>
                            </Card>

                            <Button disabled={exportbutton} color='violet' radius={8} h={44} onClick={() => { handleExportReport() }}>Export</Button>                        </Group>
                    </Flex>

                    <Space h={20} />
                    <Card bg={"#EBEDF4"} radius={12}>
                        <SimpleGrid cols={6}>
                            <Flex direction={"column"}>
                                <Text fw={600}>Name</Text>
                                <Text>{selectedPatient.patient_name}</Text>
                            </Flex>

                            <Flex direction={"column"}>
                                <Text fw={600}>Patient ID</Text>
                                <Text>{selectedPatient.id}</Text>
                            </Flex>

                            <Flex direction={"column"}>
                                <Text fw={600}>Age</Text>
                                <Text>{selectedPatient.age}</Text>
                            </Flex>

                            <Flex direction={"column"}>
                                <Text fw={600}>Sex</Text>
                                <Text>{selectedPatient.gender}</Text>
                            </Flex>

                            <Flex direction={"column"}>
                                <Text fw={600}>Referred by</Text>
                                <Text>{selectedPatient.referred}</Text>
                            </Flex>

                            <Flex direction={"column"}>
                                <Text fw={600}>Date & Time</Text>
                                <Text>{formatDateTime(selectedPatient.updated_at)}</Text>

                            </Flex>
                        </SimpleGrid>
                        <Space h={12} />
                        <SimpleGrid cols={2}>
                            <Flex direction={"column"}>
                                <Text fw={600}>Phone Number</Text>
                                <Text>{selectedPatient.mobile}</Text>
                            </Flex>

                            <Flex direction={"column"}>
                                <Text fw={600}>Email</Text>
                                <Text>{selectedPatient.patient_email}</Text>
                            </Flex>
                        </SimpleGrid>
                    </Card>
                    <Space h={"1rem"} />

                    <Textarea placeholder='Write diagnostic details'
                        label="Diagnostic Details "
                        minRows={3}
                        radius={8}
                        value={remarksText}
                        onChange={(event) => setRemarksText(event.currentTarget.value)}
                    />
                    <Space h={"1rem"} />

                    <Textarea placeholder='Write medication'
                        label="Medication "
                        minRows={3}
                        radius={8}
                        value={medicationText}
                        onChange={(event) => setMedicationText(event.currentTarget.value)}
                    />


                    <Space h={"1rem"} />

                    <Flex align={"center"} justify={selectImage ? "space-between" : "flex-end"}>
                        {selectImage && <Text fz={20} fw={600}>Selected images : {selectedImages.length} </Text>}
                        <Group>
                            {capturedImages.length >= 1 && <Button color='gray' variant='light' radius={"lg"} onClick={() => {
                                toggleVideoSelectMode()
                                toggleSelectMode()
                            }}>{selectImage ? 'Cancel' : 'Select images to export'}</Button>}
                            {/* <ActionIcon variant='light' size={"lg"} radius={12}><MdAdd size={25} /></ActionIcon> */}
                        </Group>
                    </Flex>
                    <Space h={"1rem"} />

                    <>
                        {
                            capturedImages.length >= 1 ? (
                                <SimpleGrid cols={3}>
                                    {/* {
                            capturedVideos.map((video, index) => (
                                <div
                                    key={index}
                                    style={{ position: 'relative' }}

                                >
                                    <video
                                        src={video.videoUrl}
                                        controls
                                        style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                                    />
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            zIndex: 1,
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            padding: "5px",
                                        }}
                                    >
                                        <ActionIcon
                                            size={30}
                                            variant="transparent"
                                            bg={"white"}
                                            radius={"50%"}
                                            onClick={() => handleDeleteVideo(index)}
                                        >
                                            <RxCross2 color="red" />
                                        </ActionIcon>
                                    </div>
                                    {selectVideo && (
                                        <Overlay radius={12} top={0} left={0} opacity={0}>
                                            <Flex justify="flex-end" p={10}>
                                                <Checkbox
                                                    size="lg"
                                                    color="violet"
                                                    checked={selectedVideos.includes(video)} // Check if the image is already selected
                                                    onChange={(e) =>
                                                        handleVideoCheckboxChange(video, e.target.checked)
                                                    }
                                                />
                                            </Flex>
                                        </Overlay>
                                    )}

                                </div>
                            ))
                        } */}

                                    {capturedImages.map((image, index) => (
                                        <div
                                            key={index}
                                            style={{ position: 'relative' }}
                                        >
                                            <MantineImage
                                                ref={(el) => (imageRefs.current[index] = el)}
                                                src={image}
                                                width={'100%'} height={"100%"}
                                                radius={12}
                                            />

                                            <Flex>
                                                {comments[index] ? <Text ml={"sm"} fw={600}>{comments[index]}</Text> : <Text ml={"lg"} fw={600}>Image: {index + 1}</Text>}
                                            </Flex>

                                            {selectImage && (
                                                <Overlay radius={12} top={0} left={0} opacity={0}>
                                                    <Flex justify="flex-end" p={10}>
                                                        <Checkbox
                                                            size="lg"
                                                            color="violet"
                                                            checked={selectedImages.includes(image)} // Check if the image is already selected
                                                            onChange={(e) =>
                                                                handleCheckboxChange(image, e.target.checked)
                                                            }
                                                        />
                                                    </Flex>
                                                </Overlay>
                                            )}
                                            {!selectImage && (
                                                <Overlay pos="absolute" radius={12} top={0} left={0} opacity={0}>
                                                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                                                        <ActionIcon size={46} variant='transparent' bg={"white"} radius={"50%"} onClick={() => {
                                                            setEditingIndex(index)
                                                            seteditImageModal(true)
                                                        }}><MdOutlineEdit color='black' size={23} /></ActionIcon>

                                                        <ActionIcon size={46} variant='transparent' bg={"white"} radius={"50%"} right={"1rem"}
                                                            onClick={() => {
                                                                setdeleteIndex(index)
                                                                setdeleteModal(true)
                                                            }}><RxCross2 color='red' size={23} /></ActionIcon>
                                                    </div>
                                                </Overlay>
                                            )}
                                        </div>
                                    ))}
                                </SimpleGrid>
                            ) : (
                                <Flex justify={"center"}>
                                    <Text fz={18} fw={600} m={"2rem"}>
                                        No captured images!
                                    </Text>
                                </Flex>
                            )

                        }
                    </>

                </Container>
            </Card>
        </div >
    )
}


export default ExportReport
