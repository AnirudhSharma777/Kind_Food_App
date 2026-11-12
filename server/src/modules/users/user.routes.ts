import { Router } from "express";
import {
  activateAccountHandler,
  deleteUserHandler,
  getUserHandler,
  listUsersHandler,
  registerUserHandler,
  resendActivationHandler,
  updateUserHandler,
} from "./user.controller";

export const userRouter = Router();

// Registration / activation flow. These must be declared before "/:id".
userRouter.post("/register", registerUserHandler);
userRouter.get("/activate", activateAccountHandler);
userRouter.post("/resend-activation", resendActivationHandler);

userRouter.get("/", listUsersHandler);
userRouter.get("/:id", getUserHandler);
userRouter.patch("/:id", updateUserHandler);
userRouter.delete("/:id", deleteUserHandler);
