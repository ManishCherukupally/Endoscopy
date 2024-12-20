// import React, { useState } from 'react';
// import { useForm } from '@mantine/form';

// import {TextInput, Button,Card,Radio,Textarea, SimpleGrid, Flex, Space} from '@mantine/core';

// import { TextInput, Button, Card, Radio, Textarea } from '@mantine/core';

// // import logo from '../../assets/Vector.jpg';
// import { MdOutlineEmail } from "react-icons/md";
// // import { MdLockOutline } from "react-icons/md";
// import { Group, useMantineTheme, rem } from '@mantine/core';
// import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
// import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
// import { FaChevronLeft } from "react-icons/fa6";
// // import { Form } from 'react-router-dom';


// const HeaderSetting = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const form = useForm({
//     initialValues: { hospitalname: '', hospitaladdress: '', hospitalemail: '', hospitalnumber: '' },


//   });
//   const theme = useMantineTheme();
//   return (
//     <div className='parent'>
//       <div className='header'>
//         <Card shadow="sm" padding="lg" radius="md" withBorder>
//           <div className='headerset'>
//             <div className='addnewpatient'>
//               <Button variant="light" color="#EBEDF4" mt='md' mr='md' radius='md'>
//                 <FaChevronLeft className='left' />
//               </Button>
//               <div className='ADDNEW'>Header Setting</div>
//             </div>
//             <Button color="violet" mt='md'>
//               Save
//             </Button>
//           </div>

//     {/* <div className='dropzone'> */}
    
//     <Flex justify={"center"} >
//     <div className='dropzone1'>
//     <Dropzone
//       onDrop={(files) => console.log('accepted files', files)}
//       onReject={(files) => console.log('rejected files', files)}
//       maxSize={3 * 1024 ** 2}
//       accept={IMAGE_MIME_TYPE}
//       // {...props}
//     >
//       <Group position="center" spacing="xl"m={0} style={{ minHeight: rem(150), pointerEvents: 'none' }}>
//         <Dropzone.Accept>
//           <IconUpload
//             size="3.2rem"
//             stroke={1.5}
//             className='upload'
//             color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
//           />
//         </Dropzone.Accept>
//         <Dropzone.Reject>
//           <IconX
//             size="3.2rem"
//             stroke={1.5}
//             color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
//           />
//         </Dropzone.Reject>
//         <Dropzone.Idle>
//           <IconPhoto size="3.2rem" stroke={1.5} />
//         </Dropzone.Idle>
//       </Group>
//     </Dropzone>
//     </div>
//     {/* </div>/ */}
//     </Flex>

      
//         {/* <div className='hospitalform'> */}
//         <SimpleGrid cols={3} mt={'lg'}>
//       <TextInput
//         placeholder="Hospital Name"
//         label=" Hospital Name "
//         size='md'
//          radius='md'
//          {...form.getInputProps('hospitalname')}
//     />
//      <TextInput
//                 placeholder="Hospital Number"
//                 label="Hospital Number "
//                 type='number'
//                 size='md'
//                 radius='md'
//                 {...form.getInputProps('hospitalnumber')}
//             />
//                 <TextInput
//                 label=" Hospital Email "
//                 placeholder=" @123abc.com" 
//                 {...form.getInputProps('hospitalemail')}
//                 size='md'
//                 radius='md'
//                 icon={<MdOutlineEmail style={{color:'gray'}}/>}
//                 style={{padding:'md'}}

//                 />    
//                </SimpleGrid>
//             {/* </div> */}
//             <div className='hospitaladdress'>
//             <Textarea
//             placeholder="Hospital Address"
//             label="Hospital Address"
//             size='md'
//             radius='md'
//             mt='lg'
//             {...form.getInputProps('hospitaladdress')}
        
//     />
//             </div>
//           </Card>

//           <Card shadow="sm" padding="lg" radius="md" withBorder mt='lg'>
//                 <h4>Choose Template</h4>
//              <Radio.Group
//               value={form.values.template}
//               onChange={(value) => form.setFieldValue('template', value)}
//             >
//              <div className="containerhead">
//                 {['default', '1', '2', '3', '4','5','6','7','8','9'].map((value, index) => (
//                   <div
//                     key={index}
//                     className="cardhead"
//                     onMouseEnter={() => setHoveredCard(value)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                   >
//                     <Radio value={value} className="radio" />
//                     {hoveredCard === value && (
//                       <Button className="view" radius="md">
//                         View
//                       </Button>
//                     )}
//                     <div className="values">{value === 'default' ? 'Default' : value}</div>


//           {/* <div className='headercard'>
//             <form onSubmit={form.onSubmit(console.log)}>
//               <Card shadow="sm" padding="lg" radius="md" withBorder>
//                 <h3>Report Printed on Preprinted Sheet? </h3>
//                 <div>
//                   <div>  <Radio
//                     label="Yes"
//                     value="yes"
//                     // checked={form.values.gender === 'male'}
//                     // onChange={() => form.setFieldValue('gender', 'male')} 
//                     className='yes'
//                   /></div>
//                   <Radio
//                     label="No"
//                     value="no"
//                     // checked={form.values.gender === 'female'}
//                     // onChange={() => form.setFieldValue('gender', 'female')}
//                     className='no'
//                   />
//                 </div> */}
//                 {/* <div className='dropzone'>
//                   <div className='dropzone1'>
//                     <Dropzone
//                       onDrop={(files) => console.log('accepted files', files)}
//                       onReject={(files) => console.log('rejected files', files)}
//                       maxSize={3 * 1024 ** 2}
//                       accept={IMAGE_MIME_TYPE}
//                       radius={"50%"}
//                     // {...props}
//                     >
//                       <Group position="center" spacing="xl" m={0} style={{ minHeight: rem(180), pointerEvents: 'none' }}>
//                         <Dropzone.Accept >
//                           <IconUpload
//                             size="3.2rem"
//                             stroke={1.5}
//                             className='upload'
//                             color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
//                           />
//                         </Dropzone.Accept>
//                         <Dropzone.Reject>
//                           <IconX
//                             size="3.2rem"
//                             stroke={1.5}
//                             color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
//                           />
//                         </Dropzone.Reject>
//                         <Dropzone.Idle>
//                           <IconPhoto size="3.2rem" stroke={1.5} />
//                         </Dropzone.Idle>
//                       </Group>
//                     </Dropzone>

//                   </div>
//                 </div>
//  */}


//                 {/* <div className='hospitalform'>
//                   <TextInput
//                     placeholder="Hospital Name"
//                     label=" Hospital Name "
//                     size='md'
//                     radius='md'
//                     {...form.getInputProps('hospitalname')}
//                   />
//                   <TextInput
//                     placeholder="Hospital Number"
//                     label="Hospital Number "
//                     type='number'
//                     size='md'
//                     radius='md'
//                     {...form.getInputProps('hospitalnumber')}
//                   />
//                   <TextInput
//                     label=" Hospital Email "
//                     placeholder=" @123abc.com"
//                     {...form.getInputProps('hospitalemail')}
//                     size='md'
//                     radius='md'
//                     icon={<MdOutlineEmail />}
//                     style={{ padding: 'md' }}

//                   />

//                 </div>
//                 <div className='hospitaladdress'>
//                   <Textarea
//                     placeholder="Hospital Address"
//                     label="Hospital Address"
//                     size='md'
//                     radius='md'
//                     mt='lg'
//                     {...form.getInputProps('hospitaladdress')}

//                   />
//                 </div>
//               </Card> */}
// {/* 
//               <Card shadow="sm" padding="lg" radius="md" withBorder mt='lg'>
//                 <h4>Choose Template</h4>
//                 <Radio.Group
//                   value={form.values.template}
//                   onChange={(value) => form.setFieldValue('template', value)}
//                 >
//                   <div className="containerhead">
//                     {['default', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((value, index) => (
//                       <div
//                         key={index}
//                         className="cardhead"
//                         onMouseEnter={() => setHoveredCard(value)}
//                         onMouseLeave={() => setHoveredCard(null)}
//                       >
//                         <Radio value={value} className="radio" />
//                         {hoveredCard === value && (
//                           <Button className="view" radius="md">
//                             View
//                           </Button>
//                         )}
//                         <div className="values">{value === 'default' ? 'Default' : value}</div> */}
//                       </div>
//                     ))}
//                   </div>
//                 </Radio.Group>
//               </Card> 


//             </form>
//           </div>
//         </Card>

//       </div>
//     </div>
//   )
// }

// export default HeaderSetting


import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Card, Radio, Textarea, SimpleGrid, Flex, Group, useMantineTheme, rem } from '@mantine/core';
import { MdOutlineEmail } from "react-icons/md";
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FaChevronLeft } from "react-icons/fa6";

const HeaderSetting = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const form = useForm({
    initialValues: { hospitalname: '', hospitaladdress: '', hospitalemail: '', hospitalnumber: '' },
  });
  const theme = useMantineTheme();

  return (
    <div className="parent">
      <div className="header">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <div className="headerset">
            <div className="addnewpatient">
              <Button variant="light" color="#EBEDF4" mt="md" mr="md" radius="md">
                <FaChevronLeft className="left" />
              </Button>
              <div className="ADDNEW">Header Setting</div>
            </div>
            <Button color="violet" mt="md">Save</Button>
          </div>

          <Flex justify={"center"}>
            <div className="dropzone1">
              <Dropzone
                onDrop={(files) => console.log('accepted files', files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                <Group position="center" spacing="xl" m={0} style={{ minHeight: rem(150), pointerEvents: 'none' }}>
                  <Dropzone.Accept>
                    <IconUpload
                      size="3.2rem"
                      stroke={1.5}
                      className="upload"
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
          </Flex>

          <SimpleGrid cols={3} mt="lg">
            <TextInput
              placeholder="Hospital Name"
              label="Hospital Name"
              size="md"
              radius="md"
              {...form.getInputProps('hospitalname')}
            />
            <TextInput
              placeholder="Hospital Number"
              label="Hospital Number"
              type="number"
              size="md"
              radius="md"
              {...form.getInputProps('hospitalnumber')}
            />
            <TextInput
              label="Hospital Email"
              placeholder="@123abc.com"
              size="md"
              radius="md"
              icon={<MdOutlineEmail style={{ color: 'gray' }} />}
              {...form.getInputProps('hospitalemail')}
            />
          </SimpleGrid>

          <div className="hospitaladdress">
            <Textarea
              placeholder="Hospital Address"
              label="Hospital Address"
              size="md"
              radius="md"
              mt="lg"
              {...form.getInputProps('hospitaladdress')}
            />
          </div>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder mt="lg">
          <h4>Choose Template</h4>
          <Radio.Group
            value={form.values.template}
            onChange={(value) => form.setFieldValue('template', value)}
          >
            <div className="containerhead">
              {['default', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((value, index) => (
                <div
                  key={index}
                  className="cardhead"
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
        </Card>
      </div>
    </div>
  );
};

export default HeaderSetting;
