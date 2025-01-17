import React, { useEffect, useRef, useState } from "react";
import {
    ActionIcon,
    Button,
    Card,
    Container,
    Flex,
    Grid,
    Group,
    Image,
    Notification,
    Overlay,
    SimpleGrid,
    Space,
    Text,
} from "@mantine/core";
import Vector from "../assets/Vector.png";
import Pic from "../assets/intestine.png";
import Webcam from "react-webcam";

import { MdFullscreen, MdOutlineEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { BsCameraFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { FaPause } from "react-icons/fa6";
import { format } from "date-fns";

const Videocapturing = () => {
    const [notify, setNotify] = useState(false);
    const navigate = useNavigate();
    const [externalDeviceId, setExternalDeviceId] = useState("");
    const [capturedImages, setCapturedImages] = useState([]);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false); // New state to track recording
    const [seconds, setSeconds] = useState(0);
    const [showTimer, setShowTimer] = useState(false);

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const timerRef = useRef(null); // Timer reference to control the interval

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);



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
        width: 750,
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

            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, { mimeType: "video/webm" });
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
            const blob = new Blob([data], { type: 'video/webm' });
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
        if (webcamRef.current) {
            const element = webcamRef.current.video;
            element.requestFullscreen?.();
        }
    };

    const formatDateTime = (date) => {
        const dateString = new Date(date);
        return format(dateString, "dd MMMM yyyy | h:mm a");
    };

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const displaySeconds = seconds % 60;

    // Format time to always show two digits
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
    localStorage.setItem('time', formattedTime)


    return (
        <div>
            <Container maw={"90rem"} bg={"#FFFFFF"} p={"1rem"} mt={"lg"} style={{ borderRadius: "1rem" }}>
                <Flex justify={"space-between"} align={"center"}>
                    <Group spacing={"sm"}>
                        <Image src={Vector} maw={40} mah={40} />
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
                        {showTimer && (
                            <Text c={"#D94444"} fz={24} fw={600}>
                                {formattedTime}
                            </Text>
                        )}
                    </Flex>

                    <Group>
                        <Button
                            variant="light"
                            color="red"
                            radius={8}
                            onClick={() => navigate("/allpatients")}
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
                            <Text fw={600}>Reffered by</Text>
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
                    <Grid.Col span={9}>
                        <div style={{ position: "relative", width: "750px", height: "100%" }}>
                            {externalDeviceId ? (
                                <>
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
                                    <MdFullscreen
                                        onClick={handleFullscreen}
                                        style={{
                                            position: "absolute",
                                            top: "10px",
                                            right: "10px",
                                            color: "white",
                                            padding: "5px",
                                            cursor: "pointer",
                                        }}
                                        size={40}
                                    />
                                    <Flex
                                        gap={"md"}
                                        style={{
                                            position: "absolute",
                                            bottom: "20px",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            zIndex: 2,
                                        }}
                                    >
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
                                            onClick={handleStartCaptureClick}
                                            style={{
                                                backgroundColor: "#8158F5",
                                                color: "#fff",
                                            }}
                                            radius={"50%"}
                                            size={"4rem"}
                                        >
                                            <IoPlay size={"2.2rem"} />
                                        </ActionIcon>

                                        <ActionIcon
                                            onClick={handleStopCaptureClick}
                                            style={{
                                                backgroundColor: "#8158F5",
                                                color: "#fff",
                                            }}
                                            radius={"50%"}
                                            size={"4rem"}
                                        >
                                            <FaPause size={"2.2rem"} />
                                        </ActionIcon>
                                    </Flex>
                                </>
                            ) : (
                                <p>Loading external camera...</p>
                            )}
                        </div>
                    </Grid.Col>

                    <Grid.Col span={3}>
                        <Card bg={"#EBEDF4"} radius={12} h={676}>
                            <SimpleGrid cols={2}>
                                {recordedChunks.map((video, index) => (
                                    <div key={index} style={{ position: "relative" }}>
                                        <video
                                            src={video.videoUrl}
                                            controls
                                            style={{ width: "100%", borderRadius: "12px" }}
                                        />
                                        <Overlay position="absolute" top={0} left={0} opacity={0} zIndex={1}>
                                            <div
                                                style={{
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
                                        </Overlay>
                                    </div>
                                ))}

                                {capturedImages.map((image, index) => (
                                    <div key={index} style={{ position: "relative" }}>
                                        <Image
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
                                                <ActionIcon size={30} variant="transparent" bg={"white"} radius={"50%"}>
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
                        </Card>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    );
};

export default Videocapturing;
