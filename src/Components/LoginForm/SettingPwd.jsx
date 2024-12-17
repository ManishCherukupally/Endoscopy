import React from 'react';
import{Button,Card,Image,} from '@mantine/core';
import { useForm } from '@mantine/form';
import logo from '../../assets/Vector.jpg';
import { FaChevronLeft } from "react-icons/fa6";
import pwdlogo from '../../assets/OTP verification.jpg'
import { PasswordInput } from '@mantine/core';
import { MdLockOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import client from '../Api';

const SettingPwd = () => {
    const form = useForm({
        initialValues: { password: '',cnfpassword:'' },
        validate: {
            password: (value) => (value.length < 8? 'password must have at least 8 letters' : null),
            confirm_password: (value, values) =>
              (value !== values.password ? 'Passwords do not match' : null)
          },
      });
      const navigate = useNavigate()
      
      const PasswordChange = async (e) => {
        e.preventDefault();
      
        const validationResults = form.validate();
      
        if (Object.keys(validationResults.errors).length > 0) {
          console.log('Form validation failed', validationResults.errors);
          return;
        }
      
        console.log('Form values', form.values);
        const email = window.localStorage.getItem('email'); 
      
        if (!email) {
          console.error('Email not found in localStorage');
          return;
        }
      
        try {
          const response = await client.post('/update/', {
            password: form.values.password,
            confirm_password: form.values.confirm_password,
            email,
          }, {
            headers: { 'Content-Type': 'application/json' }
          });
      
          if (response.data && response.data.message === 'Password_updated_successfully.') {
            // alert('Password updated successfully');
            console.log('password changed');
            navigate('/account');
          } else {
            console.error('Password update failed!');
            form.setFieldError('confirm_password', 'Wrong password. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          form.setFieldError('confirm_password', 'Something went wrong. Please try again later.');
        }
      };
      
  return (
    <div className='parent'>
    <div className='child3'>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className='logo'>
            <Image maw={40}  radius="md" src={logo} alt="Random image" />
            <h2>Endoscopy</h2>
        </div>
      <div  className='arrow_for'>
            <Link to='/otpemail' style={{color:'black'}}><FaChevronLeft id='fpwd' /></Link>
            <div ><h3>Set Your Password</h3></div>
      </div>
      <div className='SETTING'>
      <Image maw={200}  radius="md" src={pwdlogo} alt="password" />
      <div className='stp'><strong>Set Your Password</strong></div>
      <div className='setpwd'>Set your password for login</div>

      </div>
      <form onSubmit={PasswordChange}>
      {/* <div className='setpassword'>Password</div> */}
        
        <PasswordInput
            placeholder="Password"
            label="Password"
            icon={<MdLockOutline style={{color:'gray'}}/>}
            // description="Password must include at least one letter, number and special character"
            size='md'
            radius='md'
            mt='xl'
            {...form.getInputProps('password')}
            withAsterisk
             />
            {/* <div className='password_cnf'>Confirm Login Password</div> */}
        
        <PasswordInput
            placeholder="Confirm Password"
            label="Confirm Password"
            icon={<MdLockOutline style={{color:'gray'}}/>}
            size='md'
            radius='md'
            mt='xl'
            {...form.getInputProps('confirm_password')}
            withAsterisk
             />
        <Button type="submit" fullWidth color='violet' radius='md' mb='xs' size='md'mt='xl'>
          Save
        </Button>
        </form>
      </Card>
    
    </div>
    </div>
  )
}

export default SettingPwd
