import React, { useRef } from 'react';
import { Card, Image, Text, SimpleGrid, Flex, Divider, Space } from '@mantine/core';
import logo1 from '../../assets/Component 13.jpg';
import logo from '../../assets/Vector.jpg';
import { format } from 'date-fns';
import html2pdf from 'html2pdf.js';

const HospitalCard = (props) => {
  const { selectedImages, remarks, medication, comments } = props;
  const selectedPatient = JSON.parse(localStorage.getItem('selectedpatient'));
  const headerSettings = JSON.parse(localStorage.getItem('headerSettings'));

  const printRef = useRef(null);

  const formatDateTime = (date) => {
    let dateString = new Date(date);
    return format(dateString, 'dd MMMM yyyy | h:mm a');
  };

  // Helper function to divide images into chunks
  const chunkImages = (images) => {
    const chunks = [];
    const firstChunkSize = 4;
    const subsequentChunkSize = 6;

    if (images.length > 0) {
      chunks.push(images.slice(0, firstChunkSize));
    }

    for (let i = firstChunkSize; i < images.length; i += subsequentChunkSize) {
      chunks.push(images.slice(i, i + subsequentChunkSize));
    }

    return chunks;
  };

  const imageChunks = chunkImages(selectedImages);

  const downloadPDF = () => {
    const element = printRef.current;
    const options = {
      margin: 0,
      filename: 'Hospital-Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf().set(options).from(element).save();
  };

  const Header = () => (
    <Card shadow="sm" padding="lg" radius="md" withBorder bg="black" mb={0}>
      <Flex align="center" gap="lg">
        <Image maw={90} radius="50%" src={logo1} alt="Hospital Logo" />
        <div>
          <Text weight={700} color="white" size="xl" mb="xs">
            {headerSettings?.hospitalname || 'THE INSTITUTE FOR SPECIAL SURGERY JOY HOSPITAL'}
          </Text>
          <Text weight={600} color="white" size="lg" mb="xs">
            {headerSettings?.hospitaladdress || '423 AB, 10 TH ROAD, CHEMBUR, MUMBAL - 71'}
          </Text>
          <Flex gap="lg">
            <Text weight={500} color="white" size="sm">
              TEL: {headerSettings?.hospitalnumber || '528 4298, 528 4281, 528 691'}
            </Text>
            {headerSettings?.hospitalemail && (
              <Text weight={500} color="white" size="sm">
                {headerSettings.hospitalemail}
              </Text>
            )}
          </Flex>
        </div>
      </Flex>
    </Card>
  );

  return (
    <div>
      <div ref={printRef}>
        {imageChunks.map((chunk, chunkIndex) => (
          <div className="chunk-class"
            key={chunkIndex}
            style={{
              width: '794px',
              height: '1123px',
              margin: '0 auto',
              padding: '1rem',
              backgroundColor: '#fff',
              pageBreakAfter: 'always',
            }}
          >
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
              <Flex direction="column" justify="space-between" style={{ height: '100%' }}>
                {/* Render Header for Each Page */}
                <Header />
                <Space h={15} />

                {/* First Page Only: Patient Details */}
                {chunkIndex === 0 && (
                  <div>
                    <Card bg="#EBEDF4" radius={12} mb="md">
                      <SimpleGrid cols={6} spacing="sm">
                        <Flex direction="column">
                          <Text fw={600}>Name</Text>
                          <Text>{selectedPatient.patient_name}</Text>
                        </Flex>
                        <Flex direction="column">
                          <Text fw={600}>Patient ID</Text>
                          <Text>{selectedPatient.id}</Text>
                        </Flex>
                        <Flex direction="column">
                          <Text fw={600}>Age</Text>
                          <Text>{selectedPatient.age}</Text>
                        </Flex>
                        <Flex direction="column">
                          <Text fw={600}>Sex</Text>
                          <Text>{selectedPatient.gender}</Text>
                        </Flex>
                        <Flex direction="column">
                          <Text fw={600}>Referred by</Text>
                          <Text>{selectedPatient.referred}</Text>
                        </Flex>
                        <Flex direction="column">
                          <Text fw={600}>Date & Time</Text>
                          <Text>{formatDateTime(selectedPatient.updated_at)}</Text>
                        </Flex>
                      </SimpleGrid>
                      <Space h={12} />
                      <SimpleGrid cols={2} spacing="sm">
                        <Flex direction="column">
                          <Text fw={600}>Phone Number</Text>
                          <Text>{selectedPatient.mobile}</Text>
                        </Flex>
                        <Flex direction="column">
                          <Text fw={600}>Email</Text>
                          <Text>{selectedPatient.patient_email}</Text>
                        </Flex>
                      </SimpleGrid>
                    </Card>

                    <SimpleGrid cols={2} spacing="lg">
                      <Card shadow="sm" padding="sm" radius="md" withBorder style={{ backgroundColor: '#EBEDF4' }} mah={170}>
                        <Text weight={600} size="md" mb="xs">
                          Remarks
                        </Text>
                        <Text size="sm">{remarks}</Text>
                      </Card>
                      <Card shadow="sm" padding="sm" radius="md" withBorder style={{ backgroundColor: '#EBEDF4' }} mah={170}>
                        <Text weight={600} size="md" mb="xs">
                          Medication
                        </Text>
                        <Text size="sm">{medication}</Text>
                      </Card>
                    </SimpleGrid>
                    <Space h={15} />
                  </div>

                )}

                {/* Images Section */}
                <div style={{ flexGrow: 1 }}>
                  <SimpleGrid
                    cols={2}
                    spacing="sm"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: chunk.length > 1 ? '1fr 1fr' : '1fr',
                      gap: '1rem',
                      alignItems: 'center',
                      justifyContent: chunk.length === 1 ? 'center' : 'space-between',
                    }}
                  >
                    {chunk.map((image, index) => {
                      // Get the actual index of the image from the selectedImages array
                      const actualIndex = selectedImages.indexOf(image) + 1;

                      return (
                        <Flex direction="column" key={actualIndex} style={{ alignItems: 'center' }}>
                          <Card shadow="sm" padding="sm" radius="md" style={{ width: '100%' }}>
                            <Card.Section h={250}>
                              <Image
                                src={image}
                                alt={`Image ${actualIndex}`}
                                style={{
                                  width: '100%',
                                  objectFit: 'cover',
                                }}
                              />
                            </Card.Section>
                          </Card>
                          <Flex>
                            {comments[actualIndex - 1] ? (
                              <Text ml={"sm"}>{comments[actualIndex - 1]}</Text>
                            ) : (
                              <Text ml={"lg"} fw={600}>
                                Image: {actualIndex}
                              </Text>
                            )}
                          </Flex>
                        </Flex>
                      );
                    })}

                  </SimpleGrid>
                </div>


                {/* Footer Section */}
                <div>
                  <Divider size="md" my="lg" mt={0} />
                  <Flex justify="space-between" align="center">
                    <Flex align="center" gap="sm">
                      <Image maw={40} radius="md" src={logo} alt="Software Logo" />
                      <div>
                        <Text weight={600} size="sm">
                          Name of Software or Company
                        </Text>
                        <Text size="xs">www.xyzsoftware.com</Text>
                      </div>
                    </Flex>
                    <Text size="sm">Consulted By ______________</Text>
                  </Flex>
                </div>
              </Flex>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalCard;