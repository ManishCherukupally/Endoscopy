import { ActionIcon, Button, Card, Center, Container, Flex, Group, Image as MantineImage, Modal, Overlay, SimpleGrid, Space, Stack, Text, Textarea } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import Vector from "../assets/Vector.png"
import Pic from "../assets/intestine.png"
import { MdOutlineEdit, MdOutlineChevronLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import { TbCircleDashedPlus } from 'react-icons/tb'
import { format } from 'date-fns'

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
        canvasRef.current.toBlob((blob) => {
            onSave(blob);
        }, "image/png");
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

    const handleSaveImage = (editedImageBlob) => {
        const updatedImages = [...capturedImages];

        // Release old object URL if any
        if (updatedImages[editingIndex] && updatedImages[editingIndex].startsWith("blob:")) {
            URL.revokeObjectURL(updatedImages[editingIndex]);
        }

        // Create a new object URL and store it
        const editedImageURL = URL.createObjectURL(editedImageBlob);
        updatedImages[editingIndex] = editedImageURL;

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