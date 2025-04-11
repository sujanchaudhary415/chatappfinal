import express from "express";
import { body } from "express-validator";
import { checkAuth, getUsersList, login, logout, register } from "./../controllers/user.controller.js";
import { protectRoute } from "../middleware/user.middleware.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  body("email").isString().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("name").isString().withMessage("Please enter a valid name"),
  register
);

userRouter.post(
  "/login",
  body("email").isString().withMessage("Please enter a valid email"),
  body("password").isString().withMessage("Password is required"),
  login
);

userRouter.get("/checkAuth",protectRoute,checkAuth);
userRouter.post("/logout",logout);
userRouter.get("/getuserslist",getUsersList);

export default userRouter;
