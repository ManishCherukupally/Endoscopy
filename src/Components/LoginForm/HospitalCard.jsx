import React, { useRef } from 'react';
import { Card, Image, Text, SimpleGrid, Flex, Divider, Space } from '@mantine/core';
import logo1 from '../../assets/Component 13.jpg';
import logo from '../../assets/Vector.jpg';
import { format } from 'date-fns';
import html2pdf from 'html2pdf.js';

const HospitalCard = (props) => {
  const { selectedImages, remarks, medication } = props;
  const selectedPatient = JSON.parse(localStorage.getItem('selectedpatient'));

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

    // Add first chunk
    if (images.length > 0) {
      chunks.push(images.slice(0, firstChunkSize));
    }

    // Add subsequent chunks
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

  return (
    <div>
      {/* <button onClick={downloadPDF} style={{ marginBottom: '1rem' }}>
        Download PDF
      </button> */}
      <div ref={printRef}>
        {imageChunks.map((chunk, chunkIndex) => (
          <div
            key={chunkIndex}
            style={{
              width: '794px',
              height: '1123px',
              margin: '0 auto',
              padding: '1rem',
              backgroundColor: '#fff',
              pageBreakAfter: 'always', // Ensures a new page for each chunk
            }}
          >
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
              <Flex direction="column" justify="space-between" style={{ height: '100%' }}>
                {/* Header Section */}
                {chunkIndex === 0 && (
                  <div>
                    <Card shadow="sm" padding="lg" radius="md" withBorder mb="md" bg="black">
                      <Flex align="center" gap="lg">
                        <Image maw={90} radius="50%" src={logo1} alt="Hospital Logo" />
                        <div>
                          <Text weight={700} color="white" size="xl" mb="xs">
                            THE INSTITUTE FOR SPECIAL SURGERY JOY HOSPITAL
                          </Text>
                          <Text weight={600} color="white" size="lg" mb="xs">
                            423 AB, 10 TH ROAD, CHEMBUR, MUMBAL - 71
                          </Text>
                          <Text weight={500} color="white" size="sm">
                            TEL: 528 4298, 528 4281, 528 691
                          </Text>
                        </div>
                      </Flex>
                    </Card>

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
                  </div>
                )}

                {/* Images Section */}
                <div style={{ marginTop: '1rem' }}>
                  <SimpleGrid cols={2} spacing="sm">
                    {chunk.map((image, index) => (
                      <Card key={index} shadow="sm" padding="sm" radius="md">
                        <Card.Section>
                          <Image
                            src={image}
                            alt={`Image ${index + 1}`}
                            style={{
                              height: '230px',
                              width: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Card.Section>
                        <Text weight={500} align="center" mt="sm">
                          Image {index + 1}
                        </Text>
                      </Card>
                    ))}
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
