import { Router } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  listUsersHandler,
  updateUserHandler,
} from "./user.controller";

export const userRouter = Router();

userRouter.post("/", createUserHandler);
userRouter.get("/", listUsersHandler);
userRouter.get("/:id", getUserHandler);
userRouter.patch("/:id", updateUserHandler);
userRouter.delete("/:id", deleteUserHandler);
