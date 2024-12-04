import { ActionIcon, Button, Card, Container, Flex, Group, Image, Overlay, SimpleGrid, Space, Text } from '@mantine/core'
import React from 'react'
import Vector from "../assets/Vector.png"
import Pic from "../assets/intestine.png"
import { MdOutlineEdit, MdOutlineChevronLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'

const SelectPictureReport = () => {
    const navigate = useNavigate()


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
                    <ActionIcon variant='light' size={"lg"} onClick={() => navigate("/")}><MdOutlineChevronLeft size={20} /></ActionIcon>
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
                        <Text >05:56 Min</Text>
                    </Flex>

                    <Group>

                        <Button bg='#8158F5' radius={8}>Export Report</Button>
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
                <SimpleGrid cols={3}>
                    {images.map((image, index) => (
                        <div key={index} style={{ position: 'relative' }} >
                            <Image src={image.src} alt={image.alt} width={'100%'} height={"auto"} radius={12} />
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
                                    <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"}><MdOutlineEdit color='black' size={23} /></ActionIcon>
                                    <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"}><RxCross2 color='red' size={23} /></ActionIcon>
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
