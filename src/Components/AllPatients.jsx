
// import React, { useState, useEffect } from "react";
// import { Card, Table, Image, Text, Group, TextInput, Button,Menu } from "@mantine/core";
// import Vector from "../assets/Vector.jpg";
// import Img2 from "../assets/Img2.jpg";
// import Img3 from "../assets/Component 13.jpg";
// import React, { useState } from 'react';
// import { Card, Table, Image, Text, Group, TextInput, Button } from '@mantine/core';
// import Vector from '../assets/Vector.jpg';
// import Img2 from '../assets/Img2.jpg';
// import Img3 from '../assets/Component 13.jpg';
// import { FiTrash2 } from "react-icons/fi";
// import client from "../Components/Api";
// import { IoMdSearch } from "react-icons/io";

// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { IoPersonOutline } from "react-icons/io5";
// import { FaRegFileAlt } from "react-icons/fa";
// import { BiLogOut } from "react-icons/bi";
// // axios.defaults.withCredentials = true;
// // axios.defaults.xsrfCookieName='csrftoken';
// // axios.defaults.xsrfHeaderName='x-csrftoken'


// const AllPatients = () => {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
// import { useNavigate } from 'react-router-dom';




// const AllPatients = () => {
//   const navigate = useNavigate()
//   const data = [
//     {
//       id: 1,
//       name: 'John Doe',
//       age: 28,
//       referredBy: 'Dr. Smith',
//       sex: 'Male',
//       phone: '123-456-7890',
//       email: 'john.doe@example.com',
//       dateTime: '2024-11-26 10:30 AM',
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       age: 34,
//       referredBy: 'Dr. Johnson',
//       sex: 'Female',
//       phone: '987-654-3210',
//       email: 'jane.smith@example.com',
//       dateTime: '2024-11-25 02:15 PM',
//     },
//     {
//       id: 3,
//       name: 'Michael Brown',
//       age: 45,
//       referredBy: 'Dr. Taylor',
//       sex: 'Male',
//       phone: '555-123-4567',
//       email: 'michael.brown@example.com',
//       dateTime: '2024-11-24 09:00 AM',
//     },
//     {
//       id: 4,
//       name: 'shain',
//       age: 28,
//       referredBy: 'Dr. Smith',
//       sex: 'Male',
//       phone: '123-456-7890',
//       email: 'john.doe@example.com',
//       dateTime: '2024-11-26 10:30 AM',
//     },
//     {
//       id: 5,
//       name: 'Jhony',
//       age: 34,
//       referredBy: 'Dr. Johnson',
//       sex: 'Female',
//       phone: '987-654-3210',
//       email: 'jane.smith@example.com',
//       dateTime: '2024-11-25 02:15 PM',
//     },
//     {
//       id: 6,
//       name: 'Mitchel marsh',
//       age: 45,
//       referredBy: 'Dr. Taylor',
//       sex: 'Male',
//       phone: '555-123-4567',
//       email: 'michael.brown@example.com',
//       dateTime: '2024-11-24 09:00 AM',
//     },
//   ];

//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRows, setSelectedRows] = useState({});
//   const [selectAll, setSelectAll] = useState(false);

//   const selectedCount = Object.values(selectedRows).filter((isSelected) => isSelected).length;
//   // const [selectedPatient, setSelectedPatient] = useState({})


//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       const response = await client.get("/all/",{
//         withCredentials:true
//       });
//       console.log(response)
//       console.log("API Response:", response.data);
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // if (Object(selectedPatient).length !== 0) {
//   //   window.localStorage.setItem('selectedPatient', JSON.stringify(selectedPatient));
//   // }
//   // Handle checkbox selection
//   const handleCheckboxChange = (id) => {
//     setSelectedRows((prevSelectedRows) => ({
//       ...prevSelectedRows,
//       [id]: !prevSelectedRows[id],
//     }));
//   };
//   const handleSelectAll = () => {
//     const newSelectAll = !selectAll;
//     setSelectAll(newSelectAll);


//     const newSelectedRows = {};
//     if (newSelectAll) {
//       data.forEach((item) => {
//         newSelectedRows[item.id] = true;
//       });
//     }
//     setSelectedRows(newSelectedRows);
//   };

//   const handleDelete = async () => {
//     const selectedIds = Object.keys(selectedRows).filter((id) => selectedRows[id]);

//     if (selectedIds.length === 0) {
//       alert("Please select at least one patient to delete.");
//       return;
//     }

//     try {
//       const response = await client.delete(
//         "/delete_patients/multiple-delete/",
//         {  withCredentials:true,
//           data: { ids: selectedIds },

//         },
//         {
//           headers:{'Content-Type':'application/json'}
//         }
//       );
//       console.log(response)
//       console.log({selectedIds})
//       console.log("Delete Response:", response.data);
//       const updatedData = data.filter((item) => !selectedIds.includes(String(item.id)));
//       setSelectedRows({});
//       setData(updatedData);
//     } catch (error) {
//       console.error("Error deleting patients:", error);
//     }
//   };
//   const navigate=useNavigate()

//   const Logout = async ()=>{
//     try{
//     let logoutdata = await client.post('/logout/',{
//       withCredentials:true
//     })
//     console.log(logoutdata)
//     console.log(logoutdata.data)
//     if(logoutdata.data.message === 'Successfully_logged_out.'){
//       localStorage.clear()
//       console.log("All localStorage items cleared.");
//       navigate('/')
//     }
//     else{
//       console.log('Error while logout')
//     }
//   }
//   catch(error){
//     console.error('Error',error)
//   }
//   } 
//   const handleDelete = () => {
//     const updatedData = data.filter((item) => !selectedRows[item.id]);
//     setSelectedRows({});
//     // Optional: Log the updated data to verify changes
//     console.log("Remaining data after delete:", updatedData);
//   };

//   // const handleSelectedpatient = (patient) => {
//   //   setSelectedPatient(patient)
//   // }

//   const filteredData = data.filter(
//     (item) =>
//       (item.patient_name && item.patient_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (item.mobile && item.mobile.includes(searchTerm)) ||
//       (item.patient_email && item.patient_email.toLowerCase().includes(searchTerm)) ||
//       (item.gender && item.gender.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
//       (item.procedure && item.procedure.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
//       (item.referred && item.referred.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
//       (item.id && String(item.id).includes(searchTerm))||
//       (item.age && String(item.age).includes(searchTerm))||
//       (item.datetime&&(String(item.datetime).includes(searchTerm)))

//   );

//   // const handlePatientDetails =(patientId)=>{
//   //   localStorage.setItem('patientId',patientId)
//   //   navigate('/cameronwillamson')
//   // }
//   return (

//     <div style={{ height: "100vh", borderRadius: "48px", padding: "32px", gap: "48px" }}>
//       <div
//         style={{
//           width: "95%",
//           height: "100%",
//           borderRadius: "48px",
//           padding: "32px",
//           gap: "48px",
//           backgroundColor: "#EBEDF4",
//         }}
//       >
//         <Card
//           style={{
//             width: "100%",
//             height: "100%",
//             borderRadius: "24px",
//             border: "1px solid #ccc",
//             padding: "32px",
//             gap: "48px",
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
//             <Image src={Vector} maw={40} />
//     <div style={{ height: "100vh", borderRadius: "48px", padding: "32px", gap: "48px", }}>

//       <div style={{ width: "95%", height: '100%', borderRadius: "48px", padding: "32px", gap: "48px", backgroundColor: "#EBEDF4" }}>
//         <Card style={{ width: "100%", height: "100%", borderRadius: "24px", border: "1px solid #ccc", padding: "32px", gap: "48px", }}>
//           <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
//             <Image
//               src={Vector}
//               maw={40}
//             />
//             <h1 style={{ marginLeft: "0.10rem", fontFamily: "inter" }}>Endoscopy</h1>
//             <div style={{ flexGrow: "1" }}>
//               <TextInput
//                 icon={<IoMdSearch />}
//                 placeholder="Search by name, phone, or email"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}

//                 style={{ marginLeft: "2rem", height: "44px", marginTop: "1rem" }}
//                 styles={{
//                   input: {
//                     backgroundColor: "#EBEDF4",
//                   },
//                 }}
//               />
//             </div>

//                 style={{ marginLeft: "2rem ", height: "44px", marginTop: "1rem" }}
//                 styles={{
//                   input: {
//                     backgroundColor: '#EBEDF4', // Apply background color here
//                   },
//                 }}
//               />

//             </div>


//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",

//                 width: "50px",
//                 height: "35px",
//                 borderRadius: "var(--Roundness6round)",
//                 backgroundColor: "#EBEDF4",
//                 marginLeft: "1rem",
//                 marginTop: "3px",

//                 width: "50px", // Box width
//                 height: "35px", // Box height
//                 borderRadius: "var(--Roundness6round)",
//                 // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Box shadow
//                 backgroundColor: "#EBEDF4", // Background color
//                 marginLeft: "1rem", // Space from the search bar
//                 marginTop: "3px"

//               }}
//             >
//               <Image src={Img2} maw={25} alt="Notification Icon" style={{ backgroundColor: "#EBEDF4" }} />
//             </div>
//             <div style={{ marginLeft: "1rem" }}>

//               <Button  color="violet" onClick={()=>{navigate('/patientinfo')}} > Add new patient
//               </Button>
//             </div>
//             <div style={{ marginLeft: "0.5rem" }}>
//               {/* <Image src={Img3} maw={36} style={{ backgroundColor: "#EBEDF4" }} /> */}
//               <Menu shadow="md" width={250} offset={8} withArrow arrowPosition="center" 
//               radius={10} position="bottom-end">
//       <Menu.Target >
//         <Button variant="white"  style={{marginRight:'-1rem'}}> 
//           <Image src={Img3} maw={36} style={{ backgroundColor: "#EBEDF4" }} />
//         </Button>
//       </Menu.Target>

//       <Menu.Dropdown p='md'>
//         <Menu.Item icon={<IoPersonOutline size={24}  style={{backgroundColor:'#EBEDF4',borderRadius:'50%',padding:'5px'}}/>}>Edit Profile</Menu.Item>

//         <Menu.Divider />

//         <Menu.Item icon={< FaRegFileAlt size={24} style={{backgroundColor:'#EBEDF4',borderRadius:'45%',padding:'5px'}}/>}>Header Setting</Menu.Item>
//         <Button variant="light" color="red" fullWidth mt={'1rem'} mb={'1rem'}
//         type="submit"
//         onClick={Logout}
//         > <BiLogOut style={{marginRight:'0.5rem',fontSize:'large'}} />Logout</Button>
//       </Menu.Dropdown>
//     </Menu>

//             </div>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginTop: "20px",
//             }}
//           >
//             <h2 style={{ fontFamily: "inter" }}>
//               All Patients <small style={{ fontFamily: "intert", fontWeight: "200" }}>{data.length}</small>
//             </h2>
//             <div style={{ display: "flex", alignItems: "center" }}>

//               <div
//                 style={{
//                   backgroundColor: "#EBEDF4",
//                   borderRadius: "28px",
//                   padding: "10px",
//                   fontSize: "20px",
//                   display: "inline-block",
//                   marginRight: "1rem",
//                 }}
//               >
//                 <Text style={{ fontSize: "18px", fontFamily: "inter" }}>
//                 <input
//                 type="checkbox"
//                 checked={selectAll}
//                 onChange={handleSelectAll}
//                 style={{
//                   cursor: "pointer",
//                   marginRight: "10px",
//                   borderRadius: "3px",
//                   width: "10px",
//                   height: "10px",
//                   transform: "scale(1.5)",
//                 }}
//                />
//                  {selectedCount} Selected

//               <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan', fontFamily: "inter" }}>Add new patient</Button>

//             </div>
//             <div style={{ marginLeft: "2rem" }}>
//               <Image src={Img3} maw={36} style={{ backgroundColor: "#EBEDF4" }} />
//             </div>

//           </div>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
//             <h2 style={{ fontFamily: "inter" }}> All Patients <small style={{ fontFamily: "intert", fontWeight: "200" }}>234,839</small></h2>
//             <div style={{ display: "flex", alignItems: "center", gap: "" }}>
//               <div
//                 style={{
//                   backgroundColor: "#EBEDF4",
//                   borderRadius: "12px",
//                   padding: "10px", // Adjust padding to increase/decrease size
//                   fontSize: "20px", // Set default font size
//                   display: "inline-block", // Keeps size based on content
//                   marginRight: "1rem"
//                 }}
//               >
//                 <Text style={{ fontSize: "18px", fontWeight: "bold", fontFamily: "inter" }}>
//                   {selectedCount} Selected

//                 </Text>
//               </div>
//               <div
//                 style={{

//                   width: "44px",
//                   height: "44px",
//                   backgroundColor: "#EBEDF4",
//                   borderRadius: "50%",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <FiTrash2
//                   size={25}
//                   color="#FF6B6B"
//                   style={{ cursor: "pointer" }}
//                   onClick={handleDelete}
//                   type="submit"
//                 />
//               </div>
// {/* 
//                   width: "44px", // Circle diameter
//                   height: "44px", // Circle diameter
//                   backgroundColor: "#EBEDF4", // Background color
//                   borderRadius: "50%", // Makes it a perfect circle
//                   display: "flex", // Flexbox to center content
//                   justifyContent: "center", // Horizontally center the icon
//                   alignItems: "center", // Vertically center the icon
//                 }}
//               > */}
//                 <FiTrash2
//                   size={25} // Icon size
//                   color="#FF6B6B" // Icon color
//                   style={{ cursor: "pointer" }} // Pointer cursor on hover
//                   onClick={handleDelete}
//                 />
//               </div>

//             </div>
//           </div>

//           <Table striped highlightOnHover withBorder withColumnBorders mb={"xs"} style={{ fontFamily: "inter" }}>
//             <thead>

//               <tr style={{ backgroundColor: "lightgray" }}>
//                 <th>Name</th>
//                 <th>Patient ID</th>
//                 <th>Age</th>
//                 <th>Gender</th>
//                 <th>Procedure</th>
//                 <th>Phone</th>
//                 <th>Email</th>
//                 <th>Referred By</th>
//                 <th>Date & Time</th>
//                 {/* <th>Select</th> */}

//               <tr style={{ backgroundColor: "lightgray" }}> {/* Light gray background for header */}
//                 <th>Name</th>
//                 <th>Patient ID</th>
//                 <th>Age</th>
//                 <th>Referred By</th>
//                 <th>Sex</th>
//                 <th>Phone Number</th>
//                 <th>Email</th>
//                 <th
//                   style={{
//                     // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Shadow for the Date & Time header
//                     backgroundColor: "lightgray", // Ensure consistent background
//                   }}
//                 >
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <span>Date & Time</span>
//                     {/* <input type="checkbox" id="selectAllDateTime" style={{ cursor: "pointer" }} /> */}
//                   </div>
//                 </th>

//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((item) => (
//                 <tr
//                   key={item.id}
//                   style={{

//                     backgroundColor: selectedRows[item.id] ? "#8158F529" : "transparent",
//                     borderRadius: "16px",
//                     transition: "background-color 0.3s ease",
//                   }}
//                   onClick={(e) => { 

//                     // Prevent navigation if a checkbox is clicked
//                     if (e.target.type !== "checkbox") {
//                       localStorage.setItem("patientid", item.id);
//                       const patientData=JSON.stringify(item)
//                       localStorage.setItem('selectedpatient',patientData)
//                       navigate("/cameronwillamson"); 
//                     }
//                   }}
//                 >
//                   <td>{item.patient_name}</td>
//                   <td>{item.id}</td>
//                   <td>{item.age}</td>
//                   <td>{item.gender}</td>
//                   <td>{item.procedure}</td>
//                   <td>{item.mobile}</td>
//                   <td>{item.patient_email}</td>
//                   <td>{item.referred}</td>
//                   <td>
//                    <div className="accent"
//                       style={{
//                          display: "flex",
//                          justifyContent: "space-between",
//                          alignItems: "center",
//                        }}
//                      >
//                        <span>{item.updated_at}</span>
//                        <span
//                          style={{
//                            cursor: "pointer",
//                            fontSize: "18px",
//                            marginLeft: "10px",
//                            color: "#999",
//                          }}
//                        >
//                          ⋮
//                        </span>

//                     <input
//                       type="checkbox"
//                       id={`checkbox-${item.id}`}
//                       checked={!!selectedRows[item.id]}
//                       onChange={() => handleCheckboxChange(item.id)}
//                       style={{
//                         cursor: "pointer",
//                         marginLeft: "10px",
//                         borderRadius: "3px",
//                         width: "10px",
//                         height: "10px",
//                         transform: "scale(1.5)",
//                       }}
//                     />
//                     {/* backgroundColor: selectedRows[item.id] ? "#EBEDF4" : "transparent", // Highlight selected rows with #FF6B6B
//                     borderRadius: "16px",
//                     transition: "background-color 0.3s ease", // Smooth transition
//                   }}
//                 > */}
//                   <td>{item.name}</td>
//                   <td>{item.id}</td>
//                   <td>{item.age}</td>
//                   <td>{item.referredBy}</td>
//                   <td>{item.sex}</td>
//                   <td>{item.phone}</td>
//                   <td>{item.email}</td>
//                   <td>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <span>{item.dateTime}</span>

//                       <span
//                         style={{
//                           cursor: "pointer",
//                           fontSize: "18px",
//                           marginLeft: "10px",
//                           color: "#999",
//                         }}
//                       >
//                         ⋮
//                       </span>
//                       <input
//                         type="checkbox"
//                         id={`checkbox-${item.id}`}
//                         checked={!!selectedRows[item.id]}
//                         onChange={() => handleCheckboxChange(item.id)}
//                         style={{
//                           cursor: "pointer",
//                           marginLeft: "10px",
//                           borderRadius: "3px",
//                           width: "10px", // Increase width
//                           height: "10px", // Increase height
//                           transform: "scale(1.5)", // Alternative scaling approach
//                         }}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AllPatients;
// import React, { useState, useEffect } from "react";
// import { Card, Table, Image, Text, Group, TextInput, Button, Menu } from "@mantine/core";
// import { FiTrash2 } from "react-icons/fi";
// import { IoMdSearch } from "react-icons/io";
// import { IoPersonOutline } from "react-icons/io5";
// import { FaRegFileAlt } from "react-icons/fa";
// import { BiLogOut } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import client from "../Components/Api";
// import Img2 from "../assets/Img2.jpg";
// import Img3 from "../assets/Component 13.jpg";
// import Vector from "../assets/Vector.jpg";

// const AllPatients = () => {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRows, setSelectedRows] = useState({});
//   const [selectAll, setSelectAll] = useState(false);
//   const navigate = useNavigate();

//   const selectedCount = Object.values(selectedRows).filter((isSelected) => isSelected).length;

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       const response = await client.get("/all/", {
//         withCredentials: true,
//       });
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedRows((prevSelectedRows) => ({
//       ...prevSelectedRows,
//       [id]: !prevSelectedRows[id],
//     }));
//   };

//   const handleSelectAll = () => {
//     const newSelectAll = !selectAll;
//     setSelectAll(newSelectAll);

//     const newSelectedRows = {};
//     if (newSelectAll) {
//       data.forEach((item) => {
//         newSelectedRows[item.id] = true;
//       });
//     }
//     setSelectedRows(newSelectedRows);
//   };

//   const handleDelete = async () => {
//     const selectedIds = Object.keys(selectedRows).filter((id) => selectedRows[id]);

//     if (selectedIds.length === 0) {
//       alert("Please select at least one patient to delete.");
//       return;
//     }

//     try {
//       const response = await client.delete("/delete_patients/multiple-delete/", {
//         withCredentials: true,
//         data: { ids: selectedIds },
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const updatedData = data.filter((item) => !selectedIds.includes(String(item.id)));
//       setSelectedRows({});
//       setData(updatedData);
//     } catch (error) {
//       console.error("Error deleting patients:", error);
//     }
//   };

//   const Logout = async () => {
//     try {
//       const logoutdata = await client.post('/logout/', {
//         withCredentials: true,
//       });
//       if (logoutdata.data.message === 'Successfully_logged_out.') {
//         localStorage.clear();
//         navigate('/');
//       } else {
//         console.log('Error while logout');
//       }
//     } catch (error) {
//       console.error('Error', error);
//     }
//   };

//   const filteredData = data.filter((item) =>
//     (item.patient_name && item.patient_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (item.mobile && item.mobile.includes(searchTerm)) ||
//     (item.patient_email && item.patient_email.toLowerCase().includes(searchTerm)) ||
//     (item.gender && item.gender.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (item.procedure && item.procedure.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (item.referred && item.referred.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (item.id && String(item.id).includes(searchTerm)) ||
//     (item.age && String(item.age).includes(searchTerm)) ||
//     (item.datetime && String(item.datetime).includes(searchTerm))
//   );

//   return (
//     <div style={{ height: "100vh", borderRadius: "48px", padding: "32px", gap: "48px" }}>
//       <div style={{ width: "95%", height: "100%", borderRadius: "48px", padding: "32px", gap: "48px", backgroundColor: "#EBEDF4" }}>
//         <Card style={{ width: "100%", height: "100%", borderRadius: "24px", border: "1px solid #ccc", padding: "32px", gap: "48px" }}>
//           <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
//             <Image src={Vector} maw={40} />
//             <h1 style={{ marginLeft: "0.10rem", fontFamily: "inter" }}>Endoscopy</h1>
//             <div style={{ flexGrow: "1" }}>
//               <TextInput
//                 icon={<IoMdSearch />}
//                 placeholder="Search by name, phone, or email"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ marginLeft: "2rem", height: "44px", marginTop: "1rem",marginRight:'0.5rem '}}
//                 styles={{ input: { backgroundColor: "#EBEDF4" } }}
//               />
//             </div>
//             <Button color="violet" onClick={() => navigate('/patientinfo')}>
//               Add new patient
//             </Button>
//             <Menu shadow="md" width={250} offset={8} withArrow arrowPosition="center" radius={10} position="bottom-end">
//               <Menu.Target>
//                 <Button variant="white" style={{ marginRight: '-1rem' }}>
//                   <Image src={Img3} maw={36} style={{ backgroundColor: "#EBEDF4" }} />
//                 </Button>
//               </Menu.Target>
//               <Menu.Dropdown p='md'>
//                 <Menu.Item icon={<IoPersonOutline size={24} style={{ backgroundColor: '#EBEDF4', borderRadius: '50%', padding: '5px' }} />}>
//                   Edit Profile
//                 </Menu.Item>
//                 <Menu.Divider />
//                 <Menu.Item icon={<FaRegFileAlt size={24} style={{ backgroundColor: '#EBEDF4', borderRadius: '45%', padding: '5px' }} />}>
//                   Header Setting
//                 </Menu.Item>
//                 <Button variant="light" color="red" fullWidth mt={'1rem'} mb={'1rem'} type="submit" onClick={Logout}>
//                   <BiLogOut style={{ marginRight: '0.5rem', fontSize: 'large' }} /> Logout
//                 </Button>
//               </Menu.Dropdown>
//             </Menu>
//           </div>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
//             <h2 style={{ fontFamily: "inter" }}>
//               All Patients <small style={{ fontFamily: "inter", fontWeight: "200" }}>{data.length}</small>
//             </h2>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <div style={{ backgroundColor: "#EBEDF4", borderRadius: "28px", padding: "10px", fontSize: "20px", display: "inline-block", marginRight: "1rem" }}>
//                 <Text style={{ fontSize: "18px", fontFamily: "inter" }}>
//                   <input
//                     type="checkbox"
//                     checked={selectAll}
//                     onChange={handleSelectAll}
//                     style={{
//                       cursor: "pointer",
//                       marginRight: "10px",
//                       borderRadius: "3px",
//                       width: "10px",
//                       height: "10px",
//                       transform: "scale(1.5)",
//                     }}
//                   />
//                   {selectedCount} Selected
//                 </Text>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
//             <FiTrash2
//               size={25}
//               color="#FF6B6B"
//               style={{ cursor: "pointer" }}
//               onClick={handleDelete}
//             />
//           </div>

//             </div>

//           </div>

//           <Table striped highlightOnHover withBorder withColumnBorders mb={"xs"} style={{ fontFamily: "inter" }}>
//             <thead>
//               <tr style={{ backgroundColor: "lightgray" }}>
//                 <th>Name</th>
//                 <th>Patient ID</th>
//                 <th>Age</th>
//                 <th>Referred By</th>
//                 <th>Sex</th>
//                 <th>Phone Number</th>
//                 <th>Email</th>
//                 <th>Date & Time</th>
//               </tr>
//             </thead>
//             <tbody>
//   {filteredData.map((item) => (
//     <tr
//       key={item.id}
//       style={{
//         backgroundColor: selectedRows[item.id] ? "#8158F529" : "transparent",
//         borderRadius: "16px",
//         transition: "background-color 0.3s ease",
//       }}
//       onClick={(e) => {
//         if (e.target.type !== "checkbox") {
//           localStorage.setItem("patientid", item.id);
//           const patientData = JSON.stringify(item);
//           localStorage.setItem("selectedpatient", patientData);
//           navigate("/cameronwillamson");
//         }
//       }}
//     >
//       <td>{item.patient_name}</td>
//       <td>{item.id}</td>
//       <td>{item.age}</td>
//       <td>{item.referred}</td>
//       <td>{item.gender}</td>
//       <td>{item.mobile}</td>
//       <td>{item.patient_email}</td>
//       <td>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <span>{item.updated_at}</span>
//           <span
//                         style={{
//                           cursor: "pointer",
//                           fontSize: "18px",
//                           marginLeft: "10px",
//                           color: "#999",
//                         }}
//                       >
//                         ⋮
//                       </span>
//           <input
//             type="checkbox"
//             id={`checkbox-${item.id}`}
//             checked={!!selectedRows[item.id]}
//             onChange={() => handleCheckboxChange(item.id)}
//             style={{
//               cursor: "pointer",
//               marginLeft: "10px",
//               borderRadius: "3px",
//               width: "10px",
//               height: "10px",
//               transform: "scale(1.5)",
//             }}
//           />
//         </div>
//       </td>
//     </tr>
//   ))}
// </tbody>

//           </Table>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AllPatients;



import React, { useState, useEffect } from "react";
import { Card, Table, Image, Text, Group, TextInput, Button, Menu, ActionIcon } from "@mantine/core";
import Vector from "../assets/Vector.jpg";
import Img2 from "../assets/Img2.jpg";
import Img3 from "../assets/Component 13.jpg";
import { FiTrash2 } from "react-icons/fi";
import client from "../Components/Api";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { format } from "date-fns";
import setting from "../assets/settings.png"
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName='csrftoken';
// axios.defaults.xsrfHeaderName='x-csrftoken'


const AllPatients = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [token, setToken, removeToken] = useCookies(['sessionid']);

  const selectedCount = Object.values(selectedRows).filter((isSelected) => isSelected).length;

  const formatDateTime = (date) => {
    let dateString = new Date(date)
    return format(dateString, "dd MMMM yyyy | h:mm a");
  };

  useEffect(() => {
    fetchPatients();
    localStorage.clear()
  }, []);

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
    } catch (error) {
      console.error("Error deleting patients:", error);
    }
  };
  const navigate = useNavigate()

  const Logout = async () => {
    try {
      let logoutdata = await client.post('/logout/', {
      })
      console.log(logoutdata)
      console.log(logoutdata.data)
      if (logoutdata.data.message === 'Successfully_logged_out.') {
        localStorage.clear()
        removeToken(['sessionid']);
        console.log("All localStorage items cleared.");
        navigate('/')
      }
      else {
        console.log('Error while logout')
      }
    }
    catch (error) {
      console.error('Error', error)
    }
  }

  const filteredData = data.filter(
    (item) =>
      (item.patient_name && item.patient_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.mobile && item.mobile.includes(searchTerm)) ||
      (item.patient_email && item.patient_email.toLowerCase().includes(searchTerm)) ||
      (item.gender && item.gender.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
      (item.procedure && item.procedure.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
      (item.referred && item.referred.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
      (item.id && String(item.id).includes(searchTerm)) ||
      (item.age && String(item.age).includes(searchTerm)) ||
      (item.datetime && (String(item.datetime).includes(searchTerm)))

  );

  // const handlePatientDetails =(patientId)=>{
  //   localStorage.setItem('patientId',patientId)
  //   navigate('/cameronwillamson')
  // }
  return (
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
          style={{
            width: "auto",
            height: "auto",
            borderRadius: "24px",
            border: "1px solid #ccc",
            padding: "32px 15px",
            gap: "48px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Image src={Vector} maw={40} />
            <h1 style={{ marginLeft: "0.10rem", fontFamily: "inter" }}>Endoscopy</h1>
            <div style={{ flexGrow: "1" }}>
              <TextInput
                icon={<IoMdSearch />}
                placeholder="Search by name, phone, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginLeft: "2rem", height: "44px", marginTop: "1rem" }}
                styles={{
                  input: {
                    backgroundColor: "#EBEDF4",
                  },
                }}
              />
            </div>
            <div
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
            </div>
            <div style={{ marginLeft: "1rem" }}>
              <Button color="violet" onClick={() => { navigate('/patientinfo') }} > Add new patient
              </Button>
            </div>
            <div style={{ marginLeft: "0.5rem" }}>
              {/* <Image src={Img3} maw={36} style={{ backgroundColor: "#EBEDF4" }} /> */}
              <Menu shadow="md" width={250} offset={8} withArrow arrowPosition="center"
                radius={10} position="bottom-end">
                <Menu.Target >
                  <Button variant="white" style={{ marginRight: '-1rem' }}>
                    <Image src={Img3} maw={36} style={{ backgroundColor: "#EBEDF4" }} />
                  </Button>
                </Menu.Target>

                <Menu.Dropdown p='md'>
                  <Menu.Item icon={<IoPersonOutline size={24} style={{ backgroundColor: '#EBEDF4', borderRadius: '50%', padding: '5px' }} />}
                  // onClick={() => navigate("/register")}
                  >Edit Profile</Menu.Item>

                  <Menu.Divider />

                  <Menu.Item icon={< FaRegFileAlt size={24} style={{ backgroundColor: '#EBEDF4', borderRadius: '45%', padding: '5px' }} />}
                    onClick={() => navigate("/headersetting")}
                  >Header Setting</Menu.Item>
                  <Button variant="light" color="red" fullWidth mt={'1rem'} mb={'1rem'}
                    type="submit"
                    onClick={Logout}
                  > <BiLogOut style={{ marginRight: '0.5rem', fontSize: 'large' }} />Logout</Button>
                </Menu.Dropdown>
              </Menu>

            </div>
          </div>
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
              <div
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
                  onClick={handleDelete}
                  type="submit"
                />
              </div>
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
                  onClick={(e) => {

                    // Prevent navigation if a checkbox is clicked
                    if (e.target.type !== "checkbox") {
                      localStorage.setItem("patientid", item.id);
                      const patientData = JSON.stringify(item)
                      localStorage.setItem('selectedpatient', patientData)
                      navigate("/cameronwillamson");
                    }
                  }}
                >
                  <td>{item.patient_name}</td>
                  <td>{item.id}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.procedure}</td>
                  <td>{item.mobile}</td>
                  <td>{item.patient_email}</td>
                  <td>{item.referred}</td>
                  <td>
                    <div className="accent"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{formatDateTime(item.updated_at)}</span>
                      <span
                        style={{
                          cursor: "pointer",
                          fontSize: "18px",
                          marginLeft: "10px",
                          color: "#999",
                        }}
                      >
                        ⋮
                      </span>

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
  );
};

export default AllPatients;