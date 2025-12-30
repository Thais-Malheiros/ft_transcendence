import { prisma } from "../prisma";

export async function createPlayer() {
  const player = await prisma.player.create({
    data: {
      nickname: "thais42",
    },
  });

  return player;
}
