import React, { useState } from 'react';
import { Card, Table, Image, Text, Group, TextInput, Button } from '@mantine/core';
import Vector from '../assets/Vector.jpg';
import Img2 from '../assets/Img2.jpg';
import Img3 from '../assets/Component 13.jpg';
import { FiTrash2 } from "react-icons/fi";


import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';




const AllPatients = () => {
  const navigate = useNavigate()
  const data = [
    {
      id: 1,
      name: 'John Doe',
      age: 28,
      referredBy: 'Dr. Smith',
      sex: 'Male',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
      dateTime: '2024-11-26 10:30 AM',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 34,
      referredBy: 'Dr. Johnson',
      sex: 'Female',
      phone: '987-654-3210',
      email: 'jane.smith@example.com',
      dateTime: '2024-11-25 02:15 PM',
    },
    {
      id: 3,
      name: 'Michael Brown',
      age: 45,
      referredBy: 'Dr. Taylor',
      sex: 'Male',
      phone: '555-123-4567',
      email: 'michael.brown@example.com',
      dateTime: '2024-11-24 09:00 AM',
    },
    {
      id: 4,
      name: 'shain',
      age: 28,
      referredBy: 'Dr. Smith',
      sex: 'Male',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
      dateTime: '2024-11-26 10:30 AM',
    },
    {
      id: 5,
      name: 'Jhony',
      age: 34,
      referredBy: 'Dr. Johnson',
      sex: 'Female',
      phone: '987-654-3210',
      email: 'jane.smith@example.com',
      dateTime: '2024-11-25 02:15 PM',
    },
    {
      id: 6,
      name: 'Mitchel marsh',
      age: 45,
      referredBy: 'Dr. Taylor',
      sex: 'Male',
      phone: '555-123-4567',
      email: 'michael.brown@example.com',
      dateTime: '2024-11-24 09:00 AM',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState({});
  const selectedCount = Object.values(selectedRows).filter((isSelected) => isSelected).length;
  // const [selectedPatient, setSelectedPatient] = useState({})

  // if (Object(selectedPatient).length !== 0) {
  //   window.localStorage.setItem('selectedPatient', JSON.stringify(selectedPatient));
  // }
  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => ({
      ...prevSelectedRows,
      [id]: !prevSelectedRows[id],
    }));
  };

  const handleDelete = () => {
    const updatedData = data.filter((item) => !selectedRows[item.id]);
    setSelectedRows({});
    // Optional: Log the updated data to verify changes
    console.log("Remaining data after delete:", updatedData);
  };

  // const handleSelectedpatient = (patient) => {
  //   setSelectedPatient(patient)
  // }

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm)
  );

  const rows = filteredData.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.id}</td>
      <td>{item.age}</td>
      <td>{item.referredBy}</td>
      <td>{item.sex}</td>
      <td>{item.phone}</td>
      <td>{item.email}</td>
      <td>{item.dateTime}</td>
    </tr>
  ));

  return (
    <div style={{ height: "100vh", borderRadius: "48px", padding: "32px", gap: "48px", }}>

      <div style={{ width: "95%", height: '100%', borderRadius: "48px", padding: "32px", gap: "48px", backgroundColor: "#EBEDF4" }}>
        <Card style={{ width: "100%", height: "100%", borderRadius: "24px", border: "1px solid #ccc", padding: "32px", gap: "48px", }}>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Image
              src={Vector}
              maw={40}
            />
            <h1 style={{ marginLeft: "0.10rem", fontFamily: "inter" }}>Endoscopy</h1>
            <div style={{ flexGrow: "1" }}>
              <TextInput
                icon={<IoMdSearch />}
                placeholder="Search by name, phone, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginLeft: "2rem ", height: "44px", marginTop: "1rem" }}
                styles={{
                  input: {
                    backgroundColor: '#EBEDF4', // Apply background color here
                  },
                }}
              />

            </div>


            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px", // Box width
                height: "35px", // Box height
                borderRadius: "var(--Roundness6round)",
                // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Box shadow
                backgroundColor: "#EBEDF4", // Background color
                marginLeft: "1rem", // Space from the search bar
                marginTop: "3px"
              }}
            >
              <Image src={Img2} maw={25} alt="Notification Icon" style={{ backgroundColor: "#EBEDF4" }} />
            </div>
            <div style={{ marginLeft: "1rem" }}>
              <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan', fontFamily: "inter" }}>Add new patient</Button>

            </div>
            <div style={{ marginLeft: "2rem" }}>
              <Image src={Img3} maw={36} style={{ backgroundColor: "#EBEDF4" }} />
            </div>

          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
            <h2 style={{ fontFamily: "inter" }}> All Patients <small style={{ fontFamily: "intert", fontWeight: "200" }}>234,839</small></h2>
            <div style={{ display: "flex", alignItems: "center", gap: "" }}>
              <div
                style={{
                  backgroundColor: "#EBEDF4",
                  borderRadius: "12px",
                  padding: "10px", // Adjust padding to increase/decrease size
                  fontSize: "20px", // Set default font size
                  display: "inline-block", // Keeps size based on content
                  marginRight: "1rem"
                }}
              >
                <Text style={{ fontSize: "18px", fontWeight: "bold", fontFamily: "inter" }}>
                  {selectedCount} Selected
                </Text>
              </div>
              <div
                style={{
                  width: "44px", // Circle diameter
                  height: "44px", // Circle diameter
                  backgroundColor: "#EBEDF4", // Background color
                  borderRadius: "50%", // Makes it a perfect circle
                  display: "flex", // Flexbox to center content
                  justifyContent: "center", // Horizontally center the icon
                  alignItems: "center", // Vertically center the icon
                }}
              >
                <FiTrash2
                  size={25} // Icon size
                  color="#FF6B6B" // Icon color
                  style={{ cursor: "pointer" }} // Pointer cursor on hover
                  onClick={handleDelete}
                />
              </div>

            </div>
          </div>

          <Table striped highlightOnHover withBorder withColumnBorders mb={"xs"} style={{ fontFamily: "inter" }}>
            <thead>
              <tr style={{ backgroundColor: "lightgray" }}> {/* Light gray background for header */}
                <th>Name</th>
                <th>Patient ID</th>
                <th>Age</th>
                <th>Referred By</th>
                <th>Sex</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th
                  style={{
                    // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Shadow for the Date & Time header
                    backgroundColor: "lightgray", // Ensure consistent background
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Date & Time</span>
                    {/* <input type="checkbox" id="selectAllDateTime" style={{ cursor: "pointer" }} /> */}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: selectedRows[item.id] ? "#EBEDF4" : "transparent", // Highlight selected rows with #FF6B6B
                    borderRadius: "16px",
                    transition: "background-color 0.3s ease", // Smooth transition
                  }}
                >
                  <td>{item.name}</td>
                  <td>{item.id}</td>
                  <td>{item.age}</td>
                  <td>{item.referredBy}</td>
                  <td>{item.sex}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{item.dateTime}</span>

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
                          width: "10px", // Increase width
                          height: "10px", // Increase height
                          transform: "scale(1.5)", // Alternative scaling approach
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
