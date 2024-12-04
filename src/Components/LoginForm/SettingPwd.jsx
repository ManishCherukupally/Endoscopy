import React from 'react';
import{Button,Card,Image,} from '@mantine/core';
import { useForm ,matchesField} from '@mantine/form';
import logo from '../../assets/Vector.jpg';
import { FaChevronLeft } from "react-icons/fa6";
import pwdlogo from '../../assets/OTP verification.jpg'
import { PasswordInput } from '@mantine/core';
import { MdLockOutline } from "react-icons/md";

const SettingPwd = () => {
    const form = useForm({
        initialValues: { password: '',cnfpassword:'' },
        validate: {
            password: (value) => (value.length < 8 && value === value? 'password must have at least 8 letters' : null),
            cfnpassword: matchesField('password', 'Passwords are not the same'),
          },
    
      });
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
            <div ><h3>Set Your Password</h3></div>
      </div>
      <div className='SETTING'>
      <Image maw={200}  radius="md" src={pwdlogo} alt="password" />
      <div className='stp'><strong>Set Your Password</strong></div>
      <div className='setpwd'>Set your password for login</div>

      </div>
      <form onSubmit={form.onSubmit(console.log)}>
      {/* <div className='setpassword'>Password</div> */}
        
        <PasswordInput
            placeholder="Password"
            label="Password"
            icon={<MdLockOutline/>}
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
            icon={<MdLockOutline/>}
            size='md'
            radius='md'
            mt='xl'
            {...form.getInputProps('cnfpassword')}
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
