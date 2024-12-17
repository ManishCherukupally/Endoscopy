// import React, { useState } from 'react';
// import { useForm } from '@mantine/form';
// import { PasswordInput, TextInput, Button, Card, Image, Select, Radio } from '@mantine/core';
// import logo from '../../assets/Vector.jpg';
// import { MdOutlineEmail } from "react-icons/md";
// import { MdLockOutline } from "react-icons/md";
// import { Group, Text, useMantineTheme, rem } from '@mantine/core';
// import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
// import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import client from '../Api';




// const Registeration = () => {
//   // const openRef = useRef<() => void>(null);
//   const [hoveredCard, setHoveredCard] = useState(null);


//     const form = useForm({
//         initialValues: { first_name:'', username:'',email: '', password: '',cnfpassword:'',mobile_no:'',speciality:'' ,template:""},
//     validate:{
//       first_name:(value)=>(value.trim().length === 0 ? 'your fullname is required':null),
//       username:(value)=>(value.trim().length === 0 ?"username is required ":null),
//       email:(value)=>(/^\S+@\S+$/.test(value)?null:"Invalid email format"),
//       password:(value)=>(value.length < 8 ? "password must be in 8 characters":null),
//       // cnfpassword:(value, values)=>(value !== values.length ? null:"do not matched"),
//       cnfpassword: (value, values) =>
//         value !== values.password ? 'Passwords do not match' : null,
      
//       // mobile_no:(value)=>( /^\d{10}$/.test(value)? null:'Invalid phone number'),
//       mobile_no: (value) => (value && value.length == 10 ? null : 'Phone number must be a valid 10-digit number'),

//       speciality:(value) =>(value.trim().length===0?"select the speciality":null),

//     }
        
//       });
//       const theme = useMantineTheme();
//       const navigate=useNavigate()

//       const Formhandling = async (e) => {
//         e.preventDefault();
//         const isValid = !form.validate().hasErrors;
//         if(!isValid)return;
//         try{
//         const result= await client.post('/register/',{
//           first_name:form.values.first_name,
//           speciality:form.values.speciality,
//           username:form.values.username,
//           password:form.values.password,
//           mobile_no:form.values.mobile_no,
//           email:form.values.email
//         },
//         {
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//       console.log(form.values)
//         console.log(result)
//         if(result.data&&result.data.status === "User_created_successfully!"){
//           // alert("account successfully created")
//           navigate('/')
//         }
//       } catch (error) {
//         if (error.response?.data) {
//           const backendErrors = error.response.data;
//           Object.keys(backendErrors).forEach((field) => {
//             form.setFieldError(field, backendErrors[field]);
//           });
//         } else {
//           console.error("Unexpected error:", error.message);
//         }
//       }
//     };

//     const handleMobileChange = (e) => {
//       const value = e.target.value.replace(/\D/g, ''); 
//       if (value.length <= 10) {
//         if (value === '' || /^[6-9]/.test(value)) { 
//           form.setFieldValue('mobile_no', value);
//         }
//       }
//     };

//   const form = useForm({
//     initialValues: { name: '', loginName: '', email: '', password: '', cnfpassword: '', phone: '' },


//   });
//   const theme = useMantineTheme();

//   return (
//     <div className='parent'>
//       <div className='child1'>

//         <Card shadow="sm" padding="lg" radius="md" withBorder>
//           <div className='logo'>
//             <Image maw={40} radius="md" src={logo} alt="Endoscopy Logo" />
//             <h2>Endoscopy</h2>
//           </div>
//           <div>
//             <h3>Create Your Account</h3>
//             <div className='imglogo'>
//       <div className='circle'>
//               <Dropzone
//       onDrop={(files) => console.log('accepted files', files)}
//       onReject={(files) => console.log('rejected files', files)}
//       maxSize={3 * 1024 ** 2}
//       accept={IMAGE_MIME_TYPE}
//       // {...props}
//     >
//       <Group position="center" spacing="xl" m={0} style={{ minHeight: rem(150), pointerEvents: 'none' }}>
//         <Dropzone.Accept>
//           <IconUpload
//             size="3.2rem"
//             stroke={1.5}
//             className='upload'
//             color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
//           />
//         </Dropzone.Accept>
//         <Dropzone.Reject>
//           <IconX
//             size="3.2rem"
//             stroke={1.5}
//             color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
//           />
//         </Dropzone.Reject>
//         <Dropzone.Idle>
//           <IconPhoto size="3.2rem" stroke={1.5} />
//         </Dropzone.Idle>

       
//       </Group>
//     </Dropzone>

//               </div>
//             </div>
//       </div>
//       <form 
//       // onSubmit={form.onSubmit(console.log)}
//       onSubmit={Formhandling}
//       >
//         {/* <div className='fullname'>Your Full Name</div> */}
//       <TextInput
//         placeholder="Your name"
//         label=" Your Full Name "
//         size='md'
//          radius='md'
//          {...form.getInputProps('first_name')}
//     />
//     {/* <div className='special'>Speciality</div> */}
//     <Select
//       label="Speciality "
//       placeholder="Select"
//       data={[
//         { value: 'react', label: 'React' },
//         { value: 'ng', label: 'Angular' },
//         { value: 'svelte', label: 'Svelte' },
//         { value: 'vue', label: 'Vue' },
//       ]}
//        size='md'
//     radius='md'
//     mt='md'
//     {...form.getInputProps('speciality')}
//     />
//          {/* <div className='loginname'>Login UserName</div> */}
//         <TextInput
//                 placeholder="Login name"
//                 label="Login UserName "
//                 size='md'
//                 mt='md'
//                 radius='md'
//                 {...form.getInputProps('username')}
//             />
//         {/* <div className='login_password'>Login Password</div> */}
        
//         <PasswordInput
//             placeholder="Password"
//             label="Password"
//             icon={<MdLockOutline style={{color:'gray'}}/>}
//             size='md'
//             radius='md'
//             mt='md'
//             {...form.getInputProps('password')}
//             withAsterisk
//              />

// {/* <div className='login_password_cnf'>Confirm Login Password</div> */}
        
//         <PasswordInput
//             placeholder="Confirm Password"
//             label="Confirm Password"
//             icon={<MdLockOutline style={{color:'gray'}}/>} 
//             size='md'
//             radius='md'
//             mt='md'
//             {...form.getInputProps('cnfpassword')}
//             withAsterisk
//              />
            
//             {/* <div className='phone'>Mobile Number</div> */}
//         <TextInput
//                 placeholder="Mobile Number"
//                 label="Mobile Number "
//                 type='number'
//                 size='md'
//                 radius='md'
//                 mt='md'
//                 {...form.getInputProps('mobile_no')}
//                 onChange={handleMobileChange}

//               <div className='circle'>
//                 <Dropzone
//                   onDrop={(files) => console.log('accepted files', files)}
//                   onReject={(files) => console.log('rejected files', files)}
//                   maxSize={3 * 1024 ** 2}
//                   accept={IMAGE_MIME_TYPE}
//                 // {...props}
//                 >
//                   <Group position="center" spacing="xl" m={0} style={{ minHeight: rem(150), pointerEvents: 'none' }}>
//                     <Dropzone.Accept>
//                       <IconUpload
//                         size="3.2rem"
//                         stroke={1.5}
//                         className='upload'
//                         color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
//                       />
//                     </Dropzone.Accept>
//                     <Dropzone.Reject>
//                       <IconX
//                         size="3.2rem"
//                         stroke={1.5}
//                         color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
//                       />
//                     </Dropzone.Reject>
//                     <Dropzone.Idle>
//                       <IconPhoto size="3.2rem" stroke={1.5} />
//                     </Dropzone.Idle>


//                   </Group>
//                 </Dropzone>

//               </div>
//             </div>
//           </div>
//           <form onSubmit={form.onSubmit(console.log)}>
//             {/* <div className='fullname'>Your Full Name</div> */}
//             <TextInput
//               placeholder="Your name"
//               label=" Your Full Name "
//               size='md'
//               radius='md'
//               {...form.getInputProps('name')}
//             />
//             {/* <div className='special'>Speciality</div> */}
//             <Select
//               label="Speciality "
//               placeholder="Select"
//               data={[
//                 { value: 'react', label: 'React' },
//                 { value: 'ng', label: 'Angular' },
//                 { value: 'svelte', label: 'Svelte' },
//                 { value: 'vue', label: 'Vue' },
//               ]}
//               size='md'
//               radius='md'
//               mt='md'
//             />
//             {/* <div className='loginname'>Login UserName</div> */}
//             <TextInput
//               placeholder="Login name"
//               label="Login UserName "
//               size='md'
//               mt='md'
//               radius='md'
//               {...form.getInputProps('loginName')}
//             />
//             {/* <div className='login_password'>Login Password</div> */}

//             <PasswordInput
//               placeholder="Password"
//               label="Password"
//               icon={<MdLockOutline />}
//               size='md'
//               radius='md'
//               mt='md'
//               {...form.getInputProps('password')}
//               withAsterisk

//             />

//             {/* <div className='login_password_cnf'>Confirm Login Password</div> */}

//             <PasswordInput
//               placeholder="Confirm Password"
//               label="Confirm Password"
//               icon={<MdLockOutline />}
//               size='md'
//               radius='md'
//               mt='md'
//               {...form.getInputProps('cnfpassword')}
//               withAsterisk
//             />

//             {/* <div className='phone'>Mobile Number</div> */}
//             <TextInput
//               placeholder="Mobile Number"
//               label="Mobile Number "
//               type='number'
//               size='md'
//               radius='md'
//               mt='md'
//               {...form.getInputProps('phone')}
//             />
//             <div>
//               {/* <div className='email'>Email ID</div>  */}

//               <TextInput
//                 label="Email ID "
//                 placeholder=" @123abc.com"
//                 {...form.getInputProps('email')}
//                 size='md'
//                 radius='md'
//                 mt="md"

//                 icon={<MdOutlineEmail style={{color:'gray'}}/>}
//                 style={{padding:'md'}}
//                 />    
//           </div>
//       <h4>Choose Template</h4>
//       <Radio.Group
//                 icon={<MdOutlineEmail />}
//                 style={{ padding: 'md' }}
//               />
//             </div>
//             <h4>Choose Template</h4>
//             <Radio.Group

//               value={form.values.template}
//               onChange={(value) => form.setFieldValue('template', value)}
//             >
//               <div className="container">
//                 {['default', '1', '2', '3', '4'].map((value, index) => (
//                   <div
//                     key={index}
//                     className="card"
//                     onMouseEnter={() => setHoveredCard(value)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                   >
//                     <Radio value={value} className="radio" />
//                     {hoveredCard === value && (
//                       <Button className="view" radius="md">
//                         View
//                       </Button>
//                     )}
//                     <div className="values">{value === 'default' ? 'Default' : value}</div>
//                   </div>
//                 ))}
//               </div>
//             </Radio.Group>


        
//         <Button type="submit" variant="filled" color="violet"  mt ='md' radius='md' fullWidth>
//             Create Account
//         </Button>
//       </form>
//       </Card>
//     {/* </Box> */}
    
//     // </div>

//       //       <Button variant="filled" color="violet" mt='md' radius='md' fullWidth>
//       //         Create Account
//       //       </Button>
//       //     </form>
//       //   </Card>
//       //   {/* </Box> */}

//       </div>
//     </div>
//   )
// }

// export default Registeration


import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { PasswordInput, TextInput, Button, Card, Image, Select, Radio, Group, Text, useMantineTheme, rem } from '@mantine/core';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import client from '../Api';
import logo from '../../assets/Vector.jpg';

const Registration = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
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
    const isValid = !form.validate().hasErrors;
    if (!isValid) return;

    try {
      const result = await client.post(
        '/register/',
        {
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
        navigate('/');
      }
    } catch (error) {
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

  return (
    <div className="parent">
      <div className="child1">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <div className="logo">
            <Image maw={40} radius="md" src={logo} alt="Endoscopy Logo" />
            <h2>Endoscopy</h2>
          </div>
          <h3>Create Your Account</h3>
          <div className="imglogo">
            <div className="circle">
              <Dropzone
                onDrop={(files) => console.log('Accepted files:', files)}
                onReject={(files) => console.log('Rejected files:', files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                <Group position="center" spacing="xl" style={{ minHeight: rem(150), pointerEvents: 'none' }}>
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
              onChange={(value) => form.setFieldValue('template', value)}
            >
              <div className="container">
                {['default', '1', '2', '3', '4'].map((value, index) => (
                  <div
                    key={index}
                    className="card"
                    onMouseEnter={() => setHoveredCard(value)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Radio value={value} className="radio" />
                    {hoveredCard === value && (
                      <Button className="view" radius="md">
                        View
                      </Button>
                    )}
                    <div className="values">{value === 'default' ? 'Default' : value}</div>
                  </div>
                ))}
              </div>
            </Radio.Group>
            <Button type="submit" variant="filled" color="violet" mt="md" radius="md" fullWidth>
              Create Account
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Registration;
