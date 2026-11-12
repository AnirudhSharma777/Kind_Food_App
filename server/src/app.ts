import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { healthRouter } from "./modules/health/health.routes";
import { userRouter } from "./modules/users/user.routes";

export const app = express();

app.disable("x-powered-by");
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_request, response) => {
  response.json({ service: "king-food-app-api", status: "ok" });
});

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/users", userRouter);

app.use((_request, response) => {
  response.status(404).json({ error: "Route not found" });
});
