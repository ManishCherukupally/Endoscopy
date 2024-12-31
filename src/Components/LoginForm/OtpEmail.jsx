import React, { useState, useEffect } from 'react';
import { Button, Card, Image, Group, PinInput } from '@mantine/core';
import logo from '../../assets/Vector.jpg';
import { FaChevronLeft } from "react-icons/fa6";
import otp from '../../assets/image 1619.jpg';
import { FaTelegramPlane } from "react-icons/fa";
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import client from '../Api';

const OtpEmail = () => {
  const [timer, setTimer] = useState(60); // Timer state for 30 seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend button initially

  const form = useForm({
    initialValues: { otp: '' },
    validate: {
      otp: (value) => (value.length < 6 ? 'Enter 6 digits OTP' : null),
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Start the timer when the component is rendered
    let interval = null;

    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false); // Enable resend button when timer ends
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [isResendDisabled]);

  const OtpVerification = async (e) => {
    e.preventDefault();

    if (form.validate().hasErrors) {
      console.log('Form validation failed:', form.errors);
      return;
    }

    console.log('OTP Value:', form.values);

    try {
      const response = await client.post(
        '/verify/',
        { otp: form.values.otp, withCredentials: true },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('API response:', response.data);

      if (response.data && response.data.message === 'OTP_verified_successfully.') {
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
    const email = window.localStorage.getItem('email');
    if (!email) {
      console.log('Email not found. Please restart the process.');
      navigate('/forgot');
      return;
    }

    try {
      const response = await client.post(
        '/forgot/',
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log('API Response:', response.data);

      if (response.data?.message === "OTP_sent_successfully.") {
        setTimer(30); // Reset timer to 30 seconds
        setIsResendDisabled(true); // Disable resend button
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
        <Card shadow="sm" padding="lg" radius="md" >
          <form onSubmit={OtpVerification}>
            <div className='logo'>
              <Image maw={40} radius="md" src={logo} alt="Random image" />
              <div className='hh'><h2>Endoscopy</h2></div>
            </div>
            <div className='arrow_for'>
              <Link to='/forgot' style={{ color: 'black' }}><FaChevronLeft id='fpwd' /></Link>
              <div><h3>OTP Verification</h3></div>
            </div>
            <div className='OTP'>
              <Image maw={200} radius="md" src={otp} alt="OTP email" />
              <div className='verification'><strong>Verification Code</strong></div>
              <div className='phoneemail'>Enter the Verification code that we've sent to {email}</div>
              <div className='otp_code'>
                <Group position="center">
                  <PinInput
                    type='number'
                    length={6}
                    size='lg'
                    {...form.getInputProps('otp')}
                  />
                </Group>
              </div>
            </div>
            <Button type="submit" fullWidth color='violet' radius='md' mb='xs' size='md'>
              Verify OTP
            </Button>
            <Button
              type='button'
              variant='light'
              mt="xl"
              fullWidth
              color='violet'
              radius='md'
              mb='xs'
              size='md'
              className='button'
              onClick={ResendCode}
              disabled={isResendDisabled} // Disable the button based on timer
            >
              <FaTelegramPlane className='telegram' />
              {isResendDisabled ? `Re-send Code (${timer}s)` : 'Re-send Code'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default OtpEmail;
