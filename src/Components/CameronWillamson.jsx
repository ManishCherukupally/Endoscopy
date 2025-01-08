import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Text, Select, Tabs, Modal, Image, Flex } from '@mantine/core';
import { IoChevronBackSharp } from 'react-icons/io5';
import { IconFile, IconPencil } from '@tabler/icons-react';
import { BiMessageDetail } from 'react-icons/bi';
import { BsCameraVideo } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import client from './Api';
import { useDisclosure } from '@mantine/hooks';
import { Group } from '@mantine/core';
import * as pdfjsLib from 'pdfjs-dist';
import { format } from 'date-fns';

const CameronWilliamson = () => {

  const [records, setRecords] = useState([]);
  // console.log(records);
  const [opend, { open, close }] = useDisclosure(false);
  const [opened, setOpened] = useState(false);

  const selectedPatient = JSON.parse(localStorage.getItem('selectedpatient'))

  const buttonRef = useRef(null);


  const [url, setUrl] = useState(null)
  const [Record, SingleRecord] = useState(null)
  const [noRecords, setnoRecords] = useState(false)
  const [value, setValue] = useState(null)
  const [selectedValues, setSelectedValues] = useState({});
  const [loader, setLoader] = useState(false)

  console.log(noRecords);


  function pdfResult(file) {

    setUrl(file)

    console.log(file)
  }

  const formatDateTime = (date) => {
    let dateString = new Date(date)
    return format(dateString, "dd MMMM yyyy | h:mm a");
  };

  useEffect(() => {
    const Report = async () => {
      const patientId = localStorage.getItem('patientid'); // Get patient ID from localStorage

      if (patientId) {
        console.log("Selected patient ID =", patientId);

        try {
          const PatientReport = await client.get('/patient_report_file/', {
            withCredentials: true,
            params: { patient_id: patientId },
            headers: { 'Content-Type': 'application/json' },
          });

          if (PatientReport.data.status) {
            setnoRecords(true);
            return;
          }

          const records = PatientReport.data.patient_reports;
          if (records && records.length > 0) {
            setRecords(records.reverse()); // Reverse the array and set to state
          } else {
            setnoRecords(true);
          }

        } catch (error) {
          console.error('Error fetching patient report:', error);
          setnoRecords(true);
        }
      } else {
        console.error('No patient ID found in local storage');
      }
    };

    Report();
  }, []);


  const LatestRecord = (records) => {
    if (!records || records.length === 0) {
      console.error("No records available.");
      return null;
    }
    return records[records.length - 1];

  };

  const navigate = useNavigate()


  const handleModalOpen = () => {
    setOpened(true);
  };
  const handleModalClose = () => {
    setOpened(false);
  };

  const handleExport = (id) => {
    console.log(selectedValues[id]);

    if (selectedValues[id] === 'mail') {
      client.post("/send-email/", {
        email: selectedPatient.patient_email,
        name: selectedPatient.patient_name,
        report_id: id
      })
        .then((resp) => console.log(resp.data))
    }
    else if (selectedValues[id] === 'whatsapp') {
      window.open("https://web.whatsapp.com", "_blank");
    }

  }
  const handleSelectChange = (id, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [id]: value, // Update only the specific item's value
    }));
  };

  return (
    <div
      style={{
        height: '100vh',
        borderRadius: '16px',
        padding: '32px',
        backgroundColor: "#EBEDF4",
      }}
    >
      <Card
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '16px',
          padding: '24px',
          backgroundColor: '#fff',
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button
              variant="subtle"
              style={{
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E2E8F0',
              }}
              onClick={() => { navigate('/allpatients') }}
            >
              <IoChevronBackSharp />
            </Button>
            <Text
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1E293B',
              }}
            >
              {selectedPatient.patient_name}
            </Text>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* <Button disabled style={{ backgroundColor: '#EDE9FE', color: 'black' }} onClick={handleModalOpen} leftIcon={<BiMessageDetail style={{ fontSize: "large" }} />}>
              View All Comments
            </Button> */}

            <Modal opened={opend} onClose={close} title="Preview" fullScreen closeButtonProps={{ size: "lg" }}>
              <Card>
                <iframe
                  src={`${client.defaults.baseURL}/media${url}`}
                  width="100%"
                  // height="600px"
                  title="Patient Report"
                />
              </Card>
            </Modal>

            <Group position="center">
              <Button
                variant='light'
                color='violet'
                disabled={noRecords ? true : false}
                onClick={() => {
                  open(); // Call the function to open the modal
                  const lastRecord = LatestRecord(records); // Call LatestRecord to get the last record
                  pdfResult(lastRecord.report_file); // Pass the last record to pdfResult
                }}
              >
                Last Visit Report
              </Button>
            </Group>

            {/* <Button style={{ backgroundColor: '#EDE9FE', color: 'black',textDecoration:"underline",textUnderlineOffset:"3px",textDecorationThickness:"1.30px" }}
            onClick={LatestRecord}>
              Last Visit Report
            </Button> */}
            <Button
              onClick={() => navigate("/videocapturing")}
              variant="gradient"
              gradient={{ from: '#7C3AED', to: '#9333EA' }}
              leftIcon={<BsCameraVideo style={{ fontSize: "large" }} />
              }
            >
              Start Live Capture
            </Button>
          </div>
        </div>
        <Modal

          opened={opened}
          onClose={handleModalClose}
          title="Comments"
          // centered
          // xOffset
          centered
          size="auto"
          styles={{
            modal: {
              position: "absolute",
              left: "80%", // Move modal to the left if needed

            },
          }}
        >
          <Text>Here are the comments...</Text>
          <div>nani</div>
          <div>nani</div>
          <div>nani</div>
          <div>nani</div>
          <div>nani</div>
          <div>nani</div>
          <div>nani</div>
          <div>nani</div>
          <div>nani</div>
          <div>nani</div>
          {/* You can add more content here based on your requirements */}
        </Modal>

        {/* Patient Details */}
        <Card
          style={{
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: '#EBEDF4',
            borderRadius: '8px',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #E5E7EB',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 0.5fr 0.5fr 1fr 1.5fr',
              gap: '12px',
              fontSize: '14px',
              fontWeight: '700',
              color: '#374151',
              marginBottom: '8px',
              // borderBottom: '1px solid #E5E7EB',
              paddingBottom: '8px',
            }}
          >
            <div>Name</div>
            <div>Patient ID</div>
            <div>Age</div>
            <div>Sex</div>
            <div>Referred by</div>
            <div>Date & Time</div>
          </div>
          {/* Details */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 0.5fr 0.5fr 1fr 1.5fr',
              gap: '12px',
              fontSize: '14px',
              fontWeight: '400',
              color: '#6B7280',
            }}
          >
            <div >{selectedPatient.patient_name}</div>
            <div>{selectedPatient.id}</div>
            <div>{selectedPatient.age}</div>
            <div>{selectedPatient.gender}</div>
            <div>{selectedPatient.referred}</div>
            <div>{formatDateTime(selectedPatient.updated_at)}</div>

          </div>
          {/* Additional Information */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '0.2fr 0.4fr',
              gap: '12px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#6B7280',
              marginTop: '12px',
            }}
          >
            <div style={{ fontWeight: '700', color: '#374151' }}>Phone Number</div>
            <div style={{ fontWeight: "700", color: "#374151", marginLeft: "40%" }}>Email</div>
            {/* <div >+91-8837372732</div>

    <div style={{marginLeft:"30%"}}>georgia.young@example.com</div> */}
            <div>{selectedPatient.mobile}</div>
            <div style={{ marginLeft: "40%" }}>{selectedPatient.patient_email}</div>
          </div>
        </Card>


        {/* Tabs Section */}
        <Tabs defaultValue="recent-endoscopy" style={{ marginBottom: '16px' }}>
          <Tabs.List grow>
            <div style={{ backgroundColor: "#EBEDF4", width: "100%", display: "flex", padding: "6px", borderRadius: "10px" }}>


              <Tabs.Tab className='tab'
                value="recent-endoscopy"
                sx={{
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  border: "none", // Removes the border
                }}
              >
                Recent Endoscopy
              </Tabs.Tab>
              <Tabs.Tab className='tab1'
                value="previous-record"
                sx={{
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  border: "none",
                }}
              >
                Previous Record
              </Tabs.Tab>
            </div>
          </Tabs.List>

          <Tabs.Panel value="recent-endoscopy" pt="xs">
            <div style={{ padding: '16px 0', }}>
              <div style={{ marginRight: "20px", width: "24%" }}>
                <Text
                  style={{
                    fontWeight: '650',
                    marginBottom: '2px',
                    fontSize: '16px',
                    // marginRight:"43rem",

                  }}
                >
                  Records: {noRecords ? "0" : records.length}
                </Text>
              </div>
              {/* {records.length === 0 ? (<Text>No records for this patient!</Text>) : (renderRecords())} */}
              {records.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid #E2E8F0',
                  }}
                >
                  {/* Date */}
                  <Text
                    style={{
                      flex: 2,
                      margin: 0,
                      color: '#333',
                      fontWeight: 500,
                      marginRight: "20%"
                    }}
                  >
                    {item.date} || {item.time}
                  </Text>


                  {/* Preview Button */}
                  <Modal opened={opend} onClose={close} title="Preview" fullScreen>

                    <Card>
                      {/* {fileContent}
        <Document file={item.report_file}>
  
        </Document> */}
                      <iframe
                        src={`${client.defaults.baseURL}/media${url}`}
                        width="100%"
                        height="600px"
                        title="Patient Report"
                      />
                    </Card>
                    {/* </Card> */}
                  </Modal>
                  <Group position="center">
                    <Button
                      variant="outline"
                      style={{
                        // width: '110px', // Hug width
                        // height: '44px', // Fixed height
                        borderColor: 'black', // Border color
                        borderRadius: '8px', // Adjust border radius for rounded corners
                        borderWidth: '1px', // Border width
                        padding: '12px 24px', // Padding: Top, Right, Bottom, Left
                        textAlign: 'center', // Center text alignment
                        marginLeft: '5rem', // Additional spacing from the left
                        display: 'flex', // Ensure content is centered inside the button
                        alignItems: 'center', // Vertical center
                        justifyContent: 'center', // Horizontal center
                        gap: '8px', // Space between icon or elements inside the button
                        color: "black"
                      }}
                      // onClick={()=>{navigate(item.report_file)}}
                      onClick={() => {
                        // handleFilePreview(item.report_file)
                        open()
                        pdfResult(item.report_file)
                        // setUrl(item.report_file)
                        // handlePdfConvert(item.report_file)
                      }}
                    >
                      Preview
                    </Button>
                  </Group>

                  <Card withBorder p={'0.3rem'} radius={8} ml={"1rem"} pl={"1rem"} style={{ overflow: "visible", position: "relative" }}>
                    <Flex gap={15} align={"center"}>
                      <Text fz={14}>Export Report as</Text>
                      <Select w={100} variant='filled'
                        placeholder='Select a method'
                        // value={"Pdf"}

                        data={[{ value: 'mail', label: 'Mail' },
                        { value: 'whatsapp', label: 'WhatsApp' }
                        ]}
                        value={selectedValues[item.id] || ''}
                        onChange={(value) => handleSelectChange(item.id, value)}

                      />
                    </Flex>
                  </Card>

                  {/* Export Button */}
                  <Button
                    onClick={() => handleExport(item.id)}
                    style={{
                      width: '6%', // Adjust width as a percentage of the container
                      height: '38px', // Fixed height (or use percentage like '10%')
                      backgroundColor: '#D3D3D3', // Background color
                      color: 'black', // Text color
                      textAlign: 'center', // Center text alignment
                      marginLeft: '1rem', // Spacing from the left
                      fontSize: '16px', // Adjust font size as needed
                      borderRadius: '8px', // Rounded corners
                      // border: '1px solid #5B21B6', // Add a border if needed
                      display: 'flex', // Ensure button content is aligned
                      alignItems: 'center', // Center content vertically
                      justifyContent: 'center', // Center content horizontally
                      cursor: 'pointer', // Change cursor on hover
                    }}
                  >
                    Export
                  </Button>
                  <div style={{
                    width: "44px", // Circle diameter
                    height: "44px", // Circle diameter
                    backgroundColor: "#EBEDF4", // Background color
                    borderRadius: "50%", // Makes it a perfect circle
                    display: "flex", // Flexbox to center content
                    justifyContent: "center", // Horizontally center the icon
                    alignItems: "center", // Vertically center the icon
                    marginLeft: "2rem"
                  }}>
                    <IconPencil
                      size={16}
                      color="#4B5563"
                      style={{
                        flex: 0.5,
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    />
                  </div>

                  {/* Edit Icon */}

                </div>
              ))}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="previous-record" pt="xs">
            {/* {records.length === 0 ? (<Text>No records for this patient!</Text>) : (renderRecords())} */}
            {records.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #E2E8F0',
                }}
              >
                {/* Date */}
                <Text
                  style={{
                    flex: 2,
                    margin: 0,
                    color: '#333',
                    fontWeight: 500,
                    marginRight: "20%"
                  }}
                >
                  {item.date} || {item.time}
                </Text>


                {/* Preview Button */}
                <Modal opened={opend} onClose={close} title="Preview" fullScreen>

                  <Card>
                    {/* {fileContent}
        <Document file={item.report_file}>
  
        </Document> */}
                    <iframe
                      src={`${client.defaults.baseURL}/media${url}`}
                      width="100%"
                      height="600px"
                      title="Patient Report"
                    />
                  </Card>
                  {/* </Card> */}
                </Modal>
                <Group position="center">
                  <Button
                    variant="outline"
                    style={{
                      // width: '110px', // Hug width
                      // height: '44px', // Fixed height
                      borderColor: 'black', // Border color
                      borderRadius: '8px', // Adjust border radius for rounded corners
                      borderWidth: '1px', // Border width
                      padding: '12px 24px', // Padding: Top, Right, Bottom, Left
                      textAlign: 'center', // Center text alignment
                      marginLeft: '5rem', // Additional spacing from the left
                      display: 'flex', // Ensure content is centered inside the button
                      alignItems: 'center', // Vertical center
                      justifyContent: 'center', // Horizontal center
                      gap: '8px', // Space between icon or elements inside the button
                      color: "black"
                    }}
                    // onClick={()=>{navigate(item.report_file)}}
                    onClick={() => {
                      // handleFilePreview(item.report_file)
                      open()
                      pdfResult(item.report_file)
                      // setUrl(item.report_file)
                      // handlePdfConvert(item.report_file)
                    }}
                  >
                    Preview
                  </Button>
                </Group>


                <Card withBorder p={'0.3rem'} radius={8} ml={"1rem"} pl={"1rem"} style={{ overflow: "visible", position: "relative" }}>
                  <Flex gap={15} align={"center"}>
                    <Text fz={14}>Export Report as</Text>
                    <Select w={100} variant='filled'
                      placeholder='Select a method'
                      // value={"Pdf"}

                      data={[{ value: 'mail', label: 'Mail' },
                      { value: 'whatsapp', label: 'WhatsApp' }
                      ]}
                      value={selectedValues[item.id] || ''}
                      onChange={(value) => handleSelectChange(item.id, value)}

                    />
                  </Flex>
                </Card>

                {/* Export Button */}
                <Button
                  style={{
                    width: '6%', // Adjust width as a percentage of the container
                    height: '38px', // Fixed height (or use percentage like '10%')
                    backgroundColor: '#D3D3D3', // Background color
                    color: 'black', // Text color
                    textAlign: 'center', // Center text alignment
                    marginLeft: '5rem', // Spacing from the left
                    fontSize: '16px', // Adjust font size as needed
                    borderRadius: '8px', // Rounded corners
                    // border: '1px solid #5B21B6', // Add a border if needed
                    display: 'flex', // Ensure button content is aligned
                    alignItems: 'center', // Center content vertically
                    justifyContent: 'center', // Center content horizontally
                    cursor: 'pointer', // Change cursor on hover
                  }}
                >
                  Export
                </Button>
                <div style={{
                  width: "44px", // Circle diameter
                  height: "44px", // Circle diameter
                  backgroundColor: "#EBEDF4", // Background color
                  borderRadius: "50%", // Makes it a perfect circle
                  display: "flex", // Flexbox to center content
                  justifyContent: "center", // Horizontally center the icon
                  alignItems: "center", // Vertically center the icon
                  marginLeft: "2rem"
                }}>
                  <IconPencil
                    size={16}
                    color="#4B5563"
                    style={{
                      flex: 0.5,
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  />
                </div>

                {/* Edit Icon */}

              </div>
            ))}
          </Tabs.Panel>
        </Tabs>
        {opened && (
          <div
            style={{
              position: 'absolute',
              top: buttonRef.current?.offsetTop + buttonRef.current?.offsetHeight + 10, // Position below the button
              left: buttonRef.current?.offsetLeft,
              backgroundColor: '#fff',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              width: 'auto',
              zIndex: 10,
              bottom: '66px'
            }}
          >
            <Text>Here are the comments...</Text>
            {/* Add any other content you want to display inside the dropdown */}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CameronWilliamson;