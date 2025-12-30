import { createPlayer } from "../controllers/player.controller";

async function testCreatePlayer() {
  console.log("🚀 Criando player...");

  const player = await createPlayer();

  console.log("✅ Player criado:");
  console.log(player);
}

testCreatePlayer()
  .catch((err) => {
    console.error("❌ Erro ao criar player:", err);
  })
  .finally(() => {
    process.exit(0);
  });
