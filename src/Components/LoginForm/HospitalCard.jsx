import React from 'react';
import { Card, Image, Group, Text, SimpleGrid, Flex, Divider, Space } from '@mantine/core';
import logo1 from '../../assets/Component 13.jpg';
import logo from '../../assets/Vector.jpg';
import { format } from 'date-fns';

const HospitalCard = (props) => {
  const { selectedImages, remarks, medication } = props;
  const selectedPatient = JSON.parse(localStorage.getItem('selectedpatient'));

  const formatDateTime = (date) => {
    let dateString = new Date(date);
    return format(dateString, 'dd MMMM yyyy | h:mm a');
  };

  // Helper function to chunk array into pages of 4 images each
  const chunkImages = (images, size) => {
    const chunks = [];
    for (let i = 0; i < images.length; i += size) {
      chunks.push(images.slice(i, i + size));
    }
    return chunks;
  };

  const imageChunks = chunkImages(selectedImages, 4);

  return (
    <div>
      {imageChunks.map((imageChunk, pageIndex) => (
        <div
          key={pageIndex}
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
              <div>
                {pageIndex === 0 && (
                  <>
                    {/* Header Section */}
                    <Card shadow="sm" padding="lg" radius="md" withBorder mb="md" bg={"black"}>
                      <Flex align="center" gap={"lg"}>
                        <Image
                          maw={90}
                          radius="50%"
                          src={
                            "https://s3-alpha-sig.figma.com/img/1087/db42/59fd3e813c356ab560ab3cbd12d1a8f0?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j9ijLZIS3XShvn7cFuNabypT9v67QCLgr2k~vJSQrT6FgoqBExk2um0Q4oO8HJoMpQ8Q3X0wmQVl0LjmFpWSxOtsBJneRXMJ5jqwU42QmQ-pZFsrzIjaPh2E3~8LiBVhtFfg94Aju9QRgtd59bRGyGMQjcd9kE9nYhmfD9uDYzpaqzbjwzra2ZvzxHdNO-YY26xUsfRtv08cqgKfd4wEVG4-Ghe-J7lOeYvwAllpH34KydKxkZAg9zVp7ak0IWRE~5U5RgUF0rS2Rl9-3B5wHxlrPleEC4G2uzZHX9fW2J6DLgvPMQhxLclwCGKh8FmXsphOW6i3os3~1dFW4KC~EQ__"
                          }
                          alt="Hospital Logo"
                        />
                        <div>
                          <Text weight={700} c={"white"} size="xl" mb="xs">
                            THE INSTITUTE FOR SPECIAL SURGERY JOY HOSPITAL
                          </Text>
                          <Text weight={600} c={"white"} size="lg" mb="xs">
                            423 AB, 10 TH ROAD, CHEMBUR, MUMBAL - 71
                          </Text>
                          <Text weight={500} c={"white"} size="sm">
                            TEL: 528 4298, 528 4281, 528 691
                          </Text>
                        </div>
                      </Flex>
                    </Card>

                    {/* Patient Information */}
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

                    {/* Remarks and Medication */}
                    <SimpleGrid cols={2} spacing="lg">
                      <Card
                        shadow="sm"
                        padding="sm"
                        radius="md"
                        withBorder
                        style={{ backgroundColor: '#EBEDF4' }}
                      >
                        <Text weight={600} size="md" mb="xs">
                          Remarks
                        </Text>
                        <Text size="sm">{remarks}</Text>
                      </Card>
                      <Card
                        shadow="sm"
                        padding="sm"
                        radius="md"
                        withBorder
                        style={{ backgroundColor: '#EBEDF4' }}
                      >
                        <Text weight={600} size="md" mb="xs">
                          Medication
                        </Text>
                        <Text size="sm">{medication}</Text>
                      </Card>
                    </SimpleGrid>
                  </>
                )}

                {/* Images Section */}
                <div style={{ marginTop: '1rem' }}>
                  <SimpleGrid cols={2} spacing="sm">
                    {imageChunk.map((image, index) => (
                      <Card key={index} shadow="sm" padding="sm" radius="md" >
                        <Card.Section>
                          <Image
                            src={image}
                            alt={`Image ${index + 1}`}
                            style={{
                              height: '200px',
                              width: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Card.Section>
                        <Text weight={500} align="center" mt="sm">
                          Image {index + 1 + pageIndex * 4}
                        </Text>
                      </Card>
                    ))}
                  </SimpleGrid>
                </div>
              </div>
              <div>
                {/* Footer Section */}
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
  );
};

export default HospitalCard;
