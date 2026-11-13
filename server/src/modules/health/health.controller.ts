import type { Request, Response } from "express";
import { prisma } from "../../config/database";

export async function healthCheck(_request: Request, response: Response): Promise<void> {
  try {
    await prisma.$queryRaw`SELECT 1`;

    response.status(200).json({
      status: "ok",
      service: "king-food-app-api",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch {
    response.status(503).json({
      status: "degraded",
      service: "king-food-app-api",
      database: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
}
