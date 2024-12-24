import React, { useEffect, useRef, useState } from 'react'
import { ActionIcon, Button, Card, Center, Checkbox, Container, Flex, Group, Image, Modal, Overlay, Radio, Select, SimpleGrid, Space, Stack, Text, Textarea, TextInput } from '@mantine/core'
import Vector from "../assets/Vector.png"
import Pic from "../assets/intestine.png"
import { MdOutlineEdit, MdOutlineChevronLeft, MdArrowDownward, MdAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import { TbCircleDashedPlus, TbPrinter } from 'react-icons/tb'
import { FiChevronDown } from 'react-icons/fi'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { hover } from '@testing-library/user-event/dist/hover'
import HospitalCard from '../Components/LoginForm/HospitalCard'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { format } from 'date-fns'

import axios from 'axios'
import client from '../Components/Api'

const ExportReport = () => {
    const navigate = useNavigate()
    // const [hoverCard, setHoverCard] = useState(null)
    // const [commentModal, setcommentModal] = useState(false)
    const [selectImage, setselectImage] = useState(false)
    const imageRefs = useRef([]);
    const targetRef = useRef()
    const [selectedImages, setSelectedImages] = useState([]);
    const [capturedImages, setCapturedImages] = useState([]);


    const [medicationText, setMedicationText] = useState('')
    const [remarksText, setRemarksText] = useState('')
    const [reportModal, setReportModal] = useState(false)


    const selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'))

    // const [fileModal, setfileModal] = useState(false)
    // const [file, setFile] = useState(null);
    // const selectedPatient = JSON.parse(localStorage.getItem('selectedpatient'))

    // console.log(dateandTime[0]);

    // const handleFullscreen = (index) => {
    //     const element = imageRefs.current[index];
    //     if (element.requestFullscreen) {
    //         element.requestFullscreen();
    //     } else if (element.mozRequestFullScreen) {
    //         element.mozRequestFullScreen(); // Firefox
    //     } else if (element.webkitRequestFullscreen) {
    //         element.webkitRequestFullscreen(); // Chrome, Safari, Opera
    //     } else if (element.msRequestFullscreen) {
    //         element.msRequestFullscreen(); // IE/Edge
    //     }
    // };

    if (selectedImages.length > 0) {
        window.localStorage.setItem('selectedImages', JSON.stringify(selectedImages))
    }

    useEffect(() => {
        setCapturedImages(JSON.parse(localStorage.getItem('capturedImages')) || [])

    }, [])

    const handleCheckboxChange = (image, checked) => {
        setSelectedImages((prev) =>
            checked ? [...prev, image] : prev.filter((item) => item !== image)
        );

    };

    const toggleSelectMode = () => setselectImage(!selectImage);

    const handleDeleteImage = (index) => {
        window.localStorage.setItem('capturedImages', JSON.stringify(capturedImages.filter((_, i) => i !== index)))
        setCapturedImages(JSON.parse(localStorage.getItem('capturedImages')) || [])

        // console.log(window.localStorage.getItem('capturedImagess').length);

    };

    const handleDownloadPDF = async (dateTime) => {
        if (targetRef.current) {
            // Generate the canvas from the targetRef div
            const canvas = await html2canvas(targetRef.current);

            // Initialize jsPDF
            const pdf = new jsPDF();

            // Scale canvas content to fit the PDF page
            const imgData = canvas.toDataURL("image/png");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Add the image to the PDF
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

            // Automatically save the PDF to the default downloads directory
            pdf.save("Endoscopy-report.pdf");
        }
    };


    const handleExportReport = () => {
        setReportModal(true);
        setTimeout(() => {
            var date = new Date()
            var dateArray = date.toISOString().split(".")
            var dateandTime = dateArray[0].split("T")
            console.log(dateandTime);

            handleDownloadPDF(dateandTime); // Call after the modal content is rendered
        }, 600);
        if (selectedImages.length > 0) {
            window.localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
        }

    }
    const formatDateTime = (date) => {
        let dateString = new Date(date)
        return format(dateString, "dd MMMM yyyy | h:mm a");
    };
    return (
        <div>
            <Modal fullScreen opened={reportModal} onClose={() => setReportModal(false)}>
                <div ref={targetRef}>
                    <HospitalCard remarks={remarksText} medication={medicationText} selectedImages={JSON.parse(localStorage.getItem('selectedImages')) || []} />
                </div>
            </Modal>
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
                        <Button leftIcon={<IoPlayCircleOutline size={"1.2rem"} />} variant='light' color="violet" radius={8} h={44}
                            onClick={() => setReportModal(true)}
                        >Preview</Button>
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
                        <Button bg='#8158F5' radius={8} h={44} onClick={() => { handleExportReport() }}>Export</Button>
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
                            <Text>{selectedPatient.sex}</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text fw={600}>Reffered by</Text>
                            <Text>{selectedPatient.referredBy}</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text fw={600}>Date & Time</Text>
                            <Text>{formatDateTime(selectedPatient.dateTime)}</Text>

                        </Flex>
                    </SimpleGrid>
                    <Space h={12} />
                    <SimpleGrid cols={2}>
                        <Flex direction={"column"}>
                            <Text fw={600}>Phone Number</Text>
                            <Text>{selectedPatient.phone}</Text>
                        </Flex>

                        <Flex direction={"column"}>
                            <Text fw={600}>Email</Text>
                            <Text>{selectedPatient.email}</Text>
                        </Flex>
                    </SimpleGrid>
                </Card>
                <Space h={"1rem"} />

                <Textarea placeholder='Write your remarks'
                    label="Diagnostic Details (Optional)"
                    minRows={3}
                    radius={8}
                    value={remarksText}
                    onChange={(event) => setRemarksText(event.currentTarget.value)}
                />
                <Space h={"1rem"} />

                <Textarea placeholder='Write medication'
                    label="Medication (Optional)"
                    minRows={3}
                    radius={8}
                    value={medicationText}
                    onChange={(event) => setMedicationText(event.currentTarget.value)}
                />


                <Space h={"1rem"} />

                <Flex align={"center"} justify={selectImage ? "space-between" : "flex-end"}>
                    {selectImage && <Text fz={20} fw={600}>Selected images : {selectedImages.length} </Text>}
                    <Group>
                        <Button color='gray' variant='light' radius={"lg"} onClick={toggleSelectMode}>{selectImage ? 'Cancel' : 'Select images to export'}</Button>
                        <ActionIcon variant='light' size={"lg"} radius={12}><MdAdd size={25} /></ActionIcon>
                    </Group>
                </Flex>
                <Space h={"1rem"} />
                <SimpleGrid cols={3}>
                    {capturedImages.map((image, index) => (
                        <div
                            key={index}
                            style={{ position: 'relative' }}

                        >
                            <Image
                                ref={(el) => (imageRefs.current[index] = el)}
                                src={image}

                                width={'100%'} height={"400px"}
                                radius={12}
                            />
                            {selectImage && (
                                <Overlay radius={12} top={0} left={0} opacity={0}>
                                    <Flex justify="flex-end" p={10}>
                                        <Checkbox
                                            size="lg"
                                            color="violet"
                                            onChange={(e) =>
                                                handleCheckboxChange(image, e.target.checked)
                                            }
                                        />
                                    </Flex>
                                </Overlay>
                            )}
                            {!selectImage && (
                                <Overlay pos="absolute" radius={12} top={0} left={0} opacity={0}>
                                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                                        {/* <Button size={20} >Edit</Button> */}
                                        <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"}><MdOutlineEdit color='black' size={23} /></ActionIcon>
                                        <ActionIcon size={46} variant='tranperant' bg={"white"} radius={"50%"} right={"1rem"} onClick={() => handleDeleteImage(index)}><RxCross2 color='red' size={23} /></ActionIcon>
                                    </div>


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
