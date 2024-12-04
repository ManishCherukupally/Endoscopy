import React, { useRef, useState } from 'react'
import { ActionIcon, Button, Card, Center, Container, Flex, Group, Image, Modal, Overlay, Select, SimpleGrid, Space, Text, Textarea, TextInput } from '@mantine/core'
import Vector from "../assets/Vector.png"
import Pic from "../assets/intestine.png"
import { MdOutlineEdit, MdOutlineChevronLeft, MdArrowDownward, MdAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import { TbCircleDashedPlus, TbPrinter } from 'react-icons/tb'
import { FiChevronDown } from 'react-icons/fi'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { hover } from '@testing-library/user-event/dist/hover'

const ExportReport = () => {
    const navigate = useNavigate()
    const [hoverCard, setHoverCard] = useState(null)
    const [commentModal, setcommentModal] = useState(false)
    const imageRefs = useRef([]);

    const handleFullscreen = (index) => {
        const element = imageRefs.current[index];
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen(); // Firefox
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(); // Chrome, Safari, Opera
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen(); // IE/Edge
        }
    };

    const images = [
        { src: Pic, alt: 'Image 1' },
        { src: Pic, alt: 'Image 2' },
        { src: Pic, alt: 'Image 3' },
        { src: Pic, alt: 'Image 4' },
        { src: Pic, alt: 'Image 5' },
        { src: Pic, alt: 'Image 6' },

    ];
    return (
        <div>
            <Container maw={"90rem"} bg={"#FFFFFF"} p={"1rem"} mt={"lg"} style={{ borderRadius: "1rem" }} >

                <Group>
                    <ActionIcon variant='light' size={"lg"} onClick={() => navigate("/selectpicture")}><MdOutlineChevronLeft size={20} /></ActionIcon>
                    <Text fz={20} fw={600}>Export Report</Text>
                </Group>
                <Space h={15} />
                <Flex justify={"space-between"} align={"center"}>
                    <Group spacing={"sm"}>
                        <Image src={Vector} maw={40} mah={40} />
                        <Text fz={32} fw={600}>Endoscopy</Text>
                    </Group>


                    <Group spacing={"sm"}>
                        {/* <div style={{ border: "1px solid black", borderRadius: 8, padding: "1rem" }}>

                        </div> */}
                        <Button leftIcon={<IoPlayCircleOutline size={"1.2rem"} />} variant='light' color="violet" radius={8} h={44}>Preview</Button>
                        <Card withBorder p={'0.3rem'} radius={8} pr={"1rem"} pl={"1rem"} style={{ overflow: "visible", position: "relative" }}>
                            <Flex gap={15} align={"center"}>
                                <Text fz={14}>Export Report as</Text>
                                <Select w={75} variant='filled'
                                    rightSection={<FiChevronDown />}
                                    value={"Pdf"}
                                    data={['Pdf', 'Image']}
                                    dropdownPosition='bottom'
                                    dropdownComponent={props => (
                                        <div
                                            {...props}
                                            style={{
                                                zIndex: 1000, // Ensures dropdown appears on top
                                                ...props.style,
                                            }}
                                        />
                                    )}
                                />
                            </Flex>
                        </Card>
                        <ActionIcon radius={8} h={44} w={50} size={"lg"} style={{ border: "1px solid black" }} c={"black"}><TbPrinter /></ActionIcon>
                        <Button bg='#8158F5' radius={8} h={44}>Export</Button>
                    </Group>
                </Flex>

                <Space h={20} />
                <Card bg={"#EBEDF4"} radius={12}>
                    <SimpleGrid cols={6}>
                        <Flex direction={"column"}>
                            <Text fw={600}>Name</Text>
                            <Text>Cameron Williamson</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text fw={600}>Patient ID</Text>
                            <Text>1234</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text fw={600}>Age</Text>
                            <Text>24</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text fw={600}>Sex</Text>
                            <Text>Female</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text fw={600}>Reffered by</Text>
                            <Text>Self</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text fw={600}>Date & Time</Text>
                            <Text>15 May 2020 | 7:00 PM</Text>
                        </Flex>
                    </SimpleGrid>
                    <Space h={12} />
                    <SimpleGrid cols={2}>
                        <Flex direction={"column"}>
                            <Text fw={600}>Phone Number</Text>
                            <Text>+91 9999999999</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text fw={600}>Email</Text>
                            <Text>georgia.young@example.com</Text>
                        </Flex>
                    </SimpleGrid>
                </Card>

                <Space h={"1rem"} />

                <Textarea placeholder='Write your remarks'
                    label="Diagnostic Details (Optional)"
                    minRows={3}
                    radius={8} />
                <Space h={"1rem"} />

                <Textarea placeholder='Write medication'
                    label="Medication (Optional)"
                    minRows={3}
                    radius={8} />


                <Space h={"1rem"} />

                <Flex align={"center"} justify={"space-between"}>
                    <Text fz={20} fw={600}>Selected images : 6 </Text>
                    <Group>
                        <Button color='gray' variant='light' radius={"lg"}>Select images to export</Button>
                        <ActionIcon variant='light' size={"lg"} radius={12}><MdAdd size={25} /></ActionIcon>
                    </Group>
                </Flex>
                <Space h={"1rem"} />
                <SimpleGrid cols={3}>
                    {images.map((image, index) => (
                        <div key={index} style={{ position: 'relative' }}
                            onMouseEnter={() => setHoverCard(index)}
                            onMouseLeave={() => setHoverCard(null)} >
                            <Image
                                ref={(el) => imageRefs.current[index] = el}
                                src={image.src} alt={image.alt} width={'100%'} height={"auto"} radius={12}
                            />

                            {hoverCard === index && (
                                <Overlay pos={"absolute"}
                                    radius={12}
                                    top={0}
                                    left={0}
                                    opacity={0.5}>
                                    {/* <Flex justify={"center"} align={"center"} >
                                        <ActionIcon variant='transperant' c='blue' size={"xl"}><MdAdd size={50} /></ActionIcon>
                                    </Flex> */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                                        {/* <Button size={20} >Edit</Button> */}
                                        <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"}><MdOutlineEdit color='black' size={23} /></ActionIcon>
                                        <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"}><RxCross2 color='red' size={23} /></ActionIcon>
                                    </div>
                                    <Center h={115} mx="auto">
                                        {commentModal ? (<Card w={"auto"}>

                                            <Textarea label="Comment" />
                                        </Card>) : (
                                            <Flex direction={"column"} align={"center"} gap={"sm"}>
                                                <ActionIcon variant='transperant' size={80} c='white' onClick={() => setcommentModal(true)}><TbCircleDashedPlus size={80} /></ActionIcon>
                                                <Button variant='transperant' bg={"white"} c={"black"}
                                                    onClick={() => handleFullscreen(index)}
                                                >See Image</Button>
                                            </Flex>
                                        )}

                                    </Center>

                                </Overlay>
                            )}

                        </div>
                    ))}
                </SimpleGrid>
            </Container>
        </div >
    )
}


export default ExportReport
