import React, { useState, useEffect } from "react";
import { Card, Table, Image, Text, Group, TextInput, Button, Menu, ActionIcon, Avatar, Modal, Select, Flex, Space } from "@mantine/core";
import Vector from "../assets/Vector.jpg";
import Img2 from "../assets/Img2.jpg";
import Img3 from "../assets/Component 13.jpg";
import { FiTrash2 } from "react-icons/fi";
import client from "../Components/Api";
import { IoMdSearch } from "react-icons/io";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { format } from "date-fns";
import setting from "../assets/settings.png"
import { FaWifi } from "react-icons/fa6";
import { useForm } from "@mantine/form";
import { MdModeEdit, MdOutlineEmail } from "react-icons/md";
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName='csrftoken';
// axios.defaults.xsrfHeaderName='x-csrftoken'


const AllPatients = () => {
  const [deleteModal, setdeleteModal] = useState(false)
  const [data, setData] = useState([]);

  // const data = [
  //   {
  //     "id": 9,
  //     "patient_name": "neha1",
  //     "age": 20,
  //     "gender": "female",
  //     "procedure": "lazer",
  //     "mobile": "9786543210",
  //     "patient_email": "setavakavya2000@gmail.com",
  //     "referred": "self",
  //     "updated_at": "2024-12-17T15:20:34.917306Z"
  //   },
  //   {
  //     "id": 10,
  //     "patient_name": "Vivek",
  //     "age": 29,
  //     "gender": "male",
  //     "procedure": "lazer",
  //     "mobile": "9999999999",
  //     "patient_email": "viveknani2@gmail.com",
  //     "referred": "Vivek",
  //     "updated_at": "2024-12-18T11:11:49.935237Z"
  //   },
  //   {
  //     "id": 11,
  //     "patient_name": "Kumar",
  //     "age": 29,
  //     "gender": "male",
  //     "procedure": "lazer",
  //     "mobile": "9999999999",
  //     "patient_email": "viveknani2@gmail.com",
  //     "referred": "Vivek",
  //     "updated_at": "2024-12-18T11:11:49.935237Z"
  //   },

  // ]



  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [token, setToken, removeToken] = useCookies(['sessionid']);
  const [uploadedImage, setUploadedImage] = useState(null); // State for uploaded image preview
  // const [editModal, setEditModal] = useState(false)
  console.log(uploadedImage);


  const selectedCount = Object.values(selectedRows).filter((isSelected) => isSelected).length;

  const formatDateTime = (date) => {
    let dateString = new Date(date)
    return format(dateString, "dd MMMM yyyy | h:mm a");
  };




  useEffect(() => {
    fetchPatients();
    // localStorage.clear()
    localStorage.removeItem('capturedImages');
    localStorage.removeItem('capturedVideos');
    localStorage.removeItem('selectedImages');
    localStorage.removeItem('selectedVideos');
    localStorage.removeItem('selectedpatient');
    localStorage.removeItem('imageComments');
    localStorage.removeItem('time');
    const imageFromStorage = localStorage.getItem("userdp");
    setUploadedImage(imageFromStorage);

  }, [data]);


  const fetchPatients = async () => {
    try {
      const response = await client.get("/all/", {
        withCredentials: true
      });
      console.log(response)
      console.log("API Response:", response.data);
      setData(response.data.reverse());

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => ({
      ...prevSelectedRows,
      [id]: !prevSelectedRows[id],
    }));
  };
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedRows = {};
    if (newSelectAll) {
      data.forEach((item) => {
        newSelectedRows[item.id] = true;
      });
    }
    setSelectedRows(newSelectedRows);
  };

  const handleDelete = async () => {
    const selectedIds = Object.keys(selectedRows).filter((id) => selectedRows[id]);

    if (selectedIds.length === 0) {
      alert("Please select at least one patient to delete.");
      return;
    }

    try {
      const response = await client.delete(
        "/delete_patients/multiple-delete/",
        {
          withCredentials: true,
          data: { ids: selectedIds },

        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log(response)
      console.log({ selectedIds })
      console.log("Delete Response:", response.data);
      const updatedData = data.filter((item) => !selectedIds.includes(String(item.id)));
      setSelectedRows({});
      setData(updatedData);
      setdeleteModal(false)
    } catch (error) {
      console.error("Error deleting patients:", error);
    }
  };
  const navigate = useNavigate()

  const Logout = async () => {
    try {
      let logoutdata = await client.post('/logout/', {
        withCredentials: true
      })
      console.log(logoutdata)
      console.log(logoutdata.data)
      if (logoutdata.data.message === 'Successfully_logged_out.') {
        localStorage.clear()
        removeToken(['sessionid']);
        console.log("All localStorage items cleared.");
        navigate('/login')
      }
      else {
        console.log('Error while logout')
      }
    }
    catch (error) {
      console.error('Error', error)
    }
  }

  const filteredData = data
    .filter(
      (item) =>
        (item.patient_name && item.patient_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.mobile && item.mobile.includes(searchTerm)) ||
        (item.patient_email && item.patient_email.toLowerCase().includes(searchTerm)) ||
        (item.gender && item.gender.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
        (item.procedure && item.procedure.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
        (item.referred && item.referred.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
        (item.id && String(item.id).includes(searchTerm)) ||
        (item.age && String(item.age).includes(searchTerm)) ||
        (item.datetime && String(item.datetime).includes(searchTerm))
    )
    .sort((a, b) => b.id - a.id); // Sorting in descending order by patient_id


  // const handlePatientDetails =(patientId)=>{
  //   localStorage.setItem('patientId',patientId)
  //   navigate('/cameronwillamson')
  // }

  return (
    <>
      {
        window.localStorage.getItem("loginStatus") === "user_validated" ? (
          <>
            <Modal opened={deleteModal} onClose={() => setdeleteModal(false)} centered title={'Are you sure?'}>
              You want to delete the selected patient(s)
              <Flex justify={"end"} mt={"1rem"}>
                <Group>
                  <Button variant="outline" color={"violet"} onClick={() => setdeleteModal(false)}>No</Button>
                  <Button variant="filled" color={"violet"} onClick={handleDelete}>Yes</Button>
                </Group>

              </Flex>
            </Modal>
            <div style={{ height: "100vh", borderRadius: "48px", padding: "32px", gap: "48px" }}>

              <div
                style={{
                  width: "95%",
                  height: "100%",
                  borderRadius: "48px",
                  padding: "32px",
                  gap: "48px",
                  backgroundColor: "#EBEDF4",
                }}
              >
                <Card
                  mih={"35vh"}
                  style={{
                    width: "auto",
                    height: "auto",
                    borderRadius: "24px",
                    // border: "1px solid #ccc",
                    padding: "32px 15px",
                    gap: "48px",
                  }}
                >
                  <Flex align={"center"}>
                    <div style={{ display: "flex", alignItems: "center", width: "100%", gap: 5 }}>
                      <Image src={Vector} maw={40} />
                      <h1 style={{ marginLeft: "0.10rem", fontFamily: "inter" }}>Endoscopy</h1>
                      <div style={{ flexGrow: "1" }}>
                        <TextInput
                          icon={<IoMdSearch />}
                          placeholder="Search by name, phone, or email"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{ marginLeft: "2rem" }}
                          styles={{
                            input: {
                              backgroundColor: "#EBEDF4",
                            },
                          }}
                        />
                      </div>
                      {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "35px",
                borderRadius: "4px",
                backgroundColor: "#EBEDF4",
                marginLeft: "1rem",
                marginTop: "3px",
              }}
            >
              <Image src={setting} maw={18} alt="Notification Icon" style={{ backgroundColor: "#EBEDF4" }} />
            </div> */}
                      <div style={{ marginLeft: "1rem" }}>
                        <Button color="violet" onClick={() => { navigate('/patientinfo') }} > Add new patient
                        </Button>
                      </div>
                      <div style={{ marginLeft: "0.5rem" }}>
                        {/* <Image src={Img3} maw={36} style={{ backgroundColor: "#EBEDF4" }} /> */}
                        <Menu shadow="md" width={250} offset={8} withArrow arrowPosition="center"
                          radius={10} position="bottom-end" >
                          <Menu.Target >
                            {/* <Button variant="white" style={{ marginRight: '-1rem' }}> */}
                            {/* <Image src={Img3} maw={36} style={{ backgroundColor: "#EBEDF4" }} /> */}
                            <Avatar src={uploadedImage} radius={"lg"} />
                            {/* </Button> */}
                          </Menu.Target>

                          <Menu.Dropdown p='md' style={{ zIndex: 100 }}>
                            <Menu.Item icon={<FaWifi size={20} style={{ backgroundColor: '#EBEDF4', borderRadius: '50%', padding: '5px' }} />}
                              onClick={() => navigate("/wifi")}
                            >Wifi</Menu.Item>

                            <Menu.Item icon={<IoPersonOutline size={20} style={{ backgroundColor: '#EBEDF4', borderRadius: '50%', padding: '5px' }} />}
                              onClick={() => navigate('/edituser')}
                            >Edit Profile</Menu.Item>



                            <Menu.Item icon={< FaRegFileAlt size={20} style={{ backgroundColor: '#EBEDF4', borderRadius: '50%', padding: '5px' }} />}
                              onClick={() => navigate("/headersetting")}
                            >Header Setting</Menu.Item>
                            <Menu.Divider />
                            <Button variant="light" color="red" fullWidth mt={'1rem'} mb={'1rem'}
                              type="submit"
                              onClick={Logout}
                            > <BiLogOut style={{ marginRight: '0.5rem', fontSize: 'large' }} />Logout</Button>
                          </Menu.Dropdown>
                        </Menu>

                      </div>
                    </div>
                  </Flex>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <h2 style={{ fontFamily: "inter" }}>
                      All Patients <small style={{ fontWeight: "200", fontSize: "18px" }}>{data.length}</small>
                    </h2>
                    <div style={{ display: "flex", alignItems: "center" }}>

                      <div
                        style={{
                          backgroundColor: "#EBEDF4",
                          borderRadius: "28px",
                          padding: "10px",
                          fontSize: "20px",
                          display: "inline-block",
                          marginRight: "1rem",
                        }}
                      >
                        <Text style={{ fontSize: "18px", fontFamily: "inter" }}>
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            style={{
                              cursor: "pointer",
                              marginRight: "10px",
                              borderRadius: "3px",
                              width: "12px",
                              height: "12px",
                              transform: "scale(1.5)",

                            }}
                          />
                          {selectedCount} Selected
                        </Text>
                      </div>

                      <ActionIcon variant="filled" bg={"#EBEDF4"} size={44} radius={"50%"} disabled={selectedCount > 0 ? false : true}
                        type="submit"
                        onClick={() => { selectedCount > 0 && setdeleteModal(true) }}
                      >
                        <FiTrash2 size={20} color="#FF6B6B" />
                      </ActionIcon>
                      {/* <div
                    style={{
                      width: "44px",
                      height: "44px",
                      backgroundColor: "#EBEDF4",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FiTrash2
                      size={20}
                      color="#FF6B6B"
                      style={{ cursor: "pointer" }}
                      // onClick={handleDelete}
                      onClick={() => { selectedCount > 0 && setdeleteModal(true) }}
                      type="submit"
                    />
                  </div> */}
                    </div>
                  </div>

                  <Table striped highlightOnHover withBorder withColumnBorders mb={"xs"}>
                    <thead>
                      <tr style={{ backgroundColor: "#EBEDF4" }}>
                        <th>Name</th>
                        <th>Patient ID</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Procedure</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Referred By</th>
                        <th>Date & Time</th>
                        {/* <th>Select</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item) => (
                        <tr
                          key={item.id}
                          style={{
                            cursor: 'pointer',
                            backgroundColor: selectedRows[item.id] ? "#8158F529" : "transparent",
                            borderRadius: "16px",
                            transition: "background-color 0.3s ease",
                          }}

                        >
                          <td onClick={(e) => {
                            if (e.target.type !== "checkbox") {
                              localStorage.setItem("patientid", item.id);
                              const patientData = JSON.stringify(item)
                              localStorage.setItem('selectedpatient', patientData)
                              navigate(`/${item.patient_name}`);
                            }
                          }}>{item.patient_name}</td>
                          <td
                            onClick={(e) => {
                              if (e.target.type !== "checkbox") {
                                localStorage.setItem("patientid", item.id);
                                const patientData = JSON.stringify(item)
                                localStorage.setItem('selectedpatient', patientData)
                                navigate(`/${item.patient_name}`);
                              }
                            }}>{item.id}</td>
                          <td
                            onClick={(e) => {
                              if (e.target.type !== "checkbox") {
                                localStorage.setItem("patientid", item.id);
                                const patientData = JSON.stringify(item)
                                localStorage.setItem('selectedpatient', patientData)
                                navigate(`/${item.patient_name}`);
                              }
                            }}>{item.age}</td>
                          <td
                            onClick={(e) => {
                              if (e.target.type !== "checkbox") {
                                localStorage.setItem("patientid", item.id);
                                const patientData = JSON.stringify(item)
                                localStorage.setItem('selectedpatient', patientData)
                                navigate(`/${item.patient_name}`);
                              }
                            }}>{item.gender}</td>
                          <td
                            onClick={(e) => {
                              if (e.target.type !== "checkbox") {
                                localStorage.setItem("patientid", item.id);
                                const patientData = JSON.stringify(item)
                                localStorage.setItem('selectedpatient', patientData)
                                navigate(`/${item.patient_name}`);
                              }
                            }}>{item.procedure}</td>
                          <td
                            onClick={(e) => {
                              if (e.target.type !== "checkbox") {
                                localStorage.setItem("patientid", item.id);
                                const patientData = JSON.stringify(item)
                                localStorage.setItem('selectedpatient', patientData)
                                navigate(`/${item.patient_name}`);
                              }
                            }}>{item.mobile}</td>
                          <td
                            onClick={(e) => {
                              if (e.target.type !== "checkbox") {
                                localStorage.setItem("patientid", item.id);
                                const patientData = JSON.stringify(item)
                                localStorage.setItem('selectedpatient', patientData)
                                navigate(`/${item.patient_name}`);
                              }
                            }}>{item.patient_email}</td>
                          <td
                            onClick={(e) => {
                              if (e.target.type !== "checkbox") {
                                localStorage.setItem("patientid", item.id);
                                const patientData = JSON.stringify(item)
                                localStorage.setItem('selectedpatient', patientData)
                                navigate(`/${item.patient_name}`);
                              }
                            }}>{item.referred}</td>
                          <td>
                            <div className="accent"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <span onClick={(e) => {
                                if (e.target.type !== "checkbox") {
                                  localStorage.setItem("patientid", item.id);
                                  const patientData = JSON.stringify(item)
                                  localStorage.setItem('selectedpatient', patientData)
                                  navigate(`/${item.patient_name}`);
                                }
                              }}>{formatDateTime(item.updated_at)}</span>

                              <Menu shadow="md" width={"auto"} offset={8} withArrow arrowPosition="center"
                                radius={10} position="bottom-end">
                                <Menu.Target>
                                  {/* <span
                            style={{
                              cursor: "pointer",
                              fontSize: "18px",
                              marginLeft: "10px",
                              color: "#999",
                            }}
                          >
                            ⋮
                          </span> */}
                                  <ActionIcon variant="light"><MdModeEdit /></ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown bg={"#EBEDF4"}>
                                  <Menu.Item onClick={() => {
                                    const patientData = JSON.stringify(item)
                                    window.localStorage.setItem('selectedpatient', patientData)
                                    navigate("/editpatient")
                                  }}>
                                    Edit
                                  </Menu.Item>
                                </Menu.Dropdown>
                              </Menu>


                              <input
                                type="checkbox"
                                id={`checkbox-${item.id}`}
                                checked={!!selectedRows[item.id]}
                                onChange={() => handleCheckboxChange(item.id)}
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "10px",
                                  borderRadius: "3px",
                                  width: "10px",
                                  height: "10px",
                                  transform: "scale(1.5)",
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </div>
          </>
        ) : (<Navigate to={"/"} />)
      }


    </>

  );
};

export default AllPatients;