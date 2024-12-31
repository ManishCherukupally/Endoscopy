import React, { useEffect, useState } from 'react';
import { Button, Card, Image, Group, PinInput } from '@mantine/core';
import logo from '../../assets/Vector.jpg';
import { FaChevronLeft } from "react-icons/fa6";
import otp from '../../assets/image 1619.jpg';
import { FaTelegramPlane } from "react-icons/fa";

const OtpNumber = () => {
  const [timer, setTimer] = useState(60); // Timer state for 30 seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend button initially

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
  return (
    <div className='parent'>
      <div className='child3'>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <div className='logo'>
            <Image maw={40} radius="md" src={logo} alt="Random image" />
            <div className='hh'><h2>Endoscopy</h2></div>
          </div>
          <div className='arrow_for'>
            <FaChevronLeft id='fpwd' />
            <div ><h3>OTP Verification</h3></div>
          </div>
          <div className='OTP'>
            <Image maw={200} radius="md" src={otp} alt="OTP number" />
            <div className='verification'><strong>Verification Code</strong></div>
            <div className='phonenumber'>Enter the  Verification code that we've sent to your number</div>
            <div className='otp_code'>
              <Group position="center">
                <PinInput type='number' length={5} size='lg' />
              </Group>
              {/* <div className='code'><b>8</b></div>
        <div className='code'><b>0</b></div>
        <div className='code'><b>0</b></div>
        <div className='code' id="coo"><b></b></div>
        <div className='code'><b></b></div> */}
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
            // onClick={ResendCode}
            disabled={isResendDisabled} // Disable the button based on timer
          >
            <FaTelegramPlane className='telegram' />
            {isResendDisabled ? `Re-send Code (${timer}s)` : 'Re-send Code'}
          </Button>
        </Card>

      </div>
    </div>
  )
}

export default OtpNumber
