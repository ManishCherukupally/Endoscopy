import React from 'react';
import { useForm } from '@mantine/form';
import {  PasswordInput,TextInput, Button, Box ,Card,Checkbox,Text,Image,Divider} from '@mantine/core';
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import logo from '../../assets/Vector.jpg'
 


const Login = () => {
    const form = useForm({
        initialValues: { userInput: '', password: '' },
    
        validate: {
            userInput: (value) =>
              value
                ? value.includes('@') // If the input includes "@" assume email validation
                  ? (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
                  : value.trim().length > 0 // Otherwise, validate as a username
                  ? null
                  : 'Username cannot be empty'
                : 'This field is required', // Handle empty values explicitly
            password: (value) =>
              value.length < 8 ? 'Password must be at least 8 characters' : null,
          },
      });
  return (
    <div className='parent'>
    <div className='child'>
      {/* <Box maw={320} mx="auto"> */}
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{marginBottom:'0.3rem'}}>
        <div className='logo'>
      <Image maw={40}  radius="md" src={logo} alt="Random image" />
      <h2>Endoscopy</h2>
      </div>
        <h3>Login into your Account.</h3>
        <div className='h'>Only authorized accounts can login.</div>
      <form onSubmit={form.onSubmit(console.log)}>
        <div className='userpass'>
        {/* <div className='user'>Email or UserName</div> */}
       
        <TextInput
         label="Email OR UserName "
          placeholder=" Email or UserName" 
          {...form.getInputProps('userInput')}
          size='md'
          radius='md'
          icon={ <MdOutlineEmail/>}
          style={{padding:'md'}}
         />
          
          </div>
          {/* <div className='p'></div> */}
        {/* <div className='password'>Password</div> */}
       
        <PasswordInput
            placeholder="Password"
            label=" Password"
            // description="Password must include at least one letter, number and special character"
            size='md'
            radius='md'
            mt='xl'
            icon={ <MdLockOutline/>}
            {...form.getInputProps('password')}
            withAsterisk
             />
       <div className='check'> 
       <Checkbox
      label="Remember me"/>
        <Text>Forgot Password?</Text>
       </div>
        <Button type="submit" mt="sm" fullWidth color='violet' radius='md'>
          Login
        </Button>
        <Button variant="light" color="violet"  mt ='md' radius='md' fullWidth>
            Create Account
        </Button>
        {/* <div className='or'>Or Continue With</div> */}
        <Divider my="xs"  size='md'label="Or Continue With" labelPosition="center" />
        {/* <div className='bar'></div> */}
        <div className='need'>
            <div><span style={{color:'gray'}}>Need Help?</span><span>Contact Us</span></div>
            <div className='c'><a href="#">Terms</a>&<a href="#"> Conditions</a></div>
        </div>
      </form>
      </Card>
    
    </div>
    </div>
  )
}

export default Login
