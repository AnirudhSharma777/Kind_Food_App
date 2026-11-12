import { Router } from "express";
import { healthCheck } from "./health.controller";

export const healthRouter = Router();

healthRouter.get("/", healthCheck);
