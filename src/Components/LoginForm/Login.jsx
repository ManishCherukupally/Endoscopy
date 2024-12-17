import React from 'react';
import { useForm } from '@mantine/form';
import {
  PasswordInput,
  TextInput,
  Button,
  Box,
  Card,
  Checkbox,
  Text,
  Image,
  Divider,
} from '@mantine/core';
import { MdOutlineEmail, MdLockOutline } from 'react-icons/md';
import logo from '../../assets/Vector.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import client from '../Api';

const Login = () => {
  const navigate = useNavigate();

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
  // console.log(client+'login/')
  // console.log(client.defaults.baseURL + 'login/');

  const submithandler = async (e) => {
    e.preventDefault();
    const isValid = !form.validate().hasErrors;
    if (!isValid) return;
   

    try {
      const response = await client.post('/login/',
        {
          username: form.values.username,
          password: form.values.password,
          withCredentials:true
         
        },
        {
          headers: { 'Content-Type': 'application/json' },
          
        }
      );
      console.log(response)
      console.log(response.data)
      if (response.data && response.data.status === 'user_validated') {
        // alert('Login successful');
        navigate('/allpatients');
        console.log(response.data.accessToken)
      } else if (response.data.status === 'unauthorized_user') {
        form.setFieldError('username', 'Invalid username or password');
      } else {
        console.error('Unexpected response:', response);
        form.setFieldError('username', 'Invalid credentials');
      }
    } 
    catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      form.setFieldError(
        'username',
        error.response?.data?.detail || 'Invalid username/email or password'
      );
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
                icon={<MdOutlineEmail style={{color:'gray'}} />}
              />
            </div>
            <PasswordInput
              placeholder="Password"
              label="Password"
              size="md"
              radius="md"
              mt="md"
              icon={<MdLockOutline style={{color:'gray'}}/>}
              {...form.getInputProps('password')}
              withAsterisk
            />
            <div className="check">
              <Checkbox label="Remember me" />
              <Link style={{ textDecoration: 'none' }} to="/forgot">
                <Text>Forgot Password?</Text>
              </Link>
            </div>
            <Button type="submit" mt="sm" fullWidth color="violet" radius="md">
              Login
            </Button>
            <Button variant="light" color="violet" mt="md" radius="md" fullWidth
            onClick={()=>{navigate('/register')}}>
              Create Account
              {/* <Link to="/register" style={{ textDecoration: 'none' }}>
                Create Account
              </Link> */}
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
