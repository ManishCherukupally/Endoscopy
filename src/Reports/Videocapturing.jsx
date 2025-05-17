import React, { useEffect, useRef, useState } from "react";
import {
    ActionIcon,
    Button,
    Card,
    Container,
    Flex,
    Grid,
    Group,
    Image as MantineImage,
    Loader,
    Modal,
    Notification,
    Overlay,
    SimpleGrid,
    Space,
    Text,
    ScrollArea,
    ColorInput,
    Slider,
    Menu,
    Stack,
    ColorSwatch,
    useMantineTheme,
    Tooltip,
} from "@mantine/core";
import Vector from "../assets/Vector.png";
import Pic from "../assets/intestine.png";
import Webcam from "react-webcam";

import { MdFullscreen, MdFullscreenExit, MdOutlineEdit } from "react-icons/md";
import { RxCross2, RxReset } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { BsCameraFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { FaPause } from "react-icons/fa6";
import { format } from "date-fns";
import { IconBrush, IconCrop, IconPalette, IconShape, IconSun } from "@tabler/icons-react";
import { FiSave } from "react-icons/fi";
import { FaStop, FaVideo } from "react-icons/fa";

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
        if (isCropping || (drawMode !== "pen" && !shapeStart)) return;

        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        const ctx = ctxRef.current;

        if (drawMode === "pen" && isDrawing) {
            ctx.lineTo(x, y);
            ctx.stroke();
            currentPath.current.push({ x, y }); // Keep recording
        } else if (shapeStart) {
            applyBrightness();
            const previewEnd = { x, y };
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
        const editedImage = canvasRef.current.toDataURL("image/png");
        onSave(editedImage);
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


const Videocapturing = () => {
    const [notify, setNotify] = useState(false);
    const navigate = useNavigate();
    const [externalDeviceId, setExternalDeviceId] = useState("");
    const [capturedImages, setCapturedImages] = useState([]);
    const [recordingState, setRecordingState] = useState("idle"); // "idle", "recording", "paused"

    const [recordedChunks, setRecordedChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false); // New state to track recording
    const [seconds, setSeconds] = useState(0);
    const [showTimer, setShowTimer] = useState(false);

    const [isFullscreen, setIsFullscreen] = useState(false);

    const [editingIndex, setEditingIndex] = useState(null);
    const [editImageModal, seteditImageModal] = useState(false)
    const [overallseconds, setoverallSeconds] = useState(0);
    const [cancelModal, setcancelModal] = useState(false)
    const [deleteIndex, setdeleteIndex] = useState(null)
    const [deleteVideoIndex, setdeleteVideoIndex] = useState(null)


    const webcamRef = useRef(null);
    const webcamContainerRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const timerRef = useRef(null); // Timer reference to control the interval

    const gridRef = useRef(null);
    const [gridWidth, setGridWidth] = useState(750); // Default width
    const [deleteModal, setdeleteModal] = useState(false)
    const [deleteVideoModal, setdeleteVideoModal] = useState(false)

    const startTimer = () => {
        if (!timerRef.current) {
            timerRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        if (gridRef.current) {
            setGridWidth(gridRef.current.offsetWidth);
        }

        const handleResize = () => {
            if (gridRef.current) {
                setGridWidth(gridRef.current.offsetWidth);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            // setSeconds((prevSeconds) => prevSeconds + 1);
            setoverallSeconds((prevSeconds) => prevSeconds + 1);


        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const overallhours = Math.floor(overallseconds / 3600);
    const overallminutes = Math.floor((overallseconds % 3600) / 60);
    const overalldisplaySeconds = overallseconds % 60;

    // Format time to always show two digits
    const formattedTime = `${String(overallhours).padStart(2, '0')}:${String(overallminutes).padStart(2, '0')}:${String(overalldisplaySeconds).padStart(2, '0')}`;
    localStorage.setItem('time', formattedTime)

    const selectedPatient = JSON.parse(localStorage.getItem("selectedpatient"));

    useEffect(() => {
        const getExternalCamera = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter((device) => device.kind === "videoinput");
                const externalCamera = videoDevices.find(
                    (device) => !device.label.toLowerCase().includes("integrated")
                );

                if (externalCamera) {
                    setExternalDeviceId(externalCamera.deviceId);
                } else if (videoDevices.length > 0) {
                    setExternalDeviceId(videoDevices[0].deviceId);
                }
            } catch (error) {
                console.error("Error accessing media devices:", error);
            }
        };

        getExternalCamera();
    }, []);

    const videoConstraints = {
        width: gridWidth,
        height: 676,
        facingMode: "user",
        deviceId: externalDeviceId,
    };

    useEffect(() => {
        const savedImages = JSON.parse(localStorage.getItem('capturedImages')) || [];
        setCapturedImages(savedImages);

        const savedVideos = JSON.parse(localStorage.getItem('capturedVideos')) || [];
        setRecordedChunks(savedVideos);
    }, []);


    const saveVideosToLocalStorage = (name, videoUrl) => {
        const updatedVideos = [...recordedChunks, { name, videoUrl }];
        setRecordedChunks(updatedVideos);
        localStorage.setItem('capturedVideos', JSON.stringify(updatedVideos));
    };


    const handleCapture = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            const updatedImages = [...capturedImages, imageSrc];
            setCapturedImages(updatedImages);
            localStorage.setItem('capturedImages', JSON.stringify(updatedImages));
        }
    };


    const handleStartRecording = () => {
        if (!mediaRecorderRef.current && webcamRef.current) {
            setSeconds(0);
            setShowTimer(true);
            setRecordingState("recording");

            const stream = webcamRef.current.stream;
            const options = { mimeType: "video/webm" }; // Use webm for better pause support
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorder.start();

            startTimer();
        }
    };

    const handlePauseRecording = () => {
        if (mediaRecorderRef.current && recordingState === "recording") {
            mediaRecorderRef.current.pause();
            stopTimer();
            setRecordingState("paused");
        }
    };

    const handleResumeRecording = () => {
        if (mediaRecorderRef.current && recordingState === "paused") {
            mediaRecorderRef.current.resume();
            startTimer();
            setRecordingState("recording");
        }
    };

    const handleDataAvailable = ({ data }) => {
        if (data.size > 0) {
            const blob = new Blob([data], { type: 'video/webm' });
            const videoUrl = URL.createObjectURL(blob);

            const date = new Date();
            const dateArray = date.toISOString().split(".");
            const dateTime = dateArray[0].split("T");
            const name = `${selectedPatient.patient_name}_${dateTime[0]}${dateTime[1].replace(/:/g, "_")}`;

            saveVideosToLocalStorage(name, videoUrl);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current = null;
        }

        setRecordingState("idle");
        stopTimer();
        setShowTimer(false);
        setSeconds(0);
    };

    // const handleStopCaptureClick = () => {
    //     if (mediaRecorderRef.current) {
    //         mediaRecorderRef.current.stop();
    //     }
    //     setIsRecording(false);
    //     setShowTimer(false); // Hide timer

    //     // Clear the timer and reset the reference
    //     if (timerRef.current) {
    //         clearInterval(timerRef.current);
    //         timerRef.current = null;
    //     }
    // };

    const handleDeleteImage = (index) => {
        window.localStorage.setItem('capturedImages', JSON.stringify(capturedImages.filter((_, i) => i !== index)))

        setCapturedImages(capturedImages.filter((_, i) => i !== index));
        setTimeout(() => {
            setdeleteModal(false)
        }, 300);
    };


    const handleDeleteVideo = (index) => {
        const updatedVideos = recordedChunks.filter((_, i) => i !== index);
        localStorage.setItem('capturedVideos', JSON.stringify(updatedVideos));
        setRecordedChunks(updatedVideos);
        setTimeout(() => {
            setdeleteVideoModal(false)
        }, 300);
    };

    const handleFullscreen = () => {
        if (!isFullscreen) {
            webcamContainerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);




    const formatDateTime = (date) => {
        const dateString = new Date(date);
        return format(dateString, "dd MMMM yyyy | h:mm a");
    };

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const displaySeconds = seconds % 60;

    // Format time to always show two digits
    const videoformattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
    // localStorage.setItem('time', formattedTime)

    // const handleToggleRecording = () => {
    //     if (isRecording) {
    //         handleStopCaptureClick();
    //     } else {
    //         handleStartCaptureClick();
    //     }
    // }

    const handleSaveImage = (editedImage) => {
        const updatedImages = [...capturedImages];
        updatedImages[editingIndex] = editedImage;
        setCapturedImages(updatedImages);
        localStorage.setItem("capturedImages", JSON.stringify(updatedImages));
        setEditingIndex(null);
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
            <Modal opened={deleteVideoModal} onClose={() => setdeleteVideoModal(false)} centered title={'Are you sure?'}>
                You want to delete this video
                <Flex justify={"end"} mt={"1rem"}>
                    <Group>
                        <Button variant="outline" color={"violet"} onClick={() => setdeleteVideoModal(false)}>No</Button>
                        <Button variant="filled" color={"violet"} onClick={() => handleDeleteVideo(deleteVideoIndex)}>Yes</Button>
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

            <Modal opened={cancelModal} onClose={() => setcancelModal(false)} centered title={'Are you sure?'}>
                You want to cancel capturing
                <Flex justify={"end"} mt={"1rem"}>
                    <Group>
                        <Button variant="outline" color={"violet"} onClick={() => setcancelModal(false)}>No</Button>
                        <Button variant="filled" color={"violet"} onClick={() => navigate("/allpatients")}>Yes</Button>
                    </Group>

                </Flex>
            </Modal>
            <Card withBorder m={"xl"} bg={"#EBEDF4"} radius={"1rem"}>
                <Container fluid bg={"#FFFFFF"} p={"1rem"} m={"lg"} style={{ borderRadius: "1rem" }}>
                    <Flex justify={"space-between"} align={"center"}>
                        <Group spacing={"sm"}>
                            <MantineImage src={Vector} maw={40} mah={40} />
                            <Text fz={32} fw={600}>
                                Endoscopy
                            </Text>
                        </Group>

                        <Flex gap={"sm"} align={"center"}>
                            <div
                                className="recording-indicator"
                                title="Recording..."
                                style={{ visibility: isRecording ? "visible" : "hidden" }}
                            ></div>

                            <Text c={"#D94444"} fz={24} fw={600}>
                                {formattedTime}
                            </Text>

                        </Flex>

                        <Group>
                            <Button
                                variant="light"
                                color="red"
                                radius={8}
                                onClick={() => setcancelModal(true)}
                            >
                                Cancel capture
                            </Button>
                            <Button bg="#8158F5" radius={8} onClick={() => navigate("/selectpicture")}>
                                Save & Continue
                            </Button>
                        </Group>
                    </Flex>

                    <Space h={20} />

                    {/* Patient Details Section */}
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

                    {/* Video and Images Section */}
                    <Grid>
                        <Grid.Col span={9} ref={gridRef}>
                            <Flex justify="center" align="center" style={{ height: "100%" }} >
                                <div style={{ position: "relative", width: "100%", height: "auto", display: "flex", justifyContent: "center" }}>
                                    {externalDeviceId ? (
                                        <Flex
                                            ref={webcamContainerRef}
                                            justify={"center"}
                                            align={"center"}
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "15px",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <Webcam
                                                controlsList="nodownload"
                                                ref={webcamRef}
                                                audio={false}
                                                videoConstraints={videoConstraints}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "15px",
                                                }}
                                            />

                                            {/* Fullscreen Button */}

                                            <ActionIcon variant="transparent"
                                                onClick={handleFullscreen}
                                                style={{
                                                    position: "absolute",
                                                    top: "10px",
                                                    right: "15px",
                                                    color: "white",
                                                    padding: "5px",
                                                    cursor: "pointer",
                                                    zIndex: 2,
                                                }}
                                                size="xl"
                                            >
                                                {isFullscreen ? <MdFullscreenExit size={30} /> : <MdFullscreen size={30} />}
                                            </ActionIcon>


                                            {/* Capture & Play/Pause Buttons */}
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: "20px",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    zIndex: 2,
                                                }}
                                            >
                                                <Flex direction="column" align="center">
                                                    {showTimer && (
                                                        <Flex align="center" gap="sm">
                                                            <Text c="#ffffff" fz={18} fw={500}>
                                                                {videoformattedTime}
                                                            </Text>

                                                        </Flex>
                                                    )}

                                                    <Flex gap="md" mt={10}>
                                                        <ActionIcon
                                                            onClick={handleCapture}
                                                            style={{
                                                                backgroundColor: "#8158F5",
                                                                color: "#fff",
                                                            }}
                                                            radius="50%"
                                                            size="4rem"
                                                        >
                                                            <BsCameraFill size={"2.2rem"} />
                                                        </ActionIcon>
                                                        {recordingState === "idle" && (
                                                            <ActionIcon
                                                                style={{ backgroundColor: "#8158F5", color: "#fff" }}
                                                                radius="50%"
                                                                size="4rem"
                                                                onClick={handleStartRecording}
                                                            >
                                                                <FaVideo size={"2.2rem"} />
                                                            </ActionIcon>


                                                        )}

                                                        {recordingState === "recording" && (
                                                            <Group>
                                                                <ActionIcon
                                                                    style={{ backgroundColor: "#8158F5", color: "#fff" }}
                                                                    radius="50%"
                                                                    size="4rem"
                                                                    onClick={handlePauseRecording}
                                                                >
                                                                    <FaPause size={"2.2rem"} />
                                                                </ActionIcon>
                                                                <ActionIcon
                                                                    style={{ backgroundColor: "#8158F5", color: "#fff" }}
                                                                    size="4rem"
                                                                    radius="50%"
                                                                    variant="filled"
                                                                    onClick={handleStopRecording}
                                                                >
                                                                    <FaStop size={"2rem"} />
                                                                </ActionIcon>
                                                            </Group>

                                                        )}

                                                        {recordingState === "paused" && (
                                                            <Group>
                                                                <ActionIcon
                                                                    style={{ backgroundColor: "#8158F5", color: "#fff" }}
                                                                    radius="50%"
                                                                    size="4rem"
                                                                    onClick={handleResumeRecording}
                                                                >
                                                                    <IoPlay size={"2.2rem"} />
                                                                </ActionIcon>
                                                                <ActionIcon
                                                                    style={{ backgroundColor: "#8158F5", color: "#fff" }}
                                                                    size="4rem"
                                                                    radius="50%"
                                                                    variant="filled"
                                                                    onClick={handleStopRecording}
                                                                >
                                                                    <FaStop size={"2rem"} />
                                                                </ActionIcon>
                                                            </Group>

                                                        )}
                                                    </Flex>
                                                </Flex>
                                            </div>

                                        </Flex>


                                    ) : (
                                        <Flex align={"center"} gap={10}>
                                            <Loader color="violet" />
                                            <Text fz={20}>Loading external camera...</Text>
                                        </Flex>
                                    )}
                                </div>
                            </Flex>
                        </Grid.Col>


                        <Grid.Col span={3}>

                            <Card bg={"#EBEDF4"} radius={12} h={676}>
                                <ScrollArea h={650}>
                                    {recordedChunks && <Flex justify={"center"} pb={10}><Text fz={18}> Captured Videos</Text></Flex>}
                                    <SimpleGrid cols={2}>

                                        {recordedChunks.map((video, index) => (
                                            <div key={index} style={{ position: "relative" }}>
                                                <video
                                                    src={video.videoUrl}
                                                    controls
                                                    style={{ width: "100%", borderRadius: "12px" }}
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
                                                        onClick={() => {
                                                            setdeleteVideoIndex(index)
                                                            setdeleteVideoModal(true)
                                                        }}
                                                    >
                                                        <RxCross2 color="red" />
                                                    </ActionIcon>
                                                </div>
                                            </div>
                                        ))}
                                    </SimpleGrid>
                                    {capturedImages && <Flex justify={"center"} py={10}><Text fz={18}> Captured Images</Text></Flex>}
                                    <SimpleGrid cols={2}>
                                        {capturedImages.map((image, index) => (
                                            <div key={index} style={{ position: "relative" }}>
                                                <MantineImage
                                                    src={image}
                                                    alt={`Captured ${index + 1}`}
                                                    radius={12}
                                                    style={{ width: "100%", height: "100%" }}
                                                />
                                                <Overlay position="absolute" top={0} left={0} opacity={0} zIndex={1}>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            padding: "5px",
                                                        }}
                                                    >
                                                        <ActionIcon size={30} variant="transparent" bg={"white"} radius={"50%"}
                                                            onClick={() => {
                                                                setEditingIndex(index)
                                                                seteditImageModal(true)
                                                            }}>
                                                            <MdOutlineEdit color="black" />
                                                        </ActionIcon>
                                                        <ActionIcon
                                                            size={30}
                                                            variant="transparent"
                                                            bg={"white"}
                                                            radius={"50%"}
                                                            onClick={() => {
                                                                setdeleteIndex(index)
                                                                setdeleteModal(true)
                                                            }}
                                                        >
                                                            <RxCross2 color="red" />
                                                        </ActionIcon>
                                                    </div>
                                                </Overlay>
                                            </div>
                                        ))}
                                    </SimpleGrid>
                                </ScrollArea>
                            </Card>

                        </Grid.Col>
                    </Grid>
                </Container>
            </Card>

        </div>
    );
};

export default Videocapturing;
