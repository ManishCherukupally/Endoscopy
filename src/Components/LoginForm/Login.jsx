// import React from 'react';
// import { useForm } from '@mantine/form';
// import { PasswordInput, TextInput, Button, Box, Card, Checkbox, Text, Image, Divider } from '@mantine/core';
// import { MdOutlineEmail } from "react-icons/md";
// import { MdLockOutline } from "react-icons/md";
// import logo from '../../assets/Vector.jpg'
// import { useNavigate } from 'react-router-dom';

// import {
//   PasswordInput,
//   TextInput,
//   Button,
//   Box,
//   Card,
//   Checkbox,
//   Text,
//   Image,
//   Divider,
// } from '@mantine/core';
// import { MdOutlineEmail, MdLockOutline } from 'react-icons/md';
// import logo from '../../assets/Vector.jpg';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import client from '../Api';

// const Login = () => {
//   const navigate = useNavigate();




// const Login = () => {
//   const navigate = useNavigate()
//   const form = useForm({
//     initialValues: { userInput: '', password: '' },

//     validate: {
//       userInput: (value) =>
//         value
//           ? value.includes('@') // If the input includes "@" assume email validation
//             ? (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
//             : value.trim().length > 0 // Otherwise, validate as a username
//               ? null
//               : 'Username cannot be empty'
//           : 'This field is required', // Handle empty values explicitly
//       password: (value) =>
//         value.length < 8 ? 'Password must be at least 8 characters' : null,
//     },
//   });
//   return (
//     <div className='parent'>
//       <div className='child'>
//         {/* <Box maw={320} mx="auto"> */}
//         <Card shadow="sm" padding="lg" radius="md" withBorder style={{ marginBottom: '0.3rem' }}>
//           <div className='logo'>
//             <Image maw={40} radius="md" src={logo} alt="Random image" />
//             <h2>Endoscopy</h2>
//           </div>
//           <h3>Login into your Account.</h3>
//           <div className='h'>Only authorized accounts can login.</div>
//           <form onSubmit={form.onSubmit(console.log)}>
//             <div className='userpass'>
//               {/* <div className='user'>Email or UserName</div> */}

//               <TextInput
//                 label="Email OR UserName "
//                 placeholder=" Email or UserName"
//                 {...form.getInputProps('userInput')}
//                 size='md'
//                 radius='md'
//                 icon={<MdOutlineEmail />}
//                 style={{ padding: 'md' }}
//               />

//             </div>
//             {/* <div className='p'></div> */}
//             {/* <div className='password'>Password</div> */}

//             <PasswordInput
//               placeholder="Password"
//               label=" Password"
//               // description="Password must include at least one letter, number and special character"
//               size='md'
//               radius='md'
//               mt='xl'
//               icon={<MdLockOutline />}
//               {...form.getInputProps('password')}
//               withAsterisk
//             />
//             <div className='check'>
//               <Checkbox
//                 label="Remember me" />
//               <Text>Forgot Password?</Text>
//             </div>
//             <Button type="submit" mt="sm" fullWidth color='violet' radius='md' >
//               Login
//             </Button>
//             <Button variant="light" color="violet" mt='md' radius='md' fullWidth>
//               Create Account
//             </Button>
//             {/* <div className='or'>Or Continue With</div> */}
//             <Divider my="xs" size='md' label="Or Continue With" labelPosition="center" />
//             {/* <div className='bar'></div> */}
//             <div className='need'>
//               <div><span style={{ color: 'gray' }}>Need Help?</span><span>Contact Us</span></div>
//               <div className='c'><a href="#">Terms</a>&<a href="#"> Conditions</a></div>
//             </div>
//           </form>
//         </Card>

//       </div>
//     </div>
//   )
// }

//   const form = useForm({
//     initialValues: {
//       username: '',
//       password: '',
//     },
//     validate: {
//       username: (value) =>
//         value.length < 3 ? 'Username must be at least 3 characters' : null,
//       password: (value) =>
//         value.length < 8 ? 'Password must be at least 8 characters' : null,
//     },
//   });
//   // console.log(client+'login/')
//   // console.log(client.defaults.baseURL + 'login/');

//   const submithandler = async (e) => {
//     e.preventDefault();
//     const isValid = !form.validate().hasErrors;
//     if (!isValid) return;


//     try {
//       const response = await client.post('/login/',
//         {
//           username: form.values.username,
//           password: form.values.password,
//           withCredentials:true

//         },
//         {
//           headers: { 'Content-Type': 'application/json' },

//         }
//       );
//       console.log(response)
//       console.log(response.data)
//       if (response.data && response.data.status === 'user_validated') {
//         // alert('Login successful');
//         navigate('/allpatients');
//         console.log(response.data.accessToken)
//       } else if (response.data.status === 'unauthorized_user') {
//         form.setFieldError('username', 'Invalid username or password');
//       } else {
//         console.error('Unexpected response:', response);
//         form.setFieldError('username', 'Invalid credentials');
//       }
//     } 
//     catch (error) {
//       console.error('Login failed:', error.response?.data || error.message);
//       form.setFieldError(
//         'username',
//         error.response?.data?.detail || 'Invalid username/email or password'
//       );
//     }
//   };

//   return (
//     <div className="parent">
//       <div className="child">
//         <Card shadow="sm" padding="lg" radius="md" withBorder style={{ marginBottom: '0.3rem' }}>
//           <div className="logo">
//             <Image maw={40} radius="md" src={logo} alt="Logo" />
//             <h2>Endoscopy</h2>
//           </div>
//           <h3>Login into your Account</h3>
//           <div className="h">Only authorized accounts can login.</div>
//           <form onSubmit={submithandler}>
//             <div className="userpass">
//               <TextInput
//                 label="Email OR Username"
//                 placeholder="Email or Username"
//                 {...form.getInputProps('username')}
//                 size="md"
//                 radius="md"
//                 icon={<MdOutlineEmail style={{color:'gray'}} />}
//               />
//             </div>
//             <PasswordInput
//               placeholder="Password"
//               label="Password"
//               size="md"
//               radius="md"
//               mt="md"
//               icon={<MdLockOutline style={{color:'gray'}}/>}
//               {...form.getInputProps('password')}
//               withAsterisk
//             />
//             <div className="check">
//               <Checkbox label="Remember me" />
//               <Link style={{ textDecoration: 'none' }} to="/forgot">
//                 <Text>Forgot Password?</Text>
//               </Link>
//             </div>
//             <Button type="submit" mt="sm" fullWidth color="violet" radius="md">
//               Login
//             </Button>
//             <Button variant="light" color="violet" mt="md" radius="md" fullWidth
//             onClick={()=>{navigate('/register')}}>
//               Create Account
//               {/* <Link to="/register" style={{ textDecoration: 'none' }}>
//                 Create Account
//               </Link> */}
//             </Button>
//             <Divider my="xs" size="md" label="Or Continue With" labelPosition="center" />
//             <div className="need">
//               <div>
//                 <span style={{ color: 'gray' }}>Need Help?</span> <span>Contact Us</span>
//               </div>
//               <div className="c">
//                 <a href="#">Terms</a> & <a href="#">Conditions</a>
//               </div>
//             </div>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { PasswordInput, TextInput, Button, Box, Card, Checkbox, Text, Image, Divider } from '@mantine/core';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import logo from '../../assets/Vector.jpg';
import { Link, useNavigate } from 'react-router-dom';
import client from '../Api'; // Assuming you have an axios client setup

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) =>
        value.length < 3 ? 'Username must be at least 3 characters' : null,
      password: (value) =>
        value.length < 8 ? 'Password must be at least 8 characters' : null,
    },
  });

  const submithandler = async (e) => {
    setLoader(true)
    e.preventDefault();
    const isValid = !form.validate().hasErrors;
    if (!isValid) return;

    try {
      const response = await client.post('/login/', {
        username: form.values.username,
        password: form.values.password,
      });

      console.log(response);
      if (response.data && response.data.status === 'user_validated') {
        setLoader(false)
        navigate('/allpatients');
        console.log(response.data.accessToken);
      } else if (response.data.status === 'unauthorized_user') {
        setLoader(false)

        form.setFieldError('username', 'Invalid username or password');
      } else {
        setLoader(false)

        console.error('Unexpected response:', response);
        form.setFieldError('username', 'Invalid credentials');
      }
    } catch (error) {
      setLoader(false)
      console.error('Login failed:', error.response?.data || error.message);
      form.setFieldError('username', error.response?.data?.detail || 'Invalid username/email or password');
    }
  };

  return (
    <div className="parent">
      <div className="child">
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ marginBottom: '0.3rem' }}>
          <div className="logo">
            <Image maw={40} radius="md" src={logo} alt="Logo" />
            <h2>Endoscopy</h2>
          </div>
          <h3>Login into your Account</h3>
          <div className="h">Only authorized accounts can login.</div>
          <form onSubmit={submithandler}>
            <div className="userpass">
              <TextInput
                label="Email OR Username"
                placeholder="Email or Username"
                {...form.getInputProps('username')}
                size="md"
                radius="md"
                icon={<MdOutlineEmail style={{ color: 'gray' }} />}
              />
            </div>
            <PasswordInput
              placeholder="Password"
              label="Password"
              size="md"
              radius="md"
              mt="md"
              icon={<MdLockOutline style={{ color: 'gray' }} />}
              {...form.getInputProps('password')}
              withAsterisk
            />
            <div className="check">
              <Checkbox label="Remember me" />
              <Link style={{ textDecoration: 'none' }} to="/forgot">
                <Text>Forgot Password?</Text>
              </Link>
            </div>
            <Button type="submit" mt="sm" fullWidth color="violet" radius="md" loading={loader}>
              Login
            </Button>
            <Button variant="light" color="violet" mt="md" radius="md" fullWidth onClick={() => { navigate('/register') }}>
              Create Account
            </Button>
            <Divider my="xs" size="md" label="Or Continue With" labelPosition="center" />
            <div className="need">
              <div>
                <span style={{ color: 'gray' }}>Need Help?</span> <span>Contact Us</span>
              </div>
              <div className="c">
                <a href="#">Terms</a> & <a href="#">Conditions</a>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
