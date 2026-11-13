import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./config/database";

async function start(): Promise<void> {
  await prisma.$connect();

  const server = app.listen(env.port, () => {
    console.log(`KingFoodApp API listening on port ${env.port}`);
  });

  const shutdown = async (signal: string): Promise<void> => {
    console.log(`${signal} received, shutting down`);
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  };

  process.once("SIGINT", () => void shutdown("SIGINT"));
  process.once("SIGTERM", () => void shutdown("SIGTERM"));
}

start().catch(async (error: unknown) => {
  console.error("Unable to start KingFoodApp API", error);
  await prisma.$disconnect();
  process.exit(1);
});
