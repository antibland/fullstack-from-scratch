import GradientLayout from "../../components/gradientLayout";
import SongsTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const getBgColor = (id) => {
  const colors = ["red", "blue", "green", "yellow", "orange", "teal", "yellow"];
  return colors[id - 1 || Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
  return (
    <GradientLayout
      color={getBgColor(playlist.id)}
      subtitle="Playlist"
      title={playlist.name}
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirec: {
        permanent: false,
        path: "/signin",
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  const serializedPlaylist = await JSON.parse(JSON.stringify(playlist));

  return {
    props: {
      playlist: serializedPlaylist,
    },
  };
};

export default Playlist;
