import React,{useState} from 'react';
import { useForm } from '@mantine/form';
import {TextInput, Button,Card,Select,NumberInput,FileInput} from '@mantine/core';
import { MdOutlineEmail } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import client from '../Api';

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
        patient_name: "",
        age: "",
        patient_email: "",
        mobile: "",
        referred: "",
        gender: '',
        procedure:''
      },
      validate:{
        patient_name:(value)=>(value.length<3?'first name atleast 3 characters':null),
        // age:(value)=>(value.length < 0 ?'Enter your age':null),
        age: (value) => (value && value > 0 ? null : 'Enter a valid age'),

        patient_email:(value)=>(/^\S+@\S+$/.test(value)?null:'Invalid Email'),
        // mobile:(value)=>(/^\d{10}$/.test(value)?null:'Invalid mobile number'),
        mobile: (value) => (value && value.length == 10 ? null : 'Phone number must be a valid 10-digit number'),
        referred:(value)=>(value.trim().length === 0?'Enter Referred name':null),
        gender:(value)=>(value.trim().length===0?'select the gender':null),
        procedure:(value)=>(value.trim().length===0?'select the procedure':null)
      }
    });
    const handleMobileChange = (e) => {
      const value = e.target.value.replace(/\D/g, ''); 
      if (value.length <= 10) {
        if (value === '' || /^[6-9]/.test(value)) { 
          form.setFieldValue('mobile', value);
        }
      }
    };
    const navigate = useNavigate()

    const NewPatient = async (e)=>{
      e.preventDefault();
      const validationErrors = form.validate();
    if (validationErrors.hasErrors) return;

      try{
        const response = await client.post('/add-patient/',
          {
            patient_name:form.values.patient_name,
            patient_email:form.values.patient_email,
            age:form.values.age,
            mobile:form.values.mobile,
            gender:form.values.gender,
            procedure:form.values.procedure,
            referred:form.values.referred,
            withCredentials:true
          },
          {
            headers:{'Content-Type':'application/json'}
          }
        )
        console.log('form data',form.values)
        console.log(response)
        console.log(response.data)
        if (response.data.status === 'patient_already_exists') {
        alert('Patient already exists');
      } else if (response.data.status === 'patient_added_successfully') {
        // alert('Patient added successfully');
        navigate('/allpatients');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized! Please log in again.');
        navigate('/login');
      } else {
        alert('An unexpected error occurred.');
      }
      }
    }
  
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
      <form onSubmit={NewPatient}>
        {/* <div className='fullname'>Your Full Name</div> */}
      <TextInput
        placeholder="Patient Name"
        label=" Enter Patient Name"
        size='md'
         radius='md'
         {...form.getInputProps('patient_name')}
         withAsterisk
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
    {...form.getInputProps('gender')}
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
    {...form.getInputProps('procedure')}
    />
     <TextInput
              placeholder="Patient Mobile Number"
              label="Patient Mobile Number"
              type='number'
              size="md"
              radius="md"
              mt="md"
              onChange={handleMobileChange}
              // {...form.getInputProps('mobile')}
              value={form.values.mobile}
            />
       
        <div>            
                <TextInput
                label="Patient Email "
                placeholder=" @123abc.com" 
                {...form.getInputProps('patient_email')}
                size='md'
                radius='md'
                mt="md"
                icon={<MdOutlineEmail style={{color:'gray'}}/>}
                style={{padding:'md'}}
                />    
          </div>
          <TextInput
        placeholder="Referred By"
        label=" Referred By"
        size='md'
         radius='md'
         mt='md'
         {...form.getInputProps('referred')}
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
   <Button variant="filled" color="violet"  mt ='md' radius='md' fullWidth type='submit'>
        {/* <FiVideo className='capture'/>Start Live Capture */}
        Add Patient
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
