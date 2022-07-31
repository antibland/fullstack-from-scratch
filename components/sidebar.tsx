import NextImage from "next/image";
import NextLink from "next/link";
import {
  Box,
  List,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
  ListItem,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    href: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    href: "/search",
  },
  {
    name: "Library",
    icon: MdLibraryMusic,
    href: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    href: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    href: "/favorites",
  },
];

const playlists = Array(30)
  .fill(1)
  .map((_, i) => `Playlist ${i + 1}`);

const Sidebar = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      background="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px"></Box>
        <NextImage src="/logo.svg" height={60} width={120} />

        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map(({ name, href, icon }) => (
              <ListItem paddingX="20px" key={name} fontSize="16px">
                <LinkBox>
                  <NextLink href={href} passHref>
                    <LinkOverlay>
                      <ListIcon as={icon} color="white" marginRight="20px" />
                      {name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box marginBlock="20px">
          <List spacing={2}>
            {musicMenu.map(({ name, href, icon }) => (
              <ListItem paddingX="20px" key={name} fontSize="16px">
                <LinkBox>
                  <NextLink href={href} passHref>
                    <LinkOverlay>
                      <ListIcon as={icon} color="white" marginRight="20px" />
                      {name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider color="gray.700" />

        <Box overflowY="auto" height="60%" paddingBlock="20px">
          <List spacing={2}>
            {playlists.map((playlist) => (
              <ListItem paddingX="20px" key={playlist} fontSize="16px">
                <LinkBox>
                  <NextLink href="/" passHref>
                    <LinkOverlay>{playlist}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
