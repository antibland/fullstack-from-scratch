import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";

const Home = ({ artists }: any) => {
  const { user, isLoading } = useMe();

  return (
    <GradientLayout
      color="red"
      subtitle="Profile"
      title={`${isLoading ? "" : `${user?.firstName} ${user?.lastName}`}`}
      description={`${
        isLoading ? "" : `${user?.playlistCount} public playlists`
      }`}
      image="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2"
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex columnGap="10px">
          {artists.map((artist) => (
            <Box width="20%" bg="gray.900" borderRadius="15px" padding="20px">
              <Box>
                <Image
                  src="http://placekitten.com/200/200"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-sm">artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  const serializedArtists = await JSON.parse(JSON.stringify(artists));
  return { props: { artists: serializedArtists } };
};

export default Home;
