// import { Button, Card, Text } from '@mantine/core'
// import React from 'react'
// import { IoChevronBackSharp } from "react-icons/io5";

// const CameronWillamson = () => {
//   return (
//     <div style={{height:"100vh",borderRadius: "48px", padding: "32px", gap: "48px", }}>
//         <div style={{width:"95%", height:'100%',borderRadius:"48px",padding:"32px",gap:"48px",backgroundColor:"#EBEDF4"}}>
//         <Card style={{ width: "100%", height: "100%", borderRadius: "24px", border: "1px solid #ccc", padding: "32px", gap: "48px",  }}>
//             <div style={{display:'flex'}}>
//                 <div style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     width: "50px", // Box width
//                     height: "35px", // Box height
//                      borderRadius: "8px",
//                     // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Box shadow
//                     backgroundColor: "#EBEDF4", // Background color
//                     // marginLeft: "1rem", // Space from the search bar
//                     marginTop:"3px"
                    
//                 }}>
//                 <IoChevronBackSharp />
//                 </div>
              
//                 <h2 style={{marginTop:"4px",marginLeft:"1rem", alignItems:"center"}}>Cameron Willamson</h2>
//                <div style={{display:"flex",justifyContent:"end",marginLeft:"22rem"}}>
//                 <Button style={{fontFamily:"inter",backgroundColor:"#EBEDF4",color:"black",marginLeft:""}} >Add new patient</Button>
//                 <Button style={{fontFamily:"inter",backgroundColor:"#EBEDF4",color:"black",textDecoration:"underline 1px",marginLeft:"2rem"}}>LastvisitReport</Button>
//                 <Button variant="gradient" style={{marginLeft:"1rem"}} gradient={{ from: 'indigo', to: 'cyan',fontFamily:"inter",  }}>Add new patient</Button>
//                 </div>
//             </div>
//             <div
//   style={{
//     borderRadius: "8px",
//     padding: "15px",
//     backgroundColor: "#EBEDF4",
//     marginTop: "10px",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//   }}
// >
//   {/* Header Row */}
//   <div
//     style={{
//       display: "grid",
//       gridTemplateColumns: "2fr 1fr 0.5fr 1fr 1.5fr 2fr", // Adjust column width ratios
//       fontWeight: "550",
//       fontSize: "14px",
//       color: "#333",
//       marginBottom: "10px",
//     }}
//   >
//     <div>Name</div>
//     <div>Patient ID</div>
//     <div>Age</div>
//     <div>Sex</div>
//     <div>Referred By</div>
//     <div>Date & Time</div>
//   </div>

//   {/* Data Row */}
//   <div
//     style={{
//       display: "grid",
//       gridTemplateColumns: "2fr 1fr 0.5fr 1fr 1.5fr 2fr", // Same column ratios as header
//       fontWeight: "400",
//       fontSize: "14px",
//       color: "#555",
//     }}
//   >
//     <Text style={{ margin: "0" }}>Cameron Williamson</Text>
//     <Text style={{ margin: "0" }}>12345</Text>
//     <Text style={{ margin: "0" }}>24</Text>
//     <Text style={{ margin: "0" }}>Female</Text>
//     <Text style={{ margin: "0" }}>Self</Text>
//     <Text style={{ margin: "0" }}>15 May 2020 | 7:00 pm</Text>
//   </div>
// </div>

            

//             </Card>

//         </div>
      
//     </div>
//   )
// }

// export default CameronWillamson
// import { Button, Card, Text, Select, Tabs } from '@mantine/core';
// import React from 'react';
// import { IoChevronBackSharp } from 'react-icons/io5';

// const CameronWilliamson = () => {
//   const records = [
//     { date: '15 May 2020 | 7:00 pm', id: 1 },
//     { date: '14 May 2020 | 6:30 pm', id: 2 },
//     { date: '13 May 2020 | 5:45 pm', id: 3 },
//     { date: '12 May 2020 | 8:00 pm', id: 4 },
//     { date: '11 May 2020 | 9:15 pm', id: 5 },
//   ];

//   const renderRecords = () =>
//     records.map((record) => (
//       <div
//         key={record.id}
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '3fr 1fr 2fr 1fr',
//           gap: '16px',
//           alignItems: 'center',
//           padding: '10px 0',
//           borderBottom: '1px solid #ccc',
//         }}
//       >
//         <Text style={{ margin: 0 }}>{record.date}</Text>
//         <Button variant="outline">Preview</Button>
//         <Select
//           placeholder="Export Report as"
//           data={['PDF', 'DOCX']}
//           style={{ maxWidth: '150px', marginRight: '16px' }}
//         />
//         <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
//           Export
//         </Button>
//       </div>
//     ));

//   return (
//     <div
//       style={{
//         height: '100vh',
//         borderRadius: '48px',
//         padding: '32px',
//         gap: '48px',
//         backgroundColor: '#F8FAFC',
//       }}
//     >
//       <div
//         style={{
//           width: '95%',
//           height: '100%',
//           borderRadius: '48px',
//           padding: '32px',
//           gap: '48px',
//           backgroundColor: '#EBEDF4',
//         }}
//       >
//         <Card
//           style={{
//             width: '100%',
//             height: '100%',
//             borderRadius: '24px',
//             border: '1px solid #ccc',
//             padding: '32px',
//             gap: '24px',
//           }}
//         >
//           {/* Header Section */}
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '16px',
//             }}
//           >
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   width: '50px',
//                   height: '35px',
//                   borderRadius: '8px',
//                   backgroundColor: '#EBEDF4',
//                   marginRight: '1rem',
//                 }}
//               >
//                 <IoChevronBackSharp />
//               </div>
//               <h2 style={{ margin: 0 }}>Cameron Williamson</h2>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//               <Button style={{ backgroundColor: '#EBEDF4', color: 'black' }}>
//                 View All Comments (32)
//               </Button>
//               <Button style={{ backgroundColor: '#EBEDF4', color: 'black' }}>
//                 Last Visit Report
//               </Button>
//               <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
//                 Start Live Capture
//               </Button>
//             </div>
//           </div>

//           {/* Patient Details */}
//           <div
//             style={{
//               borderRadius: '8px',
//               padding: '20px',
//               backgroundColor: '#F8FAFC',
//               boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//               marginBottom: '24px',
//             }}
//           >
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: '2fr 1fr 0.5fr 1fr 1.5fr 2fr',
//                 fontWeight: '550',
//                 fontSize: '14px',
//                 color: '#333',
//                 marginBottom: '16px',
//               }}
//             >
//               <div>Name</div>
//               <div>Patient ID</div>
//               <div>Age</div>
//               <div>Sex</div>
//               <div>Referred By</div>
//               <div>Date & Time</div>
//             </div>

//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: '2fr 1fr 0.5fr 1fr 1.5fr 2fr',
//                 fontWeight: '400',
//                 fontSize: '14px',
//                 color: '#555',
//               }}
//             >
//               <Text style={{ margin: 0 }}>Cameron Williamson</Text>
//               <Text style={{ margin: 0 }}>12345</Text>
//               <Text style={{ margin: 0 }}>44</Text>
//               <Text style={{ margin: 0 }}>Female</Text>
//               <Text style={{ margin: 0 }}>Self</Text>
//               <Text style={{ margin: 0 }}>15 May 2020 | 7:00 pm</Text>
//             </div>
//           </div>

//           {/* Tabs Section */}
//           <Tabs
//             defaultValue="recent-endoscopy"
//             style={{ marginBottom: '24px' }}
//             styles={{
//               tabsList: {
//                 borderBottom: '1px solid #ccc',
//               },
//               tab: {
//                 border: '1px solid #ccc',
//                 padding: '8px 16px',
//                 borderRadius: '8px',
//                 backgroundColor: '#F8FAFC',
//                 color: '#333',
//                 '&:hover': {
//                   backgroundColor: '#E2E8F0',
//                 },
//               },
//               tabActive: {
//                 backgroundColor: '#333', // Dark color for active tab
//                 color: 'white', // White text on active tab
//                 fontWeight: 'bold',
//               },
//             }}
//           >
//             <Tabs.List>
//                 <div style={{
//                      borderRadius: '8px',
//                      padding: '20px',
//                      backgroundColor: '#F8FAFC',
//                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//                      marginBottom: '24px',
//                      width:"95%",
//                      display:"flex",
//                      justifyContent:"space-between"
//                 }}>

//               <Tabs.Tab value="recent-endoscopy" style={{width:"50%"}}>Recent Endoscopy</Tabs.Tab>
//               <Tabs.Tab value="previous-record" style={{width:"50%"}}>Previous Record</Tabs.Tab>
//               </div>
//             </Tabs.List>

//             <Tabs.Panel value="recent-endoscopy" pt="xs">
//               {renderRecords()}
//             </Tabs.Panel>

//             <Tabs.Panel value="previous-record" pt="xs">
//               {renderRecords()}
//             </Tabs.Panel>
//           </Tabs>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CameronWilliamson;

// import { Button, Card, Text, Select, Tabs } from '@mantine/core';
// import React from 'react';
// import { IoChevronBackSharp } from 'react-icons/io5';
// import { IconPencil } from '@tabler/icons-react';

// const CameronWilliamson = () => {
//   const records = [
//     { date: '15 May 2020 | 7:00 pm', id: 1 },
//     { date: '14 May 2020 | 6:30 pm', id: 2 },
//     { date: '13 May 2020 | 5:45 pm', id: 3 },
//     { date: '12 May 2020 | 8:00 pm', id: 4 },
//     { date: '11 May 2020 | 9:15 pm', id: 5 },
//   ];

//   const renderRecords = () =>
//     records.map((record) => (
//       <div
//         key={record.id}
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: '12px 0',
//           borderBottom: '1px solid #E2E8F0',
//         }}
//       >
//         {/* Date */}
//         <Text
//           style={{
//             flex: 2,
//             margin: 0,
//             color: '#333',
//             fontWeight: 500,
//             marginRight:"20%"
//           }}
//         >
//           {record.date}
//         </Text>
  
//         {/* Preview Button */}
//         <Button
//           variant="outline"
//           style={{
//             // width: '110px', // Hug width
//             // height: '44px', // Fixed height
//             borderColor: 'black', // Border color
//             borderRadius: '8px', // Adjust border radius for rounded corners
//             borderWidth: '1px', // Border width
//             padding: '12px 24px', // Padding: Top, Right, Bottom, Left
//             textAlign: 'center', // Center text alignment
//             marginLeft: '5rem', // Additional spacing from the left
//             display: 'flex', // Ensure content is centered inside the button
//             alignItems: 'center', // Vertical center
//             justifyContent: 'center', // Horizontal center
//             gap: '8px', // Space between icon or elements inside the button
//             color:"black"
//           }}
//         >
//           Preview
//         </Button>
  
//         {/* Export Select */}
        
//         {/* <Select
//           placeholder="Export Report as"
//           data={['PDF', 'DOCX']}
//           style={{
//             flex: 1.5,
//             maxWidth: '150px',
//             fontSize: '14px',
//             marginLeft:"12px",
            
//           }}

//         /> */}
//         <Button
//   variant="outline"
//   style={{
//     width: 'auto', // Adjusts width to fit content
//     height: '38px', // Fixed height
//     borderColor: 'black', // Border color
//     borderRadius: '8px', // Rounded corners
//     borderWidth: '1px', // Border width
//     padding: '12px 16px', // Inner padding for spacing
//     display: 'flex', // Flex layout for aligning content
//     alignItems: 'center', // Center vertically
//     justifyContent: 'space-between', // Spacing between button content
//     gap: '8px', // Gap between button content and Select
//     backgroundColor: 'white', // White background
//     textAlign: 'center', // Center text alignment
//     marginLeft: '5rem', // Spacing from the left
//     color: 'black', // Text color
//     cursor: 'pointer', // Pointer cursor for hover effect
//   }}
// >
//   {/* Select Dropdown */}
//   <Select
//     placeholder="Export Report as"
//     data={['PDF', 'DOCX']}
//     styles={{
//       input: {
//         border: 'none', // Remove border for seamless integration
//         fontSize: '14px', // Font size for readability
//         color: 'black', // Text color
//       },
//       dropdown: {
//         backgroundColor: 'white', // Background color for dropdown
//         borderRadius: '8px', // Rounded corners for dropdown
//         border: '1px solid black', // Border for dropdown
//       },
//       item: {
//         '&[data-hovered]': {
//           backgroundColor: '#E2E8F0', // Hover color for dropdown items
//           color: 'black', // Hover text color
//         },
//       },
//     }}
//     style={{
//       flex: 1,
//       maxWidth: '150px', // Restrict dropdown width
//       fontSize: '14px', // Font size
//       color: 'black', // Text color
//     }}
//   />
// </Button>

//         {/* Export Button */}
//         <Button
//   style={{
//     width: '6%', // Adjust width as a percentage of the container
//     height: '38px', // Fixed height (or use percentage like '10%')
//     backgroundColor: '#D3D3D3', // Background color
//     color: 'black', // Text color
//     textAlign: 'center', // Center text alignment
//     marginLeft: '5rem', // Spacing from the left
//     fontSize: '16px', // Adjust font size as needed
//     borderRadius: '8px', // Rounded corners
//     // border: '1px solid #5B21B6', // Add a border if needed
//     display: 'flex', // Ensure button content is aligned
//     alignItems: 'center', // Center content vertically
//     justifyContent: 'center', // Center content horizontally
//     cursor: 'pointer', // Change cursor on hover
//   }}
// >
//   Export
// </Button>
// <div style={{
//     width: "44px", // Circle diameter
//     height: "44px", // Circle diameter
//     backgroundColor: "#EBEDF4", // Background color
//     borderRadius: "50%", // Makes it a perfect circle
//     display: "flex", // Flexbox to center content
//     justifyContent: "center", // Horizontally center the icon
//     alignItems: "center", // Vertically center the icon
//     marginLeft:"2rem"
// }}>
// <IconPencil
//           size={16}
//           color="#4B5563"
//           style={{
//             flex: 0.5,
//             cursor: 'pointer',
//             textAlign: 'center',
//           }}
//         />
// </div>
  
//         {/* Edit Icon */}
       
//       </div>
//     ));
  

//   return (
//     <div
//       style={{
//         height: '100vh',
//         borderRadius: '16px',
//         padding: '32px',
//         backgroundColor: "#EBEDF4",
//       }}
//     >
//       <Card
//         style={{
//           width: '100%',
//           height: '100%',
//           borderRadius: '16px',
//           padding: '24px',
//           backgroundColor: '#fff',
//         }}
//       >
//         {/* Header Section */}
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '24px',
//           }}
//         >
//           <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//             <Button
//               variant="subtle"
//               style={{
//                 borderRadius: '50%',
//                 width: '40px',
//                 height: '40px',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: '#E2E8F0',
//               }}
//             >
//               <IoChevronBackSharp />
//             </Button>
//             <Text
//               style={{
//                 fontSize: '20px',
//                 fontWeight: 'bold',
//                 color: '#1E293B',
//               }}
//             >
//               Cameron Williamson
//             </Text>
//           </div>
//           <div style={{ display: 'flex', gap: '12px' }}>
//             <Button style={{ backgroundColor: '#EDE9FE', color: '#4C1D95' }}>
//               View All Comments (32)
//             </Button>
//             <Button style={{ backgroundColor: '#EDE9FE', color: '#4C1D95' }}>
//               Last Visit Report
//             </Button>
//             <Button
//               variant="gradient"
//               gradient={{ from: '#7C3AED', to: '#9333EA' }}
//             >
//               Start Live Capture
//             </Button>
//           </div>
//         </div>

//         {/* Patient Details */}
//         <Card
//   style={{
//     padding: '16px',
//     marginBottom: '16px',
//     backgroundColor: '#EBEDF4',
//     borderRadius: '8px',
//     boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
//     border: '1px solid #E5E7EB',
//   }}
// >
//   {/* Header */}
//   <div
//     style={{
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr 0.5fr 0.5fr 1fr 1.5fr',
//       gap: '12px',
//       fontSize: '14px',
//       fontWeight: '700',
//       color: '#374151',
//       marginBottom: '8px',
//       // borderBottom: '1px solid #E5E7EB',
//       paddingBottom: '8px',
//     }}
//   >
//     <div>Name</div>
//     <div>Patient ID</div>
//     <div>Age</div>
//     <div>Sex</div>
//     <div>Referred by</div>
//     <div>Date & Time</div>
//   </div>
//   {/* Details */}
//   <div
//     style={{
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr 0.5fr 0.5fr 1fr 1.5fr',
//       gap: '12px',
//       fontSize: '14px',
//       fontWeight: '400',
//       color: '#6B7280',
//     }}
//   >
//     <div >Cameron Williamson</div>
//     <div>12345</div>
//     <div>44</div>
//     <div>Female</div>
//     <div>Self</div>
//     <div>15 May 2020 | 7:00 pm</div>
//   </div>
//   {/* Additional Information */}
//   <div
//     style={{
//       display: 'grid',
//       gridTemplateColumns: '0.2fr 0.4fr',
//       gap: '12px',
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#6B7280',
//       marginTop: '12px',
//     }}
//   >
//     <div style={{ fontWeight: '700', color: '#374151' }}>Phone Number</div>
//     <div style={{fontWeight:"700",color:"#374151"}}>Email</div>
//     <div >+91-8837372732</div>
//     <div style={{marginLeft:"30%"}}>georgia.young@example.com</div>
//   </div>
// </Card>


//         {/* Tabs Section */}
//         <Tabs defaultValue="recent-endoscopy" style={{ marginBottom: '16px' }}>
//           <Tabs.List grow>
//             <div style={{backgroundColor:"#EBEDF4",width:"100%",display:"flex",padding:"6px",borderRadius:"10px"}}>

           
//             <Tabs.Tab className='tab'
//               value="recent-endoscopy"
//               style={{
//                 padding: '12px 24px',
//                 borderRadius: '10px',
//                 fontWeight: 'bold',
//                 fontSize:"1rem",
//                 borderColor:"none"
//               }}
//             >
//               Recent Endoscopy
//             </Tabs.Tab>
//             <Tabs.Tab  className='tab1'
//               value="previous-record"
//               style={{
//                 padding: '12px 24px',
//                 borderRadius: '10px',
//                 fontWeight: 'bold',
//                 fontSize:"1rem"
//               }}
//             >
//               Previous Record
//             </Tabs.Tab>
//             </div>
//           </Tabs.List>
          
//           <Tabs.Panel value="recent-endoscopy" pt="xs">
//             <div style={{ padding: '16px 0' ,}}>
//               <div style={{marginRight:"20px",width:"24%"}}>
//               <Text
//                 style={{
//                   fontWeight: '650',
//                   marginBottom: '2px',
//                   fontSize: '16px',
//                   // marginRight:"43rem",
                  
//                 }}
//               >
//                 Recent 6
//               </Text>
//               </div>
//               {renderRecords()}
//             </div>
//           </Tabs.Panel>

//           <Tabs.Panel value="previous-record" pt="xs">
//             {renderRecords()}
//           </Tabs.Panel>
//         </Tabs>
//       </Card>
//     </div>
//   );
// };

// export default CameronWilliamson;

import { Button, Card, Text, Select, Tabs, Modal,Image } from '@mantine/core';
import React, {useState,useRef,useEffect} from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { IconFile, IconPencil } from '@tabler/icons-react';
import { BiMessageDetail } from 'react-icons/bi';
import { BsCameraVideo } from 'react-icons/bs';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import client from './Api';
import { useDisclosure } from '@mantine/hooks';
import { Group } from '@mantine/core';
import * as pdfjsLib from 'pdfjs-dist';
import axios from 'axios';
import { format } from 'date-fns';


const CameronWilliamson = () => {
  const [patientDetails, setPatientDetails] = useState(null);
  const [records, setRecords] = useState([]);
  // console.log(records);
  const [opend, { open, close }] = useDisclosure(false);
  const [opened, setOpened] = useState(false);

  const selectedPatient = JSON.parse(localStorage.getItem('selectedpatient'))
  // const [patientid, setpatientid]= useState(null)
  const buttonRef = useRef(null);
  // const records = [
  //   { date: '15 May 2020 | 7:00 pm', id: 1 },
  //   { date: '14 May 2020 | 6:30 pm', id: 2 },
  //   { date: '13 May 2020 | 5:45 pm', id: 3 },
  //   { date: '12 May 2020 | 8:00 pm', id: 4 },
  //   { date: '11 May 2020 | 9:15 pm', id: 5 },
  // ];
  const [imageSrc, setImageSrc] = useState(null);
// console.log(imageSrc);

  // pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;  const handlePdfConvert= async (pdfUrl) =>{
  //   const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
  //   const page = await pdf.getPage(1); // Render the first page (adjust if needed)

  //   const viewport = page.getViewport({ scale: 1 });
  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d');

  //   canvas.width = viewport.width;
  //   canvas.height = viewport.height;

  //   const renderContext = {
  //     canvasContext: context,
  //     viewport: viewport,
  //   };

  //   await page.render(renderContext).promise;

  //   // Convert canvas to image (base64)
  //   const imgData = canvas.toDataURL('image/png');
  //   setImageSrc(imgData);
  
  // }
  const formatDateTime = (date) => {
          let dateString = new Date(date)
          return format(dateString, "dd MMMM yyyy | h:mm a");
      };

  const handlePdfConvert =(url)=>{
    const apiKey = process.env.REACT_APP_API_KEY;
console.log(apiKey);
  //   axios.post(
  //     "https://api.pdf.co/v1/pdf/convert/to/png",
  //     {
  //         url: url, // Single URL to convert
  //         pages: "1"   // Convert the first page only
  //     },
  //     {
  //         headers: {
  //             "Content-Type": "application/json",
  //             "x-api-key": apiKey
  //         }
  //     }
  // )
  // .then(response => {
  //     console.log("Conversion successful:", response.data);
  //     // Response will contain PNG links for each converted page
  // })
  // .catch(error => {
  //     console.error("Error during conversion:", error.response ? error.response.data : error.message);
  // });
  }
  useEffect(() => {
    const Report = async () => {
      const patientId = localStorage.getItem('patientid'); // Corrected key name
     
      if (patientId) {
        // setPatientDetails(patientId); // Set state from localStorage
        console.log("selected patient Id=",patientId)
  
        try {
          const PatientReport = await client.get('/patient_report_file/', {
            withCredentials:true,
            params: { patient_id: patientId },
          }, 
            // Corrected to `params`
            {
              headers: { 'Content-Type': 'application/json' },
             },// Fixed header location
          );
          console.log('Patient Report:', PatientReport.data.patient_reports);
          setRecords(PatientReport.data.patient_reports)
        } catch (error) {
          console.error('Error fetching patient report:', error);
        }
      } else {
        console.error('No patient ID found in local storage');
      }
    };

    Report();
  }, []); 
const navigate=useNavigate()
  const renderRecords = () =>
    records.map((item) => (
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
            marginRight:"20%"
          }}
        >
          {item.date} || { item.time}
        </Text>
        
  
        {/* Preview Button */}
         <Modal opened={opend} onClose={close} title="Preview" fullScreen>
         <Card>
    {item.report_file?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
      <Image
        src={imageSrc}
        maw={200}
        alt="Patient Report"
      />
    ) : (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <IconFile size={50} color="gray" />
        <Text color="dimmed">This file format is not supported for preview. Please provide an image file.</Text>
      </div>
    )}
  </Card>
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
            color:"black"
          }}
          // onClick={()=>{navigate(item.report_file)}}
          onClick={()=>{
            // open()
            handlePdfConvert(item.report_file)
          }}
        > 
         Preview
         </Button>
          </Group>
          
        
  
        {/* Export Select */}
        
        {/* <Select
          placeholder="Export Report as"
          data={['PDF', 'DOCX']}
          style={{
            flex: 1.5,
            maxWidth: '150px',
            fontSize: '14px',
            marginLeft:"12px",
            
          }}

        /> */}
        <Button
  variant="outline"
  style={{
    width: 'auto', 
    height: '38px', 
    borderColor: 'black', 
    borderRadius: '8px', 
    borderWidth: '1px', 
    padding: '12px 16px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', // Spacing between button content
    gap: '8px', // Gap between button content and Select
    backgroundColor: 'white', // White background
    textAlign: 'center', // Center text alignment
    marginLeft: '5rem', // Spacing from the left
    color: 'black', // Text color
    cursor: 'pointer', // Pointer cursor for hover effect
  }}
>
  {/* Select Dropdown */}
  <Select
    placeholder="Export Report as"
    data={['PDF', 'DOCX']}
    styles={{
      input: {
        border: 'none', // Remove border for seamless integration
        fontSize: '14px', // Font size for readability
        color: 'black', // Text color
      },
      dropdown: {
        backgroundColor: 'white', // Background color for dropdown
        borderRadius: '8px', // Rounded corners for dropdown
        border: '1px solid black', // Border for dropdown
      },
      item: {
        '&[data-hovered]': {
          backgroundColor: '#E2E8F0', // Hover color for dropdown items
          color: 'black', // Hover text color
        },
      },
    }}
    style={{
      flex: 1,
      maxWidth: '150px', // Restrict dropdown width
      fontSize: '14px', // Font size
      color: 'black', // Text color
    }}
  />
</Button>

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
    marginLeft:"2rem"
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
    ));

  const handleModalOpen = () => {
    setOpened(true);
  };
    const handleModalClose = () => {
      setOpened(false);
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
          height: '100%',
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
              onClick={()=>{navigate('/allpatients')}}
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
            <Button style={{ backgroundColor: '#EDE9FE', color: 'black' }} onClick={handleModalOpen} leftIcon={<BiMessageDetail style={{fontSize:"large"}}/>}>
              View All Comments (32)
            </Button>
            <Button style={{ backgroundColor: '#EDE9FE', color: 'black',textDecoration:"underline",textUnderlineOffset:"3px",textDecorationThickness:"1.30px" }}>
              Last Visit Report
            </Button>
            <Button
            onClick={()=> navigate("/videocapturing")}
              variant="gradient"
              gradient={{ from: '#7C3AED', to: '#9333EA' }}
              leftIcon={<BsCameraVideo  style={{fontSize:"large"}}/>
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
    <div>{ formatDateTime(selectedPatient.updated_at)}</div>
   
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
    <div style={{fontWeight:"700",color:"#374151",marginLeft:"40%"}}>Email</div>
    {/* <div >+91-8837372732</div>

    <div style={{marginLeft:"30%"}}>georgia.young@example.com</div> */}
    <div>{selectedPatient.mobile}</div>
    <div style={{marginLeft:"40%"}}>{selectedPatient.patient_email}</div>
  </div>
</Card>


        {/* Tabs Section */}
        <Tabs defaultValue="recent-endoscopy" style={{ marginBottom: '16px' }}>
          <Tabs.List grow>
            <div style={{backgroundColor:"#EBEDF4",width:"100%",display:"flex",padding:"6px",borderRadius:"10px"}}>

           
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
            <Tabs.Tab  className='tab1'
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
            <div style={{ padding: '16px 0' ,}}>
              <div style={{marginRight:"20px",width:"24%"}}>
              <Text
                style={{
                  fontWeight: '650',
                  marginBottom: '2px',
                  fontSize: '16px',
                  // marginRight:"43rem",
                  
                }}
              >
                Recent 6
              </Text>
              </div>
              {renderRecords()}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="previous-record" pt="xs">
            {renderRecords()}
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
              bottom:'66px'
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