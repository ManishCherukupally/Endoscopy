import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Card, Image } from '@mantine/core';
import { MdOutlineEmail } from "react-icons/md";
import logo from '../../assets/Vector.jpg';
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import client from '../Api';

const ForgotPwd = () => {
  const form = useForm({
    initialValues: { email: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid Email'),
    },
  });

  const navigate = useNavigate();

  const Forgotpassword = async (e) => {
    e.preventDefault();

    if (form.validate().hasErrors) {
      console.log('Form validation failed:', form.errors);
      return;
    }

    console.log('Form Values:', form.values);

    try {
      const response = await client.post('/forgot/',
        { email: form.values.email,

         },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log('API Response:', response.data);

      if (response.data?.message === "OTP_sent_successfully.") {
        const email = form.values.email;

        if (email) {
          console.log('Storing email in localStorage:', email);
          window.localStorage.setItem('email', email);
          console.log('Email stored successfully.');
          // alert('Email verified. OTP sent successfully!');
          navigate('/otpemail');
        } else {
          console.error('Email is missing. Unable to store.');
        }
      } else {
        console.error('Unexpected response. Email verification failed:', response.data);
        form.setFieldError('email', 'Email verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during email validation:', error);
      form.setFieldError('email', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="parent">
      <div className="child2">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <div className="logo">
            <Image maw={40} radius="md" src={logo} alt="Logo" />
            <h2>Endoscopy</h2>
          </div>
          <div className="arrow_for">
            <Link to='/' style={{color:'black'}}><FaChevronLeft id="fpwd" style={{cursor:'pointer'}}/></Link>
            <div>
              <h3>Forgot Password</h3>
            </div>
          </div>
          <h2 className="contactinfo">Enter Your Contact Info</h2>
          <form onSubmit={Forgotpassword}>
            <div className="userpass">
              <TextInput
                label="Email or Username"
                placeholder="Email or Username"
                {...form.getInputProps('email')}
                icon={<MdOutlineEmail style={{color:'gray'}} />}
                size="md"
                radius="md"
                style={{ padding: 'md' }}
                error={form.errors.email}
              />
            </div>
            <Button type="submit" mt="xl" fullWidth color="gray" radius="md" mb="xs">
              Send Code
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPwd;
