import { ActionIcon, Button, Card, Flex, Image, Select, Space, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
import { MdOutlineEmail } from 'react-icons/md';
import logo from '../../assets/Vector.jpg';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import client from '../Api';


const EditUser = () => {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userMobile, setUserMobile] = useState('')
    const [userSpeciality, setUserSpeciality] = useState('')


    // const[userData, setUserData] = useState({})

    const userData = JSON.parse(window.localStorage.getItem('userData'))

    // const userData = {
    //     user_id: 23,
    //     username: "pooja",
    //     email: "pooja12345678@gmail.com",
    //     mobile_no: "999999999",
    //     Speciality: "react"
    // }

    const form = useForm({
        initialValues: {
            user_id: '',
            username: '',
            email: '',
            // password: '',
            // cnfpassword: '',
            mobile_no: '',
            Speciality: '',
            // template: '',
        },
        transformValues: (values) => (
            {
                user_id: userData.user_id,
                username: `${values.username}`,
                email: `${values.email}`,
                // password: (value) => (value.length < 8 ? 'Password must be at least 8 characters' : null),
                // cnfpassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
                mobile_no: `${values.mobile_no}`,
                Speciality: `${values.Speciality}`

            }
        )
    });

    useEffect(() => {
        form.setValues({
            // user_id: userData.user_id,
            username: userData.username,
            email: userData.email,
            // password: (value) => (value.length < 8 ? 'Password must be at least 8 characters' : null),
            // cnfpassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
            mobile_no: userData.mobile_no,
            Speciality: userData.Speciality,
        })
    }, [])

    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (value.length <= 10) {
            form.setFieldValue('mobile_no', value);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setLoader(true);

        await client.put("/user_details_update/", form.getTransformedValues(), {
            withCredentials: true
        }).then(resp => {
            if (resp.data.status === 'success' && resp.data.message === "User details updated successfully.") {
                setLoader(false)
                navigate("/allpatients")
            }
        })
            .catch(err => console.error(err))

        setTimeout(() => {
            setLoader(false)
        }, 2000)

    }
    return (
        <div>
            <div className="parent">
                <div className="child1">
                    <Card shadow="sm" padding="lg" radius="md" >
                        <div className="logo">
                            <Image maw={40} radius="md" src={logo} alt="Endoscopy Logo" />
                            <h2>Endoscopy</h2>
                        </div>
                        <Flex align="center">
                            <ActionIcon size="xl" onClick={() => navigate("/allpatients")} left={-5}>
                                <FaChevronLeft size="1rem" />
                            </ActionIcon>
                            <Text fz={20} fw={500} ff='inter'>Edit Profile</Text>
                        </Flex>
                        <Space h="1rem" />
                        <form >
                            {/* <TextInput
                                label="User Id"
                                placeholder="Enter user Id"
                                size="md"
                                radius="md"
                                {...form.getInputProps('user_id')}
                            /> */}
                            <TextInput
                                label="Login UserName"
                                placeholder="Enter your username"
                                size="md"
                                mt="md"
                                radius="md"
                                {...form.getInputProps('username')}
                            />

                            {/* <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        icon={<MdLockOutline />}
                        size="md"
                        radius="md"
                        mt="md"
                        {...form.getInputProps('password')}
                      />
                      <PasswordInput
                        label="Confirm Password"
                        placeholder="Re-enter your password"
                        icon={<MdLockOutline />}
                        size="md"
                        radius="md"
                        mt="md"
                        {...form.getInputProps('cnfpassword')}
                      /> */}
                            <TextInput
                                label="Mobile Number"
                                placeholder="Enter your mobile number"
                                type="text"
                                size="md"
                                radius="md"
                                mt="md"
                                {...form.getInputProps('mobile_no')}
                                onChange={handleMobileChange}
                            />
                            <TextInput
                                label="Email ID"
                                placeholder="Enter your email"
                                icon={<MdOutlineEmail style={{ color: 'gray' }} />}
                                size="md"
                                radius="md"
                                mt="md"
                                {...form.getInputProps('email')}
                            />

                            <Select
                                label="Speciality"
                                placeholder="Select speciality"
                                data={[
                                    { value: 'react', label: 'React' },
                                    { value: 'angular', label: 'Angular' },
                                    { value: 'vue', label: 'Vue' },
                                    { value: 'svelte', label: 'Svelte' },
                                ]}
                                size="md"
                                radius="md"
                                mt="md"
                                {...form.getInputProps('Speciality')}
                            />
                            <Space h={20} />
                            <Button loading={loader} fullWidth color="violet" onClick={handleFormSubmit}>Edit</Button>
                        </form>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default EditUser
