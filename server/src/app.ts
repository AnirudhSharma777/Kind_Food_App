import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { healthRouter } from "./modules/health/health.routes";
import { userRouter } from "./modules/users/user.routes";

export const app = express();

app.disable("x-powered-by");
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/users", userRouter);

if (env.clientBuildDir) {
  // Production image: serve the compiled React app from the same origin as the API,
  // so the frontend can call "/api/v1" without a per-environment build.
  const clientBuildDir = env.clientBuildDir;
  app.use(express.static(clientBuildDir, { index: false, maxAge: "1h" }));

  // SPA fallback: any non-API GET returns index.html and React Router takes over.
  app.use((request, response, next) => {
    if (request.method !== "GET" || request.path.startsWith("/api/")) {
      next();
      return;
    }
    response.sendFile("index.html", { root: clientBuildDir, maxAge: 0 });
  });
} else {
  app.get("/", (_request, response) => {
    response.json({ service: "king-food-app-api", status: "ok" });
  });
}

app.use((_request, response) => {
  response.status(404).json({ error: "Route not found" });
});
