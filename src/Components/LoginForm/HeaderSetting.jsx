import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Button,
  Card,
  Radio,
  Textarea,
  SimpleGrid,
  Flex,
  Group,
  useMantineTheme,
  rem,
  Modal,
  Image,
} from '@mantine/core';
import { MdOutlineEmail } from "react-icons/md";
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FaChevronLeft } from "react-icons/fa6";
import { Navigate, useNavigate } from 'react-router-dom';
import report from "../../assets/report.png";

const HeaderSetting = () => {
  const [hoveredCard, setHoveredCard] = useState("1");
  const [loader, setLoader] = useState(false);
  const [modalOpened, setModalOpened] = useState(false); // Modal visibility state
  const [selectedImage, setSelectedImage] = useState(null); // Selected image index or src
  const [uploadedImage, setUploadedImage] = useState(null); // State for uploaded image preview
  console.log(uploadedImage);

  const navigate = useNavigate();
  const templates = ["default"];

  // Initialize form with the default template selected
  const form = useForm({
    initialValues: {
      hospitalname: '',
      hospitaladdress: '',
      hospitalemail: '',
      hospitalnumber: '',
      template: templates[0], // Set the initial value to the first template in the array
    },
  });

  const theme = useMantineTheme();

  const handleSave = () => {
    setLoader(true);
    const formData = form.values;
    setTimeout(() => {
      localStorage.setItem('headerSettings', JSON.stringify(formData));
    }, 3000);
    setTimeout(() => {
      setLoader(false);
      navigate("/allpatients");
      window.localStorage.setItem("dp", uploadedImage);
    }, 1000);
  };

  const handleViewClick = (value) => {
    setSelectedImage(value); // Set the selected image
    setModalOpened(true); // Open the modal
  };

  const handleDrop = (files) => {
    const file = files[0];
    const fileURL = URL.createObjectURL(file); // Create a URL for the uploaded file
    setUploadedImage(fileURL); // Update the state with the image URL
    // window.localStorage.setItem("dp", fileURL);

  };

  return (
    <>{
      window.localStorage.getItem("loginStatus") === "user_validated" ? (
        <div className="parent">
          <div className="header">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <div className="headerset">
                <div className="addnewpatient">
                  <Button
                    variant="light"
                    color="#EBEDF4"
                    mt="md"
                    mr="md"
                    radius="md"
                    onClick={() => navigate("/allpatients")}
                  >
                    <FaChevronLeft className="left" />
                  </Button>
                  <div className="ADDNEW">Header Setting</div>
                </div>
                <Button color="violet" mt="md" onClick={handleSave} loading={loader}>
                  Save
                </Button>
              </div>

              <Flex justify={"center"}>
                {uploadedImage ? (
                  <div className="dropzone1">
                    <Image
                      src={uploadedImage}
                      alt="Uploaded Preview"
                      radius={"50%"}
                      width={"13rem"}
                      height={"13rem"}
                    />
                  </div>

                ) : (
                  <div className="dropzone1">
                    <Dropzone
                      w={"13rem"}
                      radius={"50%"}
                      onDrop={handleDrop}
                      onReject={(files) => console.log('rejected files', files)}
                      accept={IMAGE_MIME_TYPE}
                    >
                      <Group
                        position="center"
                        spacing="xl"
                        m={0}
                        style={{ minHeight: rem(170), pointerEvents: 'none' }}
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
              </Flex>

              <SimpleGrid cols={3} mt="lg">
                <TextInput
                  placeholder="Hospital Name"
                  label="Hospital Name"
                  size="md"
                  radius="md"
                  {...form.getInputProps('hospitalname')}
                />
                <TextInput
                  placeholder="Hospital Number"
                  label="Hospital Number"
                  type="number"
                  size="md"
                  radius="md"
                  {...form.getInputProps('hospitalnumber')}
                />
                <TextInput
                  label="Hospital Email"
                  placeholder="@123abc.com"
                  size="md"
                  radius="md"
                  icon={<MdOutlineEmail style={{ color: 'gray' }} />}
                  {...form.getInputProps('hospitalemail')}
                />
              </SimpleGrid>

              <div className="hospitaladdress">
                <Textarea
                  placeholder="Hospital Address"
                  label="Hospital Address"
                  size="md"
                  radius="md"
                  mt="lg"
                  {...form.getInputProps('hospitaladdress')}
                />
              </div>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder mt="lg">
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
                        width: "200px",
                        height: "250px",
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
            </Card>
          </div>

          {/* Modal for full-screen image */}
          <Modal pl={0}
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
      ) : (<Navigate to={"/"} />)
    }
    </>
  );
};

export default HeaderSetting;

