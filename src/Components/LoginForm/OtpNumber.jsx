import React from 'react';
import {Button,Card,Image,Group,PinInput} from '@mantine/core';
import logo from '../../assets/Vector.jpg';
import { FaChevronLeft } from "react-icons/fa6";
import otp from '../../assets/image 1619.jpg';
import { FaTelegramPlane } from "react-icons/fa";

const OtpNumber = () => {
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
      <Image maw={200}  radius="md" src={otp} alt="OTP number" />
      <div className='verification'><strong>Verification Code</strong></div>
      <div className='phonenumber'>Enter the  Verification code that we've <p>sent to<b>+91356210012</b></p></div>
      <div className='otp_code'>
      <Group position="center">
      <PinInput  type='number' length={5} size='lg'/>
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
        <Button type="submit" mt="xl" fullWidth color='gray' radius='md' mb='xs' size='md'>
        <FaTelegramPlane  className='telegram'/>
        Re-send Code in
        <p className='time'>0:34</p>
        </Button>
      </Card>
    
    </div>
    </div>
  )
}

export default OtpNumber
