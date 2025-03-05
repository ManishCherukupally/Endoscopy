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
} from "@mantine/core";
import Vector from "../assets/Vector.png";
import Pic from "../assets/intestine.png";
import Webcam from "react-webcam";

import { MdFullscreen, MdFullscreenExit, MdOutlineEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { BsCameraFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { FaPause } from "react-icons/fa6";
import { format } from "date-fns";

const ImageEditor = ({ imageSrc, onSave }) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;

        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
        };
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
    }, [imageSrc]);

    const startDrawing = (e) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        ctxRef.current.lineTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );
        ctxRef.current.stroke();
    };

    const stopDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    const handleSave = () => {
        const editedImage = canvasRef.current.toDataURL("image/png");
        onSave(editedImage);
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <canvas
                ref={canvasRef}
                style={{ border: "1px solid black", cursor: "crosshair" }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <div style={{ marginTop: "10px" }}>
                <Button onClick={handleSave} color="violet" fullWidth>Save</Button>
            </div>
        </div>
    );
};
const Videocapturing = () => {
    const [notify, setNotify] = useState(false);
    const navigate = useNavigate();
    const [externalDeviceId, setExternalDeviceId] = useState("");
    const [capturedImages, setCapturedImages] = useState([]);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false); // New state to track recording
    const [seconds, setSeconds] = useState(0);
    const [showTimer, setShowTimer] = useState(false);

    const [isFullscreen, setIsFullscreen] = useState(false);

    const [editingIndex, setEditingIndex] = useState(null);
    const [editImageModal, seteditImageModal] = useState(false)
    const [overallseconds, setoverallSeconds] = useState(0);
    const [cancelModal, setcancelModal] = useState(false)
    const webcamRef = useRef(null);
    const webcamContainerRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const timerRef = useRef(null); // Timer reference to control the interval

    const gridRef = useRef(null);
    const [gridWidth, setGridWidth] = useState(750); // Default width

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
            setSeconds((prevSeconds) => prevSeconds + 1);
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


    const handleStartCaptureClick = () => {
        if (!isRecording) { // Prevent multiple intervals
            setIsRecording(true);
            setShowTimer(true); // Show timer
            setSeconds(0); // Reset timer to 00:00:00

            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, { mimeType: "video/mp4" });
            mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
            mediaRecorderRef.current.start();

            // Start the timer only if it isn't already running
            if (!timerRef.current) {
                timerRef.current = setInterval(() => {
                    setSeconds((prevSeconds) => prevSeconds);
                }, 1000);
            }
        }
    };

    const handleDataAvailable = ({ data }) => {
        if (data.size > 0) {
            const blob = new Blob([data], { type: 'video/mp4' });
            const videoUrl = URL.createObjectURL(blob);

            var date = new Date()
            var dateArray = date.toISOString().split(".")
            var dateTime = dateArray[0].split("T")
            const name = `${selectedPatient.patient_name}_${dateTime[0]}${dateTime[1].replace(/:/g, "_")}`

            saveVideosToLocalStorage(name, videoUrl);

        }
    };

    const handleStopCaptureClick = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
        setShowTimer(false); // Hide timer

        // Clear the timer and reset the reference
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const handleDeleteImage = (index) => {
        window.localStorage.setItem('capturedImages', JSON.stringify(capturedImages.filter((_, i) => i !== index)))

        setCapturedImages(capturedImages.filter((_, i) => i !== index));
    };


    const handleDeleteVideo = (index) => {
        const updatedVideos = recordedChunks.filter((_, i) => i !== index);
        localStorage.setItem('capturedVideos', JSON.stringify(updatedVideos));
        setRecordedChunks(updatedVideos);
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

    const handleToggleRecording = () => {
        if (isRecording) {
            handleStopCaptureClick();
        } else {
            handleStartCaptureClick();
        }
    }

    const handleSaveImage = (editedImage) => {
        const updatedImages = [...capturedImages];
        updatedImages[editingIndex] = editedImage;
        setCapturedImages(updatedImages);
        localStorage.setItem("capturedImages", JSON.stringify(updatedImages));
        setEditingIndex(null);
    };



    return (
        <div>
            <Modal opened={editImageModal} onClose={seteditImageModal} centered withCloseButton={false} size={"55%"}>
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
                                                <Flex direction={"column"} align={"center"}>
                                                    {showTimer && (
                                                        <Text c={"#ffffff"} fz={18} fw={500}>
                                                            {videoformattedTime}
                                                        </Text>
                                                    )}
                                                    <Flex gap={"md"}>
                                                        <ActionIcon
                                                            onClick={handleCapture}
                                                            style={{
                                                                backgroundColor: "#8158F5",
                                                                color: "#fff",
                                                            }}
                                                            radius={"50%"}
                                                            size={"4rem"}
                                                        >
                                                            <BsCameraFill size={"2.2rem"} />
                                                        </ActionIcon>

                                                        <ActionIcon
                                                            onClick={handleToggleRecording}
                                                            style={{
                                                                backgroundColor: "#8158F5",
                                                                color: "#fff",
                                                            }}
                                                            radius={"50%"}
                                                            size={"4rem"}
                                                        >
                                                            {isRecording ? <FaPause size={"2.2rem"} /> : <IoPlay size={"2.2rem"} />}
                                                        </ActionIcon>
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
                                                        onClick={() => handleDeleteVideo(index)}
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
                                                            onClick={() => handleDeleteImage(index)}
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
