import React, { useEffect, useRef, useState } from 'react'
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
    Center,
    Textarea,
    Tooltip,
} from "@mantine/core";
import Vector from "../assets/Vector.png"
import Pic from "../assets/intestine.png"
import { MdOutlineEdit, MdOutlineChevronLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { RxCross2, RxReset } from 'react-icons/rx'
import { TbCircleDashedPlus } from 'react-icons/tb'
import { format } from 'date-fns'
import { IconBrush, IconCrop, IconPalette, IconShape, IconSun } from "@tabler/icons-react";
import { FiSave } from 'react-icons/fi';


const ImageEditor = ({ imageSrc, onSave }) => {
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
        }
        else if (shapeStart) {
            applyBrightness(); // Redraw image and all stored shapes
            const previewEnd = { x, y };
            drawShape(ctx, drawMode, shapeStart, previewEnd, penColor, penSize);
        }
    };

    const stopDrawing = (e) => {
        if (drawMode === "pen") {
            ctxRef.current.closePath();
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

        // After applying brightness, re-draw all saved shapes
        shapes.forEach(({ type, start, end, color, size }) => {
            drawShape(ctx, type, start, end, color, size);
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
                    <ActionIcon onClick={applyBrightness} variant="transparent" size="lg">
                        <RxReset size={20} style={{ color: '#ffffff' }} />
                    </ActionIcon>
                </Tooltip>
            </div>
        </div>
    );

};

const SelectPictureReport = () => {
    const navigate = useNavigate();
    const [hoverCard, setHoverCard] = useState(null);
    const [hovervideoCard, setHovervideoCard] = useState(null);

    const [commentModal, setcommentModal] = useState(false);
    const [videocommentModal, setvideocommentModal] = useState(false);
    const [currentComment, setCurrentComment] = useState(""); // For the current comment being entered
    const [currentvideoComment, setCurrentvideoComment] = useState(""); // For the current comment being entered
    const [comments, setComments] = useState([]); // Array to hold comments for each image
    const [videocomments, setvideoComments] = useState([]);
    const imageRefs = useRef([]);
    const [capturedImages, setCapturedImages] = useState([]);
    const [capturedVideos, setCapturedVideos] = useState([]);

    const [fullscreen, setFullScreen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(null); // Track the current image index for the modal
    const [currentVideoIndex, setCurrentVideoIndex] = useState(null); // Track the current image index for the modal
    const [editingIndex, setEditingIndex] = useState(null);
    const [editImageModal, seteditImageModal] = useState(false)
    const selectedPatient = JSON.parse(localStorage.getItem('selectedpatient'));

    useEffect(() => {
        const savedImages = JSON.parse(localStorage.getItem('capturedImages')) || [];
        setCapturedImages(savedImages);

        const savedVideos = JSON.parse(localStorage.getItem('capturedVideos')) || [];
        setCapturedVideos(savedVideos);

        setComments(JSON.parse(localStorage.getItem('imageComments')) || []);
        setvideoComments(JSON.parse(localStorage.getItem('videocomments')) || []);
    }, []);

    const handleSaveImage = (editedImage) => {
        const updatedImages = [...capturedImages];
        updatedImages[editingIndex] = editedImage;
        setCapturedImages(updatedImages);
        localStorage.setItem("capturedImages", JSON.stringify(updatedImages));
        setEditingIndex(null);
    };


    const handleFullscreen = (index) => {
        setFullScreen(true);
        const element = imageRefs.current[index];
        if (element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
    };

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

        // Reset hover state if needed
        if (hoverCard === index) {
            setHoverCard(null);
        }
    };

    const handleDeleteVideo = (index) => {
        const updatedVideos = capturedVideos.filter((_, i) => i !== index);
        const updatedComments = videocomments.filter((_, i) => i !== index);

        localStorage.setItem('capturedVideos', JSON.stringify(updatedVideos));
        localStorage.setItem('videocomments', JSON.stringify(updatedComments));

        setCapturedVideos(updatedVideos);
        setvideoComments(updatedComments);


    };

    const handleAddComment = () => {
        if (currentImageIndex === null) return;

        const updatedComments = [...comments];
        updatedComments[currentImageIndex] = currentComment; // Update comment for the current image

        setComments(updatedComments);
        localStorage.setItem('imageComments', JSON.stringify(updatedComments));
        setCurrentComment(""); // Clear the textarea
        setcommentModal(false);
    };

    const handleAddVideoComment = () => {
        if (currentVideoIndex === null) return;

        const updatedComments = [...videocomments];
        updatedComments[currentVideoIndex] = currentvideoComment; // Update comment for the current image

        setvideoComments(updatedComments);
        localStorage.setItem('videocomments', JSON.stringify(updatedComments));
        setCurrentvideoComment(""); // Clear the textarea
        setvideocommentModal(false);
    };

    const formatDateTime = (date) => {
        let dateString = new Date(date)
        return format(dateString, "dd MMMM yyyy | h:mm a");
    };

    const timer = localStorage.getItem('time')

    return (
        <div>
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

            <Card withBorder m={"xl"} bg={"#EBEDF4"} radius={"1rem"}>
                <Container fluid bg={"#FFFFFF"} p={"1rem"} m={"lg"} style={{ borderRadius: "1rem" }}>
                    {/* Header and Patient Details */}
                    <Group>
                        <ActionIcon variant='light' size={"lg"} onClick={() => navigate("/videocapturing")}><MdOutlineChevronLeft size={20} /></ActionIcon>
                        <Text fz={20} fw={600}>Select Picture & Add Title To Selected Pictures</Text>
                    </Group>
                    <Space h={15} />
                    <Flex justify={"space-between"} align={"center"}>
                        <Group spacing={"sm"}>
                            <MantineImage src={Vector} maw={40} mah={40} />
                            <Text fz={32} fw={600}>Endoscopy</Text>
                        </Group>

                        <Flex direction={"column"} align={"center"}>

                            <Text fz={16} fw={600}>Examine Time</Text>
                            <Text >{timer}</Text>
                        </Flex>

                        <Group>

                            <Button bg='#8158F5' radius={8} onClick={() => navigate("/exportreport")}>Export Report</Button>
                        </Group>
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
                    {/* Other UI Elements */}
                    <Space h={"1rem"} />
                    <SimpleGrid cols={3}>
                        {
                            capturedVideos.map((video, index) => (
                                <Flex direction={"column"} key={index}>
                                    <div
                                        style={{ position: 'relative' }}
                                        onMouseEnter={() => setHovervideoCard(index)}
                                        onMouseLeave={() => setHovervideoCard(null)}
                                    >
                                        <video
                                            src={video.videoUrl}
                                            controls
                                            style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                                        />
                                        {/* <Overlay position="absolute" top={0} left={0} opacity={0} zIndex={1}> */}
                                        {videocommentModal && (
                                            <Overlay pos="absolute" radius={12} top={0} left={0} opacity={0.5}>
                                                {/* <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                                                <ActionIcon
                                                    size={30}
                                                    variant="transparent"
                                                    bg={"white"}
                                                    radius={"50%"}
                                                    onClick={() => handleDeleteVideo(index)}
                                                >
                                                    <RxCross2 color="red" />
                                                </ActionIcon>
                                            </div> */}

                                                <Center h={300} mx={"auto"}>
                                                    {videocommentModal && currentVideoIndex === index ? (
                                                        <Card w={"80%"}>
                                                            <Stack>
                                                                <Group align='center'>
                                                                    <ActionIcon variant='light' onClick={() => setvideocommentModal(false)}><RxCross2 /></ActionIcon>
                                                                    <Text>Video: {index + 1}</Text>
                                                                </Group>
                                                                <Textarea
                                                                    label="Add Name"
                                                                    placeholder='Enter name for the video'
                                                                    value={currentvideoComment}
                                                                    onChange={(e) => setCurrentvideoComment(e.target.value)}
                                                                />
                                                                <Button fz={"sm"} bg='#8158F5' onClick={handleAddVideoComment}>
                                                                    Add Name To Video
                                                                </Button>
                                                            </Stack>
                                                        </Card>
                                                    ) : (
                                                        <>
                                                            <Button color='violet' onClick={() => {
                                                                setvideocommentModal(true)
                                                                setCurrentVideoIndex(index)
                                                                setCurrentvideoComment(videocomments[index] || "")
                                                            }}>Add Name</Button>
                                                        </>
                                                    )}
                                                </Center>

                                            </Overlay>
                                        )}
                                        <div
                                            style={{
                                                position: "absolute",
                                                width: "100%",
                                                top: 0,
                                                zIndex: 1,
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                padding: "5px",
                                            }}
                                        >

                                            <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"} onClick={() => {
                                                setCurrentVideoIndex(index)
                                                setvideocommentModal(true)
                                            }}><MdOutlineEdit color='black' size={23} /></ActionIcon>
                                            <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"} right={"1rem"} onClick={() => handleDeleteVideo(index)}><RxCross2 color='red' size={23} /></ActionIcon>
                                        </div>

                                        {/* <div style={{
                                        position: "absolute",
                                        width: "100%",
                                        zIndex: 1,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "5px",
                                    }}>
                                        <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"} onClick={() => {
                                            setCurrentVideoIndex(index)
                                            setvideocommentModal(true)
                                        }}><MdOutlineEdit color='black' size={23} /></ActionIcon>
                                        <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"} right={"1rem"} onClick={() => handleDeleteVideo(index)}><RxCross2 color='red' size={23} /></ActionIcon>
                                    </div> */}

                                        {/* </Overlay> */}

                                    </div>
                                    <Flex>

                                        {videocomments[index] ? <Text ml={"sm"} fw={600}>{videocomments[index]}</Text> : <Text ml={"lg"} fw={600}>Video: {index + 1}</Text>}
                                    </Flex>
                                </Flex>

                            ))
                        }
                        {capturedImages.map((image, index) => (
                            <Flex direction={"column"} key={index}>
                                <div
                                    style={{ position: 'relative' }}
                                    onMouseEnter={() => setHoverCard(index)}
                                    onMouseLeave={() => setHoverCard(null)}
                                >
                                    <MantineImage
                                        ref={(el) => (imageRefs.current[index] = el)}
                                        src={image}
                                        alt={`Image ${index + 1}`}
                                        width={'100%'}
                                        height={"100%"}
                                        radius={12}
                                    />

                                    {hoverCard === index && (
                                        <Overlay pos="absolute" radius={12} top={0} left={0} opacity={0.5}>
                                            <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                                                <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"} onClick={() => {
                                                    setEditingIndex(index)
                                                    seteditImageModal(true)
                                                }}><MdOutlineEdit color='black' size={23} /></ActionIcon>
                                                <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"} right={"1rem"} onClick={() => handleDeleteImage(index)}><RxCross2 color='red' size={23} /></ActionIcon>
                                            </div>

                                            <Center h={180} mx="auto">
                                                {commentModal && currentImageIndex === index ? (
                                                    <Card w={"80%"}>
                                                        <Stack>
                                                            <Group align='center'>
                                                                <ActionIcon variant='light' onClick={() => setcommentModal(false)}><RxCross2 /></ActionIcon>
                                                                <Text>Image: {index + 1}</Text>
                                                            </Group>
                                                            <Textarea
                                                                label="Comment"
                                                                placeholder='Write a comment'
                                                                value={currentComment}
                                                                onChange={(e) => setCurrentComment(e.target.value)}
                                                            />
                                                            <Button fz={"sm"} bg='#8158F5' onClick={handleAddComment}>
                                                                Add Comment To Image
                                                            </Button>
                                                        </Stack>
                                                    </Card>
                                                ) : (
                                                    <Flex direction={"column"} align={"center"} gap={"xl"}>
                                                        <ActionIcon
                                                            variant='transperant'
                                                            size={100}
                                                            c='white'
                                                            onClick={() => {
                                                                setcommentModal(true);
                                                                setCurrentImageIndex(index);
                                                                setCurrentComment(comments[index] || ""); // Load existing comment if available
                                                            }}
                                                        >
                                                            <TbCircleDashedPlus size={120} />
                                                        </ActionIcon>
                                                        <Button
                                                            variant='transperant'
                                                            bg={"white"}
                                                            c={"black"}
                                                            onClick={() => handleFullscreen(index)}
                                                        >
                                                            See Image
                                                        </Button>
                                                    </Flex>
                                                )}
                                            </Center>
                                        </Overlay>
                                    )}
                                </div>
                                <Flex>

                                    {comments[index] ? <Text ml={"sm"} fw={600}>{comments[index]}</Text> : <Text ml={"lg"} fw={600}>Image: {index + 1}</Text>}
                                </Flex>
                            </Flex>
                        ))}
                    </SimpleGrid>
                </Container>
            </Card>
        </div>
    );
};

export default SelectPictureReport;