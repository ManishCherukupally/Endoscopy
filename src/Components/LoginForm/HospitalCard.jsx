import React from 'react';
import {Card,Image,Group,Text,Grid,Divider} from '@mantine/core';
import logo1 from '../../assets/Component 13.jpg';
import frame1 from '../../assets/Frame 1261155515.jpg'
import frame2 from '../../assets/Frame 1261155514.jpg'
import frame3 from '../../assets/Frame 1261155514 (4).jpg'
import frame4 from '../../assets/Frame 1261155514 (3).jpg'
import frame5 from '../../assets/Frame 1261155514 (2).jpg'
import frame6 from '../../assets/Frame 1261155514 (1).jpg'
import logo from '../../assets/Vector.jpg'


const HospitalCard = () => {
  return (
    <div className='parent'>
    <div className='header'>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card shadow="sm" padding="lg" radius="md" withBorder className='hospitalcard' mb='md'>
                <div className='imageflex'>
                        <div className='image' >
                        <Image maw={90}  radius="md" src={logo1} alt="Random image" />
                        </div>
                        <div>
                                <div style={{fontWeight:'bold',fontSize:'1.8rem',marginBottom:'0.5rem'}}>THE INSTITUTE FOR SPECIAL SURGERY JOY HOSPITAL</div>
                                <div style={{fontWeight:'bold',fontSize:'1.25rem',marginBottom:'0.5rem'}}>423 AB, 10 TH ROAD, CHEMBUR, MUMBAL - 71 </div>
                                <div style={{fontWeight:'bold',fontSize:'1rem'}}>TEL: 528 4298, 528 4281, 528 691</div>
                        </div>
                </div>
            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder  mb='md' style={{backgroundColor:'#EBEDF4'}}>
            <div className='hospitalpatient'>
            <div><b>Name</b><div>Cameron Williamson</div></div>
            <div><b>Patient Id</b><div>12345</div></div>
            <div><b>Age</b><div>45</div></div>
            <div><b>Sex</b><div>Male</div></div>
            <div><b>Refferd By</b><div>Self</div></div>
            <div><b>Date&Time</b><div>15 May 2020|7:00 pm</div></div>
            </div>
            <div  id='hospitalpatient'>
            <div><b>Phone Number</b><div>+91-8867452314</div></div>
            <div><b>Email</b><div>georgia.young@example.com</div></div>
            </div>
            </Card>
                <div style={{
                    width:'100%',
                    display:'flex',
                    gap:'1rem',
                    
                }}>
                <Card shadow="sm" padding="sm" radius="md" withBorder  mb='md' style={{width:'50%',backgroundColor:'#EBEDF4'}}>
                    <div style={{marginBottom:'0.5rem'}}><b>Remarks</b></div>
                    <div>Components to be entered into the standardized report include identification of procedure, timing, procedural personnel, patient demographics and history, indication(s) for procedure, comorbidities, type of bowel preparation, consent for the procedure, pre-endoscopic administration of medications</div>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder  mb='md' style={{width:'50%',backgroundColor:'#EBEDF4'}}>
                <div><b>Medication</b></div>
                <ul>
                    <li>Antacids</li>
                    <li>H2-Receptor Antagonists</li>
                    <li>eAnti-nausea</li>
                    <li>Pain Relievers</li>
                </ul>
                </Card>
                </div>

        <div style={{
                    width:'100%',
                    height:'auto',
                    display:'flex',
                    flexDirection:'row',
                    flexWrap:'wrap',
                    gap:'1rem',}}>
        <Card shadow="sm" padding="lg" radius="md" withBorder  mb='md' style={{width:'49.5%',backgroundColor:'#EBEDF4'}}>
        <Card.Section>
        <Image
          src={frame2}
          style={{
            height:'100%',
            width:'100%',
            objectFit:'fill'
          }}
          alt="Large hiatus. (Comment)"
        />
         <Text weight={500}>Large hiatus. (Comment)</Text>
      </Card.Section>
       
       </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder  mb='md' style={{width:'49%',backgroundColor:'#EBEDF4'}}>
            <Card.Section>
        <Image
          src={frame6}
          style={{
            height:'100%',
            width:'100%',
            objectFit:'fill'
          }}
          alt="Disection of right crura.  (Comment)"
        />
         <Text weight={500}>Disection of right crura.  (Comment)</Text>
      </Card.Section>
    </Card>

    <Card shadow="sm" padding="lg" radius="md" withBorder  mb='md' style={{width:'49.5%',backgroundColor:'#EBEDF4'}}>
            <Card.Section>
        <Image
          src={frame1}
          style={{
            height:'100%',
            width:'100%',
            objectFit:'fill'
          }}
          alt="Image # 3  (Comment)"
        />
         <Text weight={500}>Image # 3  (Comment)</Text>
      </Card.Section>
    </Card>

    <Card shadow="sm" padding="lg" radius="md" withBorder  mb='md' style={{width:'49%',backgroundColor:'#EBEDF4'}}>
            <Card.Section>
        <Image
          src={frame5}
          style={{
            height:'100%',
            width:'100%',
            objectFit:'fill'
          }}
          alt="Image # 4  (Comment)"
        />
         <Text weight={500}>Image # 4  (Comment)</Text>
      </Card.Section>
    </Card>


    <Card shadow="sm" padding="lg" radius="md" withBorder  mb='md' style={{width:'49.5%',backgroundColor:'#EBEDF4'}}>
            <Card.Section>
        <Image
          src={frame4}
          style={{
            height:'100%',
            width:'100%',
            objectFit:'fill'
          }}
          alt="Image # 5  (Comment)"
        />
         <Text weight={500}>Image # 5 (Comment)</Text>
      </Card.Section>
    </Card>

    <Card shadow="sm" padding="lg" radius="md" withBorder  mb='md' style={{width:'49%',backgroundColor:'#EBEDF4'}}>
            <Card.Section>
        <Image
          src={frame3}
          style={{
            height:'100%',
            width:'100%',
            objectFit:'fill'
          }}
          alt="Image # 6  (Comment)"
        />
         <Text weight={500}>Image # 6  (Comment)</Text>
      </Card.Section>
    </Card>
        </div>
        <Divider size="md" />
        <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{display:'flex',gap:'5px'}}>
                    <div>
                        <Image maw={40}  radius="md" src={logo} alt="Random image" />
                    </div>
                    <div style={{padding:'0.7rem 0'}}>
                        <div><b>Name of Sotware or Company</b></div>
                        <div>www.xyzsoftware.com</div>
                    </div>
                </div>
                <div style={{padding:'1.7rem 0'}}>Consulted By______________</div>
        </div>
        </Card>
        
    </div>
    </div>
  )
}

export default HospitalCard
