import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import Player from "./player";

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center" columnGap="150px">
        {activeSong && (
          <Box padding="20px" color="white">
            <Text whiteSpace="nowrap" fontSize="lg">
              {activeSong.name}
            </Text>
            <Text whiteSpace="nowrap" fontSize="sm">
              {activeSong?.artist?.name}
            </Text>
          </Box>
        )}

        <Box padding="20px" color="white" flex="1">
          {activeSong && <Player songs={songs} activeSong={activeSong} />}
        </Box>

        <Box>Controls</Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
