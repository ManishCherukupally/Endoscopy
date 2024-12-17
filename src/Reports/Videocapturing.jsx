import React, { useEffect, useRef, useState } from 'react'
import { ActionIcon, Button, Card, Container, Flex, Grid, Group, Image, Notification, Overlay, SimpleGrid, Space, Text } from '@mantine/core'
import Vector from "../assets/Vector.png"
import Pic from "../assets/intestine.png"
import Webcam from 'react-webcam';

import { MdCheck, MdDelete, MdOutlineEdit, MdFullscreen } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { BsCameraFill } from 'react-icons/bs';
import { format } from 'date-fns';
const Videocapturing = () => {

    // const [isRecording, setIsRecording] = useState(false);

    // const toggleRecording = () => {
    //     setIsRecording(!isRecording);
    // };
    const [notify, setNotify] = useState(false)
    const navigate = useNavigate()
    const [externalDeviceId, setExternalDeviceId] = useState("");
    const [capturedImages, setCapturedImages] = useState([]);

    const selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'))
    // console.log(selectedPatient);

    if (capturedImages.length > 0) {
        window.localStorage.setItem('capturedImages', JSON.stringify(capturedImages));
    }
    const webcamRef = useRef(null);
    useEffect(() => {
        const getExternalCamera = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(
                    (device) => device.kind === "videoinput"
                );

                // Find the first external camera (not labeled as "integrated")
                const externalCamera = videoDevices.find(
                    (device) => !device.label.toLowerCase().includes("integrated")
                );

                // Use the external camera's deviceId or fallback to the first available camera
                if (externalCamera) {
                    setExternalDeviceId(externalCamera.deviceId);
                } else if (videoDevices.length > 0) {
                    // Fallback if no external camera is found
                    setExternalDeviceId(videoDevices[0].deviceId);
                }
            } catch (error) {
                console.error("Error accessing media devices:", error);
            }
        };

        getExternalCamera();
    }, []);

    const videoConstraints = {
        width: 998,
        height: 676,
        facingMode: "user",
        deviceId: externalDeviceId,
    };
    const handleCapture = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImages([...capturedImages, imageSrc]);
        }
    };

    const handleDeleteImage = (index) => {
        setCapturedImages(capturedImages.filter((_, i) => i !== index));
    };

    const handleFullscreen = () => {
        if (webcamRef.current) {
            const element = webcamRef.current.video;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen(); // Firefox
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(); // Chrome, Safari, Opera
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen(); // IE/Edge
            }
        }
    };


    const formatDateTime = (date) => {
        let dateString = new Date(date)
        return format(dateString, "dd MMMM yyyy | h:mm a");
    };
    const images = [
        { src: Pic, alt: 'Image 1' },
        { src: Pic, alt: 'Image 2' },
        { src: Pic, alt: 'Image 3' },

    ];
    return (
        <div>
            <Container maw={"90rem"} bg={"#FFFFFF"} p={"1rem"} mt={"lg"} style={{ borderRadius: "1rem" }} >

                <Flex justify={"space-between"} align={"center"}>
                    <Group spacing={"sm"}>
                        <Image src={Vector} maw={40} mah={40} />
                        <Text fz={32} fw={600}>Endoscopy</Text>
                    </Group>
                    {/* <button
                            onClick={toggleRecording}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            {isRecording ? "Stop Recording" : "Start Recording"}
                        </button> */}

                    <Flex gap={"sm"} align={"center"}>
                        <div
                            className="recording-indicator"
                            title="Recording..."
                        ></div>

                        <Text c={"#D94444"} fz={24} fw={600}>05:56 Min</Text>
                    </Flex>

                    <Group>
                        <Button variant='light' color='red' radius={8}>Cancel capture</Button>
                        <Button bg='#8158F5' radius={8} onClick={() => navigate("/selectpicture")}>Save & Continue</Button>
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

                <Grid>
                    <Grid.Col span={9}>
                        <div style={{ position: "relative", width: "998px", height: "676px", margin: "0 auto" }}>
                            {externalDeviceId ? (
                                <>
                                    <Webcam
                                        ref={webcamRef}
                                        audio={false}
                                        videoConstraints={videoConstraints}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "12px",
                                        }}
                                    />
                                    {/* Fullscreen icon positioned in the top-right corner */}
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
                                    <ActionIcon
                                        onClick={handleCapture}
                                        style={{
                                            position: 'absolute',
                                            bottom: '20px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            zIndex: 2,
                                            backgroundColor: '#8158F5',
                                            color: '#fff',
                                        }}
                                        radius={"50%"}
                                        size={"5rem"}
                                    >
                                        <BsCameraFill size={"3rem"} />
                                    </ActionIcon>                                </>
                            ) : (
                                <p>Loading external camera...</p>
                            )}
                        </div>
                    </Grid.Col>

                    <Grid.Col span={3}>
                        <Card bg={"#EBEDF4"} radius={12} h={676}>
                            <SimpleGrid cols={2}>
                                {/* <div>
                                    <Image src={Pic} style={{ width: 150, height: 150 }} />
                                    <MdFullscreen style={{
                                        position: "absolute",
                                        color: "black",
                                        backgroundColor: "white",
                                        borderRadius: "50%",
                                        padding: "5px",
                                        cursor: "pointer",
                                    }}
                                        size={30}
                                    />
                                </div> */}

                                {capturedImages.map((image, index) => (
                                    <div key={index} style={{ position: 'relative' }}>
                                        <Image src={image} alt={`Captured ${index + 1}`} width={150} height={150} radius={12} />
                                        <Overlay

                                            position="absolute"
                                            top={0}
                                            left={0}
                                            opacity={0}
                                            zIndex={1}
                                            visible={true} // Always show the overlay
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                                                {/* <Button size={20} >Edit</Button> */}
                                                <ActionIcon size={30} variant='tranperant' bg={"white"} radius={"50%"}><MdOutlineEdit color='black' /></ActionIcon>
                                                <ActionIcon size={30} variant='tranperant' bg={"white"} radius={"50%"} onClick={() => handleDeleteImage(index)}><RxCross2 color='red' /></ActionIcon>
                                            </div>
                                        </Overlay>
                                    </div>
                                ))}
                                {/* <Button onClick={() => {
                                    setNotify(true)
                                    setTimeout(() => {
                                        setNotify(false)
                                    }, 3000)
                                }}>Notify!</Button> */}
                            </SimpleGrid>
                        </Card>
                    </Grid.Col>
                </Grid>
                {/* {notify &&
                    <Flex justify={"flex-end"} align={"flex-end"}  >
                        <Notification className='notification' icon={<MdCheck />} color='green' withCloseButton={false} >
                            <Text c={"white"}>Notified!</Text>
                        </Notification>
                    </Flex>
                } */}
            </Container >


        </div >
    )
}

export default Videocapturing
