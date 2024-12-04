import React,{useState} from 'react';
import { useForm } from '@mantine/form';
import {TextInput, Button,Card,Select,NumberInput,FileInput} from '@mantine/core';
// import logo from '../../assets/Vector.jpg';
import { MdOutlineEmail } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";


// import { Group, Text, useMantineTheme, rem } from '@mantine/core';
// import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
// import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

const PatientInfo = () => {
    // const [videoFile, setVideoFile] = useState(null);
  
    // const handleUpload = (file) => {
    //   if (!file) return;
  
    //   const isValidVideo = file.type.startsWith("video/");
    //   const isValidSize = file.size <= 50 * 1024 * 1024; // 50 MB limit
  
    //   if (isValidVideo && isValidSize) {
    //     setVideoFile(URL.createObjectURL(file));
    //   } else {
    //     alert("Please upload a valid video file under 50 MB.");
    //   }
    // };
  
    const form = useForm({
      initialValues: {
        patientname: "",
        age: "",
        patientemail: "",
        patientphone: "",
        refferedby: "",
      },
    });
  
    // const handleSubmit = (values) => {
    //   console.log("Form values:", values);
    //   console.log("Uploaded video file:", videoFile);
    // };
  
  return (
    <div className='patient'>
    <div className='patientinfo'>
      
      <Card shadow="sm" padding="lg" radius="md" withBorder className='patientcard'>
        <div className='addnewpatient'>
            <Button variant="light" color="#EBEDF4"  mt ='md'mr='md' radius='md'>
            <FaChevronLeft className='left' />
            </Button>
            <div className='ADDNEW'>Add New Patient</div>
        </div>
        <h4>Patient Information</h4>
      <form onSubmit={form.onSubmit(console.log)}>
        {/* <div className='fullname'>Your Full Name</div> */}
      <TextInput
        placeholder="Patient Name"
        label=" Enter Patientname"
        size='md'
         radius='md'
         {...form.getInputProps('patientname')}
    />
        <NumberInput
      defaultValue={0}
      placeholder="Patient Age"
      label="Age"
       size='md'
      {...form.getInputProps('age')}
        />

    <Select
      label="Sex "
      placeholder="Select"
      data={[
        { value: 'male', label: 'male' },
        { value: 'female', label: 'female' },
        { value: 'others', label: 'others' },
      ]}
       size='md'
    radius='md'
    mt='md'
    />
     <Select
      label="Procedure"
      placeholder='Select (e.g., "Upper gastrointestinal endoscopy")'
      data={[
        { value: 'lazer', label: 'lazer' },
        { value: 'pipe', label: 'pipe' },
        { value: 'other', label: 'other' },
      ]}
       size='md'
    radius='md'
    mt='md'
    />
     <TextInput
                placeholder="Mobile Number"
                label=" Patient Mobile Number "
                type='number'
                size='md'
                radius='md'
                mt='md'
                {...form.getInputProps('patientphone')}
            />
       
        <div>            
                <TextInput
                label="Patient Email "
                placeholder=" @123abc.com" 
                {...form.getInputProps('patientemail')}
                size='md'
                radius='md'
                mt="md"
                icon={<MdOutlineEmail/>}
                style={{padding:'md'}}
                />    
          </div>
          <TextInput
        placeholder="Reffered By"
        label=" Reffered By"
        size='md'
         radius='md'
         mt='md'
         {...form.getInputProps('refferedby')}
    />
        {/* <FileInput
        label="  "
        icon={<FiVideo className='capture'/>}
        placeholder="Start Live Capture "
        accept="video/*"
        capture="environment"
        onChange={handleUpload}
        size="md"
        radius="md"
        styles={{
            input: { backgroundColor: "#f7f9fc" },
            label: { fontWeight: "bold" },
    
        }}
/> */}
   <Button variant="filled" color="violet"  mt ='md' radius='md' fullWidth>
        <FiVideo className='capture'/>Start Live Capture
        </Button>
      </form>
      </Card>

    
    </div>
    </div>
  )
}

export default PatientInfo


// import React, { useRef, useState } from "react";
// import { useForm } from "@mantine/form";
// import {
//   TextInput,
//   Button,
//   Card,
//   Select,
//   NumberInput,
//   FileInput,
// } from "@mantine/core";
// import { MdOutlineEmail } from "react-icons/md";
// import { FaChevronLeft } from "react-icons/fa6";

// const PatientInfo = () => {
//   const videoRef = useRef(null); // Reference to the video element
//   const mediaRecorderRef = useRef(null); // Reference to MediaRecorder
//   const [recordedChunks, setRecordedChunks] = useState([]); // Stores recorded video chunks
//   const [isRecording, setIsRecording] = useState(false); // Recording state

//   // Start the camera and stream it to the video element
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (error) {
//       console.error("Error accessing the camera:", error);
//     }
//   };

//   // Start recording the video
//   const startRecording = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const stream = videoRef.current.srcObject;
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;

//       const chunks = [];
//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         setRecordedChunks(chunks);
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//     }
//   };

//   // Stop recording
//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   // Download the recorded video
//   const downloadVideo = () => {
//     const blob = new Blob(recordedChunks, { type: "video/webm" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.style.display = "none";
//     a.href = url;
//     a.download = "recorded-video.webm";
//     document.body.appendChild(a);
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const form = useForm({
//     initialValues: {
//       patientname: "",
//       age: "",
//       patientemail: "",
//       patientphone: "",
//       refferedby: "",
//     },
//   });

//   const handleSubmit = (values) => {
//     console.log("Form values:", values);
//     console.log("Recorded video file:", recordedChunks);
//   };

//   return (
//     <div className="patient">
//       <div className="patientinfo">
//         <Card shadow="sm" padding="lg" radius="md" withBorder className="patientcard">
//           <div className="addnewpatient">
//             <Button variant="light" color="gray" mt="md" radius="md" styles={{ backgroundColor: "#EBEDF4" }}>
//               <FaChevronLeft />
//             </Button>
//             <div className="ADDNEW">Add New Patient</div>
//           </div>
//           <h4>Patient Information</h4>
//           <form onSubmit={form.onSubmit(handleSubmit)}>
//             <TextInput
//               placeholder="Patient Name"
//               label="Enter Patient Name"
//               size="md"
//               radius="md"
//               {...form.getInputProps("patientname")}
//             />
//             <NumberInput
//               defaultValue={0}
//               placeholder="Patient Age"
//               label="Age"
//               size="md"
//               {...form.getInputProps("age")}
//             />
//             <Select
//               label="Sex"
//               placeholder="Select"
//               data={[
//                 { value: "male", label: "Male" },
//                 { value: "female", label: "Female" },
//                 { value: "others", label: "Others" },
//               ]}
//               size="md"
//               radius="md"
//               mt="md"
//             />
//             <Select
//               label="Procedure"
//               placeholder='Select (e.g., "Upper gastrointestinal endoscopy")'
//               data={[
//                 { value: "lazer", label: "Lazer" },
//                 { value: "pipe", label: "Pipe" },
//                 { value: "other", label: "Other" },
//               ]}
//               size="md"
//               radius="md"
//               mt="md"
//             />
//             <TextInput
//               placeholder="Mobile Number"
//               label="Patient Mobile Number"
//               type="number"
//               size="md"
//               radius="md"
//               mt="md"
//               {...form.getInputProps("patientphone")}
//             />
//             <TextInput
//               label="Patient Email"
//               placeholder="@123abc.com"
//               {...form.getInputProps("patientemail")}
//               size="md"
//               radius="md"
//               mt="md"
//               icon={<MdOutlineEmail />}
//             />
//             <TextInput
//               placeholder="Referred By"
//               label="Referred By"
//               size="md"
//               radius="md"
//               {...form.getInputProps("refferedby")}
//             />

//             {/* Video Capture Section */}
//             <h4>Video Capture</h4>
//             <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               style={{ width: "100%", height: "auto", border: "1px solid #ccc" }}
//             />
//             <div style={{ marginTop: "16px" }}>
//               <Button onClick={startCamera} radius="md" mr="md">
//                 Start Camera
//               </Button>
//               {!isRecording ? (
//                 <Button onClick={startRecording} radius="md" color="green">
//                   Start Recording
//                 </Button>
//               ) : (
//                 <Button onClick={stopRecording} radius="md" color="red">
//                   Stop Recording
//                 </Button>
//               )}
//               {recordedChunks.length > 0 && (
//                 <Button onClick={downloadVideo} radius="md" mt="md" color="blue">
//                   Download Video
//                 </Button>
//               )}
//             </div>

//             <Button variant="filled" color="violet" mt="md" radius="md" fullWidth type="submit">
//               Submit
//             </Button>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default PatientInfo;
