import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import {
  PasswordInput,
  TextInput,
  Button,
  Card,
  Image,
  Select,
  Radio,
  Group,
  Text,
  useMantineTheme,
  rem,
  Space,
  Modal,
  Flex,
  ActionIcon
} from '@mantine/core';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import client from '../Api';
import logo from '../../assets/Vector.jpg';
import report from "../../assets/report.png";
import { FaChevronLeft } from 'react-icons/fa6';

const Registration = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loader, setLoader] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const templates = ["default"];

  const theme = useMantineTheme();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      first_name: '',
      username: '',
      email: '',
      password: '',
      cnfpassword: '',
      mobile_no: '',
      speciality: '',
      template: '',
    },
    validate: {
      first_name: (value) => (value.trim().length === 0 ? 'Your full name is required' : null),
      username: (value) => (value.trim().length === 0 ? 'Username is required' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email format'),
      password: (value) => (value.length < 8 ? 'Password must be at least 8 characters' : null),
      cnfpassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
      mobile_no: (value) =>
        value && /^[6-9]\d{9}$/.test(value) ? null : 'Phone number must be a valid 10-digit number starting with 6-9',
      speciality: (value) => (value.trim().length === 0 ? 'Speciality is required' : null),
    },
  });

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length <= 10) {
      form.setFieldValue('mobile_no', value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const isValid = !form.validate().hasErrors;
    if (!isValid) return;

    try {
      const result = await client.post(
        '/register/',
        {
          withCredentials: true,
          first_name: form.values.first_name,
          username: form.values.username,
          email: form.values.email,
          password: form.values.password,
          mobile_no: form.values.mobile_no,
          speciality: form.values.speciality,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (result.data && result.data.status === 'User_created_successfully!') {
        window.localStorage.setItem("userdp", uploadedImage);

        setLoader(false);
        navigate('/');
      }
    } catch (error) {
      setLoader(false);
      if (error.response?.data) {
        const backendErrors = error.response.data;
        Object.keys(backendErrors).forEach((field) => {
          form.setFieldError(field, backendErrors[field]);
        });
      } else {
        console.error('Unexpected error:', error.message);
      }
    }
  };

  const handleDrop = (files) => {
    const file = files[0];
    const fileURL = URL.createObjectURL(file);
    setUploadedImage(fileURL);
    // window.localStorage.setItem("userdp", fileURL);

  };

  const handleViewClick = (value) => {
    setSelectedImage(value);
    setModalOpened(true);
  };

  return (

    <div className="parent">
      <div className="child1">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <div className="logo">
            <Image maw={40} radius="md" src={logo} alt="Endoscopy Logo" />
            <h2>Endoscopy</h2>
          </div>

          <Flex align="center">
            <ActionIcon size="xl" onClick={() => navigate("/login")} left={-5}>
              <FaChevronLeft size="1.5rem" />
            </ActionIcon>
            <Text fz={20} fw={600} ff='inter'>Create Your Account</Text>
          </Flex>
          <Space h="1rem" />

          <div className="imglogo">
            {uploadedImage ? (
              <Image
                src={uploadedImage}
                alt="Uploaded Preview"
                radius="50%"
                width="13rem"
                height="13rem"
              />
            ) : (
              <div className="circle">
                <Dropzone
                  onDrop={handleDrop}
                  onReject={(files) => console.log('Rejected files:', files)}
                  maxSize={3 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                >
                  <Group
                    position="center"
                    m={0}
                    spacing="xl"
                    style={{ minHeight: rem(150), pointerEvents: 'none' }}
                  >
                    <Dropzone.Accept>
                      <IconUpload
                        size="3.2rem"
                        stroke={1.5}
                        className="upload"
                        color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                      />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX
                        size="3.2rem"
                        stroke={1.5}
                        color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                      />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconPhoto size="3.2rem" stroke={1.5} />
                    </Dropzone.Idle>
                  </Group>
                </Dropzone>
              </div>
            )}
          </div>

          <form onSubmit={handleFormSubmit}>
            <TextInput
              label="Your Full Name"
              placeholder="Enter your name"
              size="md"
              radius="md"
              {...form.getInputProps('first_name')}
            />
            <Select
              label="Speciality"
              placeholder="Select"
              data={[
                { value: 'react', label: 'React' },
                { value: 'angular', label: 'Angular' },
                { value: 'vue', label: 'Vue' },
                { value: 'svelte', label: 'Svelte' },
              ]}
              size="md"
              radius="md"
              mt="md"
              {...form.getInputProps('speciality')}
            />
            <TextInput
              label="Login UserName"
              placeholder="Enter your username"
              size="md"
              mt="md"
              radius="md"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              icon={<MdLockOutline />}
              size="md"
              radius="md"
              mt="md"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              icon={<MdLockOutline />}
              size="md"
              radius="md"
              mt="md"
              {...form.getInputProps('cnfpassword')}
            />
            <TextInput
              label="Mobile Number"
              placeholder="Enter your mobile number"
              type="text"
              size="md"
              radius="md"
              mt="md"
              {...form.getInputProps('mobile_no')}
              onChange={handleMobileChange}
            />
            <TextInput
              label="Email ID"
              placeholder="Enter your email"
              icon={<MdOutlineEmail style={{ color: 'gray' }} />}
              size="md"
              radius="md"
              mt="md"
              {...form.getInputProps('email')}
            />


            <h4>Choose Template</h4>
            <Radio.Group
              value={form.values.template}
              onChange={(value) => form.setFieldValue("template", value)}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {templates.map((value, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredCard(value)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "150px",
                      height: "200px",
                      overflow: "hidden",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  >
                    <Image
                      src={report}
                      alt={`Template ${value}`}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {hoveredCard === value && (
                      <>
                        <Radio
                          color="violet"
                          checked={true}
                          value={value}
                          size='lg'
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "10px",
                            zIndex: 3,
                            padding: "4px",
                          }}
                        />
                        <Button
                          radius="md"
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 3,
                            background: "#8158F5",
                            color: "#fff",
                            fontSize: "14px",
                            padding: "4px 12px",
                          }}
                          onClick={() => handleViewClick(value)}
                        >
                          View
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </Radio.Group>
            <Space h={15} />
            <Button
              loading={loader}
              type="submit"
              variant="filled"
              color="violet"
              radius="md"
              fullWidth
            >
              Create Account
            </Button>
          </form>
        </Card>
      </div>
      <Modal
        pl={0}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={`Template ${selectedImage}`}
      >
        <Image
          src={report}
          alt={`Template ${selectedImage}`}
          style={{ width: "100%", height: "auto" }}
        />
      </Modal>
    </div>

  );
};

export default Registration;
