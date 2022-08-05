import { Box } from "@chakra-ui/layout";
import { Table, Thead, Td, Tr, Th, Tbody, IconButton } from "@chakra-ui/react";
import { BsPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useStoreActions } from "easy-peasy";
import { formatDate, formatTime } from "../lib/formatters";

const SongsTable = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <IconButton
          icon={<BsPlayFill fontSize="30px" />}
          colorScheme="green"
          size="lg"
          isRound
          aria-label="Play"
          onClick={() => handlePlay()}
        />
      </Box>
      <Table variant="unstyled">
        <Thead borderBottom="1px solid rgba(255, 255, 255, 0.2)">
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Date Added</Th>
            <Th>
              <AiOutlineClockCircle />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {songs.map((artist, index) => (
            <Tr
              key={artist.id}
              sx={{
                transition: "all 0.3s ease-in-out",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                cursor: "pointer",
              }}
              onClick={() => handlePlay(artist)}
            >
              <Td>{index + 1}</Td>
              <Td>{artist.name}</Td>
              <Td>{formatDate(new Date(artist.createdAt))}</Td>
              <Td>{formatTime(artist.duration)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SongsTable;
