import { ActionIcon, Button, Card, Flex, Image, Space, Text, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/Vector.jpg';
import { FaChevronLeft } from 'react-icons/fa';
import { MdWifiTethering } from 'react-icons/md';

const WifiPage = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [wifiloader, setwifiLoader] = useState(false)
    const [connection, setConnection] = useState(false)

    return (
        <div>
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
                            {connection && <Text fz={15} fw={600} ff='inter' c={"green"}>Connected !</Text>}

                        </Flex>
                        <Space h={"1.5rem"} />
                        <Button loading={wifiloader} color='violet' fullWidth leftIcon={<MdWifiTethering size={"1rem"} />} variant='outline' onClick={() => {
                            setwifiLoader(true)
                            setTimeout(() => {
                                setwifiLoader(false)
                            }, 2000)
                        }}>Test Connection</Button>
                        <Space h={"1.5rem"} />
                        <Text fz={20} fw={500} ff={"inter"}>Enter Wifi Credentials</Text>
                        <Space h={"1rem"} />
                        <form>
                            <Flex direction={"column"} gap={"md"}>
                                <TextInput
                                    label="Enter Wifi Name"
                                    placeholder='Enter username'
                                />
                                <TextInput
                                    label="Enter Wifi Password"
                                    placeholder='Enter password'
                                />
                                <Button loading={loader} color='violet' fullWidth onClick={() => {
                                    setLoader(true)
                                    setConnection(true)
                                    setTimeout(() => {
                                        setLoader(false)
                                        setConnection(false)

                                    }, 2000)
                                }}>Submit</Button>
                            </Flex>

                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default WifiPage
