import React from 'react';
import { useForm } from '@mantine/form';
import {TextInput, Button,Card,Image} from '@mantine/core';
import { MdOutlineEmail } from "react-icons/md";
import logo from '../../assets/Vector.jpg';
import { FaChevronLeft } from "react-icons/fa6";



const ForgotPwd = () => {
    const form = useForm({
        initialValues: { userInput: '' },
    
      });
  return (
    <div className='parent'>
    <div className='child2'>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className='logo'>
      <Image maw={40}  radius="md" src={logo} alt="Random image" />
      <h2>Endoscopy</h2>
      </div>
      <div  className='arrow_for'>
      <FaChevronLeft id='fpwd' />
      <div ><h3>forgot password</h3></div>
      </div>
       <h2 className='contactinfo'>Enter Your Contact Info</h2>
      <form onSubmit={form.onSubmit(console.log)}>
        <div className='userpass'>
        {/* <div className='user'>Email or UserName</div> */}
        
        <TextInput
         label="Email or Username "
          placeholder=" Email or UserName" 
          {...form.getInputProps('userInput')}
          icon={<MdOutlineEmail/>}
          size='md'
          radius='md'
          style={{padding:'md'}}
         />
          
          </div>
        <Button type="submit" mt="xl" fullWidth color='gray' radius='md' mb='xs'>
          Send Code
        </Button>
      </form>
      </Card>
    {/* </Box> */}
    
    </div>
    </div>
  )
}

export default ForgotPwd
