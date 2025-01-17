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
    const navigate = useNavigate();
    const [hoverCard, setHoverCard] = useState(null);
    const [hovervideoCard, setHovervideoCard] = useState(null);

    const [commentModal, setcommentModal] = useState(false);
    const [currentComment, setCurrentComment] = useState(""); // For the current comment being entered
    const [comments, setComments] = useState([]); // Array to hold comments for each image
    const imageRefs = useRef([]);
    const [capturedImages, setCapturedImages] = useState([]);
    const [capturedVideos, setCapturedVideos] = useState([]);

    const [fullscreen, setFullScreen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(null); // Track the current image index for the modal

    const selectedPatient = JSON.parse(localStorage.getItem('selectedpatient'));

    useEffect(() => {
        setCapturedImages(JSON.parse(localStorage.getItem('capturedImages')) || []);
        setCapturedVideos(JSON.parse(localStorage.getItem('capturedVideos')) || []);

        setComments(JSON.parse(localStorage.getItem('imageComments')) || []);
    }, []);

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
        localStorage.setItem('capturedVideos', JSON.stringify(updatedVideos));
        setCapturedVideos(updatedVideos);
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
    const formatDateTime = (date) => {
        let dateString = new Date(date)
        return format(dateString, "dd MMMM yyyy | h:mm a");
    };

    const timer = localStorage.getItem('time')
    return (
        <div>
            <Container maw={"90rem"} bg={"#FFFFFF"} p={"1rem"} mt={"lg"} style={{ borderRadius: "1rem" }}>
                {/* Header and Patient Details */}
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
                {/* Other UI Elements */}
                <Space h={"1rem"} />
                <SimpleGrid cols={3}>
                    {
                        capturedVideos.map((video, index) => (
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

                            </div>
                        ))
                    }
                    {capturedImages.map((image, index) => (
                        <Flex direction={"column"} key={index}>
                            <div
                                style={{ position: 'relative' }}
                                onMouseEnter={() => setHoverCard(index)}
                                onMouseLeave={() => setHoverCard(null)}
                            >
                                <Image
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
                                            <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"}><MdOutlineEdit color='black' size={23} /></ActionIcon>
                                            <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"} right={"1rem"} onClick={() => handleDeleteImage(index)}><RxCross2 color='red' size={23} /></ActionIcon>
                                        </div>

                                        <Center h={200} mx="auto">
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
                                                        <TbCircleDashedPlus size={100} />
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

                                {comments[index] ? <Text ml={"sm"}>{comments[index]}</Text> : <Text ml={"lg"} fw={600}>Image: {index + 1}</Text>}
                            </Flex>
                        </Flex>
                    ))}
                </SimpleGrid>
            </Container>
        </div>
    );
};

export default SelectPictureReport;