import { PrismaClient, Song } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./songsData";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map(({ name, duration, url }) => ({
              name,
              duration,
              url,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync(10);
  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      email: "user@teset.com",
      password: bcrypt.hashSync("password", salt),
    },
  });

  const songs = await prisma.song.findMany({});
  await Promise.all(
    new Array(10).fill(0).map((_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist #${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({ id: song.id })),
          },
        },
      });
    })
  );
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
