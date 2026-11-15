import { Router } from "express";
import {
  activateAccountHandler,
  deleteUserHandler,
  getUserHandler,
  listUsersHandler,
  registerUserHandler,
  registerUserWithRoleHandler,
  resendActivationHandler,
  updateUserHandler,
  loginUserHandler,
} from "./user.controller";
import { requireAuth, requireRole, requireSelfOrRole } from "../auth/auth.middleware";

export const userRouter = Router();

// Registration / activation flow. These must be declared before "/:id".
userRouter.post("/register", registerUserHandler);
userRouter.post("/register-with-role", requireAuth, requireRole("ADMIN", "MANAGER"), registerUserWithRoleHandler);
userRouter.post("/login", loginUserHandler);
userRouter.get("/activate", activateAccountHandler);
userRouter.post("/resend-activation", resendActivationHandler);

userRouter.get("/", requireAuth, requireRole("ADMIN"), listUsersHandler);
userRouter.get("/:id", requireAuth, getUserHandler);
userRouter.patch("/:id", requireAuth, requireRole("ADMIN"), updateUserHandler);
userRouter.delete("/:id", requireAuth, requireRole("ADMIN"), deleteUserHandler);
