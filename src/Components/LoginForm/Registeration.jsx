import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { PasswordInput, TextInput, Button, Card, Image, Select, Radio } from '@mantine/core';
import logo from '../../assets/Vector.jpg';
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { Group, Text, useMantineTheme, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';



const Registeration = () => {
  // const openRef = useRef<() => void>(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const form = useForm({
    initialValues: { name: '', loginName: '', email: '', password: '', cnfpassword: '', phone: '' },


  });
  const theme = useMantineTheme();
  return (
    <div className='parent'>
      <div className='child1'>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <div className='logo'>
            <Image maw={40} radius="md" src={logo} alt="Endoscopy Logo" />
            <h2>Endoscopy</h2>
          </div>
          <div>
            <h3>Create Your Account</h3>
            <div className='imglogo'>
              <div className='circle'>
                <Dropzone
                  onDrop={(files) => console.log('accepted files', files)}
                  onReject={(files) => console.log('rejected files', files)}
                  maxSize={3 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                // {...props}
                >
                  <Group position="center" spacing="xl" m={0} style={{ minHeight: rem(150), pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                      <IconUpload
                        size="3.2rem"
                        stroke={1.5}
                        className='upload'
                        color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                      />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX
                        size="3.2rem"
                        stroke={1.5}
                        color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                      />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconPhoto size="3.2rem" stroke={1.5} />
                    </Dropzone.Idle>


                  </Group>
                </Dropzone>

              </div>
            </div>
          </div>
          <form onSubmit={form.onSubmit(console.log)}>
            {/* <div className='fullname'>Your Full Name</div> */}
            <TextInput
              placeholder="Your name"
              label=" Your Full Name "
              size='md'
              radius='md'
              {...form.getInputProps('name')}
            />
            {/* <div className='special'>Speciality</div> */}
            <Select
              label="Speciality "
              placeholder="Select"
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
              size='md'
              radius='md'
              mt='md'
            />
            {/* <div className='loginname'>Login UserName</div> */}
            <TextInput
              placeholder="Login name"
              label="Login UserName "
              size='md'
              mt='md'
              radius='md'
              {...form.getInputProps('loginName')}
            />
            {/* <div className='login_password'>Login Password</div> */}

            <PasswordInput
              placeholder="Password"
              label="Password"
              icon={<MdLockOutline />}
              size='md'
              radius='md'
              mt='md'
              {...form.getInputProps('password')}
              withAsterisk
            />

            {/* <div className='login_password_cnf'>Confirm Login Password</div> */}

            <PasswordInput
              placeholder="Confirm Password"
              label="Confirm Password"
              icon={<MdLockOutline />}
              size='md'
              radius='md'
              mt='md'
              {...form.getInputProps('cnfpassword')}
              withAsterisk
            />

            {/* <div className='phone'>Mobile Number</div> */}
            <TextInput
              placeholder="Mobile Number"
              label="Mobile Number "
              type='number'
              size='md'
              radius='md'
              mt='md'
              {...form.getInputProps('phone')}
            />
            <div>
              {/* <div className='email'>Email ID</div>  */}

              <TextInput
                label="Email ID "
                placeholder=" @123abc.com"
                {...form.getInputProps('email')}
                size='md'
                radius='md'
                mt="md"
                icon={<MdOutlineEmail />}
                style={{ padding: 'md' }}
              />
            </div>
            <h4>Choose Template</h4>
            <Radio.Group
              value={form.values.template}
              onChange={(value) => form.setFieldValue('template', value)}
            >
              <div className="container">
                {['default', '1', '2', '3', '4'].map((value, index) => (
                  <div
                    key={index}
                    className="card"
                    onMouseEnter={() => setHoveredCard(value)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Radio value={value} className="radio" />
                    {hoveredCard === value && (
                      <Button className="view" radius="md">
                        View
                      </Button>
                    )}
                    <div className="values">{value === 'default' ? 'Default' : value}</div>
                  </div>
                ))}
              </div>
            </Radio.Group>


            <Button variant="filled" color="violet" mt='md' radius='md' fullWidth>
              Create Account
            </Button>
          </form>
        </Card>
        {/* </Box> */}

      </div>
    </div>
  )
}

export default Registeration
