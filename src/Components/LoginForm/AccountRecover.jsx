import React from 'react';
import logo from '../../assets/Vector.jpg';
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import{Button,Card,Image,} from '@mantine/core';
import success from '../../assets/OTP verification (1).jpg'
import { Link, useNavigate } from 'react-router-dom';


const AccountRecover = () => {
const navigate=useNavigate()
  const Home = ()=>{
    navigate('/')
  }
  
  return (
    <div className='parent'>
    <div className='last'>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className='logo'>
            <Image maw={40}  radius="md" src={logo} alt="Random image" />
            <h2 id='endo'>Endoscopy</h2>
        </div>
      <div  className='success'>
            <Link to='/settingpwd' style={{color:'black'}}><FaChevronLeft id='fpwd' /></Link>
            <div ><h3>Account successfully recovered!</h3></div>
      </div>
      <div className='SETTINGS'>
      <Image maw={100}  radius="md" src={success} alt="success" />
      <div className='acc'><strong>Account Recoverd</strong></div>
      <div className='acc_suc' style={{fontSize:'1.5rem'}}><strong>Successfully!</strong></div>

      </div>
      
        <Button type="submit" fullWidth color='violet' radius='md' mb='xs' size='md'mt={'3rem'}
        onClick={Home}>
          Go To Home <FaChevronRight className='righticon'/>
        </Button>
    
      </Card>
    
    </div>
    </div>
  )
}

export default AccountRecover
