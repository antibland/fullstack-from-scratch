import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";

import ReactHowler from "react-howler";

import { useRef, useEffect, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
  MdPlayCircleFilled,
} from "react-icons/md";

import { useStoreActions } from "easy-peasy";
import { formatTime } from "../lib/formatters";

const Player = ({ songs = [], activeSong }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [index, setIndex] = useState(
    songs.findIndex(({ id }) => id === activeSong?.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);

  useEffect(() => {
    let timerId;

    if (isPlaying && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [isPlaying, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const nextSong = () =>
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === index) {
          return nextSong();
        }
      }

      return state === songs.length - 1 ? 0 : state + 1;
    });

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0.0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          onLoad={onLoad}
          onEnd={onEnd}
          ref={soundRef}
          playing={isPlaying}
          src={activeSong?.url}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            color={shuffle ? "white" : "currentColor"}
            icon={<MdShuffle />}
            onClick={() => setShuffle((state) => !state)}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="previous track"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={() =>
              setIndex((state) => (state ? state - 1 : songs.length - 1))
            }
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="play"
            fontSize="48px"
            icon={
              isPlaying ? (
                <MdOutlinePauseCircleFilled />
              ) : (
                <MdPlayCircleFilled />
              )
            }
            onClick={() => setIsPlaying((state) => !state)}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="next track"
            fontSize="24px"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            color={repeat ? "white" : "currentColor"}
            icon={<MdOutlineRepeat />}
            onClick={() => setRepeat((state) => !state)}
          />
        </ButtonGroup>
      </Center>

      <Box color="gray.600">
        <Flex align="center" justify="center" columnGap="3">
          <Box fontSize="x-small">
            <Text>{formatTime(seek)}</Text>
          </Box>
          <Box flex="1">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration ? duration.toFixed(2) : 0}
              id="player-range"
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box>
            <Text fontSize="x-small">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
