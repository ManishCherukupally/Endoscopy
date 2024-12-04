import React from 'react';
import {Button,Card,Image,Group,PinInput} from '@mantine/core';
import logo from '../../assets/Vector.jpg';
import { FaChevronLeft } from "react-icons/fa6";
import otp from '../../assets/image 1619.jpg';
import { FaTelegramPlane } from "react-icons/fa";

const OtpEmail = () => {
  return (
    <div className='parent'>
    <div className='child3'>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className='logo'>
            <Image maw={40}  radius="md" src={logo} alt="Random image" />
            <h2>Endoscopy</h2>
        </div>
      <div  className='arrow_for'>
            <FaChevronLeft id='fpwd' />
            <div ><h3>OTP Verification</h3></div>
      </div>
      <div className='OTP'>
      <Image maw={200}  radius="md" src={otp} alt="OTP email" />
      <div className='verification'><strong>Verification Code</strong></div>
      <div className='phoneemail'>Enter the  Verification code that we've <p>sent to alexsmith@gmail.com</p></div>
      <div className='otp_code'>
      <Group position="center">
      <PinInput type='number' length={5} size='lg'/>
    </Group>
      </div>

      </div>

        <Button type="submit" fullWidth color='violet' radius='md' mb='xs' size='md'>
          Verify OTP
        </Button>
        <Button type="submit"  variant='light'mt="xl" fullWidth color='violet' radius='md' mb='xs' size='md' className='button'>
        <FaTelegramPlane  className='telegram'/>
        Re-send Code
        </Button>
      </Card>
    
    </div>
    </div>
  )
}

export default OtpEmail
