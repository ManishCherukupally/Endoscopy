import React, { useEffect, useRef, useState } from 'react';
import {
    ActionIcon,
    Button,
    Container,
    Flex,
    Group,
    Image,
    SimpleGrid,
    Space,
    Text,
} from '@mantine/core';
import { MdOutlineEdit, MdOutlineChevronLeft } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const SelectPictureReport = () => {
    const navigate = useNavigate();
    const [hoverCard, setHoverCard] = useState(null);
    const [capturedImages, setCapturedImages] = useState([]);
    const [editingImage, setEditingImage] = useState(null); // State for editing mode
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [penSize, setPenSize] = useState(5);

    useEffect(() => {
        setCapturedImages(JSON.parse(localStorage.getItem('capturedImages')) || []);
    }, []);

    const handleDeleteImage = (index) => {
        const updatedImages = capturedImages.filter((_, i) => i !== index);
        localStorage.setItem('capturedImages', JSON.stringify(updatedImages));
        setCapturedImages(updatedImages);
    };

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = color;
        ctx.lineWidth = penSize;
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setDrawing(true);
    };

    const draw = (e) => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setDrawing(false);
    };

    const handleEdit = (image) => {
        setEditingImage(image);
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL('image/webp'); // Save edited image in the same format as others (WEBP)

        const updatedImages = [...capturedImages];
        const index = capturedImages.indexOf(editingImage); // Find the image being edited by reference

        if (index !== -1) {
            updatedImages[index] = dataUrl; // Replace the specific image with the edited one
            setCapturedImages(updatedImages); // Update state
            localStorage.setItem('capturedImages', JSON.stringify(updatedImages)); // Update local storage
        }

        setEditingImage(null); // Exit editing mode
    };



    return (
        <div>
            <Container maw="90rem" bg="#FFFFFF" p="1rem" mt="lg" style={{ borderRadius: '1rem' }}>
                <Group>
                    <ActionIcon variant="light" size="lg" onClick={() => navigate('/videocapturing')}>
                        <MdOutlineChevronLeft size={20} />
                    </ActionIcon>
                    <Text fz={20} fw={600}>
                        Select Picture & Add Title To Selected Pictures
                    </Text>
                </Group>
                <Space h={15} />
                <SimpleGrid cols={3}>
                    {capturedImages.map((image, index) => (
                        <div key={index} style={{ position: 'relative' }}>
                            <Image src={image} alt={`Captured ${index}`} width="100%" height="100%" radius={12} />
                            <ActionIcon
                                size={46}
                                variant="transparent"
                                style={{ position: 'absolute', top: 10, left: 10 }}
                                onClick={() => handleEdit(image)}
                            >
                                <MdOutlineEdit size={23} />
                            </ActionIcon>
                            <ActionIcon
                                size={46}
                                variant="transparent"
                                style={{ position: 'absolute', top: 10, right: 10 }}
                                onClick={() => handleDeleteImage(index)}
                            >
                                <RxCross2 color="red" size={23} />
                            </ActionIcon>
                        </div>
                    ))}
                </SimpleGrid>
            </Container>

            {editingImage && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0, 0, 0, 0.8)',
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={600}
                        style={{
                            border: '1px solid white',
                            background: `url(${editingImage})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                        }}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                    />
                    <div style={{ marginTop: 20, display: 'flex', gap: 20 }}>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{ cursor: 'pointer' }}
                        />
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={penSize}
                            onChange={(e) => setPenSize(e.target.value)}
                        />
                        <Button bg="#8158F5" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="outline" color="red" onClick={() => setEditingImage(null)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectPictureReport;
