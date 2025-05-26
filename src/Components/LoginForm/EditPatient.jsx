import { Button, Card, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { Navigate, useNavigate } from 'react-router-dom'
import client from '../Api'

const EditPatient = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);

    // const [editPatient, setEditPatient] = useState([])
    // useEffect(() => {
    //     const selectedPatient = JSON.parse(localStorage.getItem("selectedpatient"));
    //     setEditPatient(selectedPatient)
    // }, [])

    const editPatient = JSON.parse(localStorage.getItem("selectedpatient"));
    console.log(editPatient);

    // const editPatient = {
    //     id: 9,
    //     patient_name: "neha1",
    //     age: 20,
    //     gender: "female",
    //     procedure: "lazer",
    //     mobile: "9786543210",
    //     patient_email: "setavakavya2000@gmail.com",
    //     referred: "self",
    //     updated_at: "2024-12-17T15:20:34.917306Z"
    // }

    const form = useForm({
        initialValues: {
            patient_id: null,
            patient_name: '',
            age: null,
            gender: '',
            procedure: '',
            mobile: '',
            patient_email: '',
            referred: '',
            // address: ''
        },
        validate: {
            patient_name: (value) => (value.length < 3 ? 'First name must be at least 3 characters' : null),
            age: (value) => (value && value > 0 ? null : 'Enter a valid age'),
            patient_email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid Email'),
            mobile: (value) => (value && value.length === 10 ? null : 'Phone number must be a valid 10-digit number'),
            referred: (value) => (value.trim().length === 0 ? 'Enter referred name' : null),
            gender: (value) => (value.trim().length === 0 ? 'Select gender' : null),
            procedure: (value) => (value.trim().length === 0 ? 'Select procedure' : null),
            // address: (value) => (value.length === 0 ? "Please enter patients's address" : null)

        },

        transformValues: (values) => ({
            patient_id: editPatient.id,
            patient_name: `${values.patient_name}`,
            age: values.age,
            gender: `${values.gender}`,
            procedure: `${values.procedure}`,
            mobile: `${values.mobile}`,
            patient_email: `${values.patient_email}`,
            referred: `${values.referred}`,
            // address: `${values.address}`,
        })
    })

    useEffect(() => {
        form.setValues({
            patient_id: editPatient.id,
            patient_name: editPatient.patient_name,
            age: editPatient.age,
            gender: editPatient.gender,
            procedure: editPatient.procedure,
            mobile: editPatient.mobile,
            patient_email: editPatient.patient_email,
            referred: editPatient.referred,
            // address: editPatient.address
        })
    }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        await client.put('/patient_details_update/', form.getTransformedValues(), {
            withCredentials: true
        }).then(resp => {
            if (resp.data.status === 'success' && resp.data.message === "Patient details updated successfully.") {
                setLoader(false)
                navigate("/allpatients")
            }
        })
            .catch(err => console.error(err))

        setTimeout(() => {
            setLoader(false)
        }, 2000)
    }

    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (value.length === 1 && !/^[6-9]$/.test(value)) {
            return; // Do not update state
        }
        if (value.length <= 10) {
            form.setFieldValue('mobile', value);
        }
    };
    return (
        <div>
            {

                window.localStorage.getItem("loginStatus") === "user_validated" ? (<div className='parent'>
                    <div className='child2' style={{ marginTop: 0 }}>
                        <Card shadow="sm" padding="lg" radius="md" className='patientcard'>
                            <div className='addnewpatient'>
                                <Button variant="light" color="gray" mt='md' mr='md' radius='md' onClick={() => navigate(-1)}>
                                    <FaChevronLeft className='left' />
                                </Button>
                                <div className='ADDNEW'>Edit Patient</div>
                            </div>

                            <form>
                                <TextInput
                                    placeholder="Patient Name"
                                    label="Enter Patient Name"
                                    size='md'
                                    radius='md'
                                    {...form.getInputProps('patient_name')}

                                />

                                <TextInput
                                    placeholder="Patient Age"
                                    label="Age"
                                    size='md'
                                    {...form.getInputProps('age')}
                                />

                                <Select
                                    label="Sex"
                                    placeholder="Select"
                                    data={[
                                        { value: 'male', label: 'Male' },
                                        { value: 'female', label: 'Female' },
                                        { value: 'others', label: 'Others' },
                                    ]}
                                    size='md'
                                    radius='md'
                                    mt='md'
                                    {...form.getInputProps('gender')}
                                />


                                <Textarea label='Address'
                                    radius='md'
                                    mt='md'
                                    placeholder='Enter Address'
                                    {...form.getInputProps('procedure')}
                                />
                                {/* <Select
                                    label="Procedure"
                                    placeholder='Select Procedure'
                                    data={[
                                        { value: 'lazer', label: 'Lazer' },
                                        { value: 'pipe', label: 'Pipe' },
                                        { value: 'other', label: 'Other' },
                                    ]}
                                    size='md'
                                    radius='md'
                                    mt='md'
                                    {...form.getInputProps('procedure')}
                                /> */}

                                <TextInput
                                    placeholder="Patient Mobile Number"
                                    label="Patient Mobile Number"
                                    type='number'
                                    size="md"
                                    radius="md"
                                    mt="md"
                                    {...form.getInputProps('mobile')}
                                    onChange={handleMobileChange}

                                />

                                <TextInput
                                    placeholder="Patient Email"
                                    label="Patient Email"
                                    size='md'
                                    radius='md'
                                    mt="md"
                                    icon={<MdOutlineEmail style={{ color: 'gray' }} />}
                                    {...form.getInputProps('patient_email')}
                                />

                                <TextInput
                                    placeholder="Referred By"
                                    label="Referred By"
                                    size='md'
                                    radius='md'
                                    mt='md'
                                    {...form.getInputProps('referred')}
                                />

                                <Button loading={loader} onClick={handleFormSubmit} variant="filled" color="violet" mt='md' radius='md' fullWidth type='submit'>
                                    Edit Patient
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>) : (<Navigate to={"/"} />)

            }

        </div>
    )
}

export default EditPatient
