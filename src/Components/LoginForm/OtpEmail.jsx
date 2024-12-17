import React from 'react';
import {Button,Card,Image,Group,PinInput} from '@mantine/core';
import logo from '../../assets/Vector.jpg';
import { FaChevronLeft } from "react-icons/fa6";
import otp from '../../assets/image 1619.jpg';
import { FaTelegramPlane } from "react-icons/fa";
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import client from '../Api';

const OtpEmail = () => {
  const form=useForm({
    initialValues: { otp: '' },
    validate: {
      otp: (value) => (value.length<6 ? 'enter 6 digits otp':null),
    },
  });
  const navigate=useNavigate()
  
  const OtpVerification = async (e) => {
    e.preventDefault();
  
    if (form.validate().hasErrors) {
      console.log('Form validation failed:', form.errors);
      return;
    }
  
    console.log('OTP Value:', form.values);
  
    try {
      const response = await client.post('/verify/',
        { otp: form.values.otp ,
          withCredentials:true
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      console.log('API response:', response.data);
  
      if (response.data && response.data.message === 'OTP_verified_successfully.') {
        // alert('OTP verified successfully!');
        navigate('/settingpwd');
      } else {
        console.error('Invalid OTP received from API');
        form.setFieldError('otp', 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      form.setFieldError('otp', 'Something went wrong. Please try again later.');
    }
  };
  
  const ResendCode = async () => {
    const email = window.localStorage.getItem('email'); // Retrieve email from localStorage
    if (!email) {
      console.log('Email not found. Please restart the process.');
      navigate('/forgot'); // Redirect to Forgot Password if email is missing
      return;
    }

    try {
      const response = await client.post('/forgot/',
        { email,
         },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log('API Response:', response.data);

      if (response.data?.message === "OTP_sent_successfully.") {
        // alert('OTP has been resent successfully!');
      } else {
        console.error('Unexpected response from API:', response.data);
        alert('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP resend:', error);
      alert('Something went wrong. Please try again later.');
    }
  };
  const email = window.localStorage.getItem('email');

  return (
    <div className='parent'>
    <div className='child3'>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
      <form onSubmit={OtpVerification}>
        <div className='logo'>
            <Image maw={40}  radius="md" src={logo} alt="Random image" />
            <div className='hh'><h2>Endoscopy</h2></div>
        </div>
      <div  className='arrow_for'>
            <Link to='/forgot' style={{color:'black'}}><FaChevronLeft id='fpwd' /></Link>
            <div ><h3>OTP Verification</h3></div>
      </div>
      <div className='OTP'>
      <Image maw={200}  radius="md" src={otp} alt="OTP email" />
      <div className='verification'><strong>Verification Code</strong></div>
      <div className='phoneemail'>Enter the  Verification code that we've <p>sent to {email}</p></div>
     
      <div className='otp_code'>
       
      <Group position="center">
      <PinInput type='number' length={6} size='lg'
      {...form.getInputProps('otp')}
      // error={}
      />
      
    </Group>
      </div>

      </div>

        <Button type="submit" fullWidth color='violet' radius='md' mb='xs' size='md'>
          Verify OTP
        </Button>
        <Button  type='button' variant='light'mt="xl" fullWidth color='violet' radius='md' mb='xs' size='md' className='button'
             onClick={ResendCode}   >
        <FaTelegramPlane  className='telegram'/>
        Re-send Code
        </Button>
        </form>
      </Card>
    </div>
    </div>
  )
}

export default OtpEmail
