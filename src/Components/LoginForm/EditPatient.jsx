import { Button, Card, NumberInput, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import client from '../Api'

const EditPatient = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);

    const [editPatient, setEditPatient] = useState([])
    useEffect(() => {
        const selectedPatient = JSON.parse(localStorage.getItem("selectedpatient"));
        setEditPatient(selectedPatient)
    }, [])

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
            referred: ''
        },
        transformValues: (values) => ({
            patient_id: editPatient.id,
            patient_name: `${values.patient_name}`,
            age: values.age,
            gender: `${values.gender}`,
            procedure: `${values.procedure}`,
            mobile: `${values.mobile}`,
            patient_email: `${values.patient_email}`,
            referred: `${values.referred}`
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
            referred: editPatient.referred
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
        if (value.length <= 10) {
            form.setFieldValue('mobile', value);
        }
    };
    return (
        <div>
            <div className='parent'>
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

                            <Select
                                label="Procedure"
                                placeholder='Select (e.g., "Upper gastrointestinal endoscopy")'
                                data={[
                                    { value: 'lazer', label: 'Lazer' },
                                    { value: 'pipe', label: 'Pipe' },
                                    { value: 'other', label: 'Other' },
                                ]}
                                size='md'
                                radius='md'
                                mt='md'
                                {...form.getInputProps('procedure')}
                            />

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
            </div>
        </div>
    )
}

export default EditPatient
