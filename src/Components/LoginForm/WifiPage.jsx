import { ActionIcon, Button, Card, Flex, Image, Space, Text, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from '../../assets/Vector.jpg';
import { FaChevronLeft } from 'react-icons/fa';
import { MdWifiTethering } from 'react-icons/md';
import client from '../Api';
import { useForm } from '@mantine/form';

const WifiPage = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [wifiloader, setwifiLoader] = useState(false)
    const [connection, setConnection] = useState(false)
    const [showmsg, setShowmsg] = useState(false)

    const form = useForm({
        initialValues: {
            sid: '',
            password: ''
        },
        transformValues: (values) => ({
            sid: `${values.sid}`,
            password: `${values.password}`
        })
    })


    const handleConnectWifi = () => {
        setwifiLoader(true)
        setTimeout(() => {
            setwifiLoader(false)
        }, 2000)

        client.post('/wifi_test_rpi/', form.getTransformedValues())
            .then(resp => {
                if (resp.data.message === 'connected') {
                    setShowmsg(true)
                    setConnection(true)
                    setTimeout(() => {
                        setShowmsg(false)
                        setwifiLoader(false)
                        navigate("/allpatients")
                    }, 2000)

                }
                else if (resp.data.message === 'failed to connect') {
                    setShowmsg(true)
                    setConnection(false)
                    setTimeout(() => {
                        setShowmsg(false)
                        setwifiLoader(false)
                    }, 2000)
                }

            })
            .catch((err) => console.error(err))
    }

    const testConnection = () => {
        setwifiLoader(true)
        setTimeout(() => {
            setwifiLoader(false)
        }, 2000)

        client.get('/internet_test/', {
            withCredentials: true
        })
            .then((resp => {
                if (resp.data.message === 'connected') {
                    setShowmsg(true)
                    setConnection(true)
                    setTimeout(() => {
                        setShowmsg(false)
                        setwifiLoader(false)
                    }, 2000)

                }
                else if (resp.data.message === 'disconnected') {
                    setShowmsg(true)
                    setConnection(false)
                    setTimeout(() => {
                        setShowmsg(false)
                        setwifiLoader(false)
                    }, 2000)
                }
            }))
    }

    return (
        <div>
            {/* {
                window.localStorage.getItem("loginStatus") === "user_validated" ? 
                ( */}
            <div className='parent'>
                <div className='child2'>
                    <Card shadow="sm" padding="lg" radius="md" >
                        <div className="logo">
                            <Image maw={40} radius="md" src={logo} alt="Logo" />
                            <h2>Endoscopy</h2>
                        </div>
                        <Flex justify={"space-between"} align={"center"}>
                            <Flex align="center">
                                <ActionIcon size="xl" onClick={() => navigate("/allpatients")} left={-5}>
                                    <FaChevronLeft size="1.5rem" />
                                </ActionIcon>

                                <Text fz={20} fw={600} ff='inter'>Wifi</Text>
                            </Flex>
                            {
                                showmsg ? (
                                    connection ? <Text fz={15} fw={600} ff='inter' c={"green"}>Connected !</Text> :
                                        <Text fz={15} fw={600} ff='inter' c={"red"}>Disconnected !</Text>
                                ) : (null)
                            }

                        </Flex>
                        <Space h={"1.5rem"} />
                        <Button loading={wifiloader} color='violet' fullWidth leftIcon={<MdWifiTethering size={"1rem"} />} variant='outline'
                            onClick={testConnection}>Test Connection</Button>
                        <Space h={"1.5rem"} />
                        <Text fz={20} fw={500} ff={"inter"}>Enter Wifi Credentials</Text>
                        <Space h={"1rem"} />
                        <form>
                            <Flex direction={"column"} gap={"md"}>
                                <TextInput
                                    label="Enter Wifi Name"
                                    placeholder='Enter username'
                                    {...form.getInputProps('sid')}
                                />
                                <TextInput
                                    label="Enter Wifi Password"
                                    placeholder='Enter password'
                                    {...form.getInputProps('password')}
                                />
                                <Button loading={loader} color='violet' fullWidth onClick={() => {
                                    // setLoader(true)
                                    // setConnection(true)
                                    // setTimeout(() => {
                                    //     setLoader(false)
                                    //     setConnection(false)

                                    // }, 2000)
                                    handleConnectWifi()
                                }}>Connect</Button>
                            </Flex>

                        </form>
                    </Card>
                </div>
            </div>
            {/* ) : (<Navigate to={"/"} />)
            } */}

        </div>
    )
}

export default WifiPage
