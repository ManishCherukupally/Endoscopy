import { ActionIcon, Button, Card, Center, Container, Flex, Group, Image, Overlay, SimpleGrid, Space, Stack, Text, Textarea } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import Vector from "../assets/Vector.png"
import Pic from "../assets/intestine.png"
import { MdOutlineEdit, MdOutlineChevronLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import { TbCircleDashedPlus } from 'react-icons/tb'
import { format } from 'date-fns'

const SelectPictureReport = () => {
    const navigate = useNavigate()
    const [hoverCard, setHoverCard] = useState(null)
    const [commentModal, setcommentModal] = useState(false)
    // const [selectImage, setselectImage] = useState(false)
    const imageRefs = useRef([]);
    const [capturedImages, setCapturedImages] = useState([]);
    const [fullscreen, setFullScreen] = useState(false)

    const selectedPatient = JSON.parse(localStorage.getItem('selectedpatient'))
    const handleFullscreen = (index) => {
        setFullScreen(true)
        const element = imageRefs.current[index];

        if (element) {
            // // Apply fullscreen styles dynamically
            // element.style.width = "100%";
            // element.style.height = "100%";
            // element.style.objectFit = "contain"; // Ensures aspect ratio is maintained
            // element.style.margin = "0";
            // element.style.padding = "0";

            // Trigger fullscreen for the element
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen(); // Firefox
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(); // Chrome, Safari, Opera
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen(); // IE/Edge
            }

            // Reset styles when exiting fullscreen
            // document.addEventListener("fullscreenchange", () => resetStyles(element));
            // document.addEventListener("webkitfullscreenchange", () => resetStyles(element));
            // document.addEventListener("mozfullscreenchange", () => resetStyles(element));
            // document.addEventListener("MSFullscreenChange", () => resetStyles(element));
        }
    };

    // Reset styles after exiting fullscreen
    // const resetStyles = (element) => {
    //     setFullScreen(false)
    //     if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    //         element.style.width = "";
    //         element.style.height = "";
    //         element.style.objectFit = "";
    //         element.style.margin = "";
    //         element.style.padding = "";
    //     }
    // };

    useEffect(() => {
        setCapturedImages(JSON.parse(localStorage.getItem('capturedImages')) || [])

    }, [])
    const formatDateTime = (date) => {
        let dateString = new Date(date)
        return format(dateString, "dd MMMM yyyy | h:mm a");
    };


    const handleDeleteImage = (index) => {
        window.localStorage.setItem('capturedImages', JSON.stringify(capturedImages.filter((_, i) => i !== index)))
        setCapturedImages(JSON.parse(localStorage.getItem('capturedImages')) || [])
        // if (capturedImages.length > 0) {
        //     window.localStorage.setItem('capturedImages', JSON.stringify(capturedImages));
        // }
    };
    // const toggleSelectMode = () => setselectImage(!selectImage);

    const timer = localStorage.getItem('time')
    return (
        <div>
            <Container maw={"90rem"} bg={"#FFFFFF"} p={"1rem"} mt={"lg"} style={{ borderRadius: "1rem" }} >

                <Group>
                    <ActionIcon variant='light' size={"lg"} onClick={() => navigate("/videocapturing")}><MdOutlineChevronLeft size={20} /></ActionIcon>
                    <Text fz={20} fw={600}>Select Picture & Add Title To Selected Pictures</Text>
                </Group>
                <Space h={15} />
                <Flex justify={"space-between"} align={"center"}>
                    <Group spacing={"sm"}>
                        <Image src={Vector} maw={40} mah={40} />
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
                <SimpleGrid cols={3}>
                    {capturedImages.map((image, index) => (
                        <div key={index} style={{ position: 'relative' }}
                            onMouseEnter={() => setHoverCard(index)}
                            onMouseLeave={() => setHoverCard(null)} >
                            <Image
                                ref={(el) => (imageRefs.current[index] = el)}
                                src={image} alt={image.alt} width={'100%'} height={"100%"} radius={12} />

                            {hoverCard === index && (
                                <Overlay pos="absolute" radius={12} top={0} left={0} opacity={0.5}>
                                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                                        {/* <Button size={20} >Edit</Button> */}
                                        <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"}><MdOutlineEdit color='black' size={23} /></ActionIcon>
                                        <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"} right={"1rem"} onClick={() => handleDeleteImage(index)}><RxCross2 color='red' size={23} /></ActionIcon>
                                    </div>

                                    <Center h={200} mx="auto">
                                        {commentModal ? (<Card w={"80%"}>
                                            <Stack>
                                                <Group align='center'>
                                                    <ActionIcon variant='light' onClick={() => setcommentModal(false)}><RxCross2 /></ActionIcon>
                                                    <Text>1234520241023160501</Text>
                                                </Group>
                                                <Textarea label="Comment"
                                                    placeholder='Write a comment' />
                                                <Button fz={"sm"} bg='#8158F5'>Add Comment To Image</Button>
                                            </Stack>
                                        </Card>) : (
                                            <Flex direction={"column"} align={"center"} gap={"xl"}>
                                                <ActionIcon variant='transperant' size={100} c='white' onClick={() => setcommentModal(true)}><TbCircleDashedPlus size={100} /></ActionIcon>
                                                <Button variant='transperant' bg={"white"} c={"black"}
                                                    onClick={() => handleFullscreen(index)}
                                                >See Image</Button>
                                            </Flex>
                                        )}

                                    </Center>
                                </Overlay>
                            )}
                            <Overlay

                                position="absolute"
                                top={0}
                                left={0}
                                opacity={0}
                                zIndex={1}
                                visible={true} // Always show the overlay
                            >
                                <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                                    {/* <Button size={20} >Edit</Button> */}
                                    <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"}><MdOutlineEdit color='black' size={23} /></ActionIcon>
                                    <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"} right={"1rem"}><RxCross2 color='red' size={23} /></ActionIcon>
                                </div>
                            </Overlay>
                        </div>
                    ))}
                </SimpleGrid>
            </Container>
        </div>
    )
}

export default SelectPictureReport