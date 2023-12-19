import { Router } from "express";
import {
  ageBetween,
  deleteUser,
  getAllUsers,
  nameContainsLetterAngAgeLess,
  signin,
  signup,
  updateUser,
  userProducts,
} from "../controller/user.controller.js";

const userRouter = Router();

//===============================
//user end points
//===============================

userRouter.get("/", getAllUsers);

userRouter.get("/:id", userProducts);

userRouter.get("/nameContains", nameContainsLetterAngAgeLess);

userRouter.get("/ageBetween", ageBetween);

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

userRouter.patch("/updateUser/:id", updateUser);

userRouter.delete("/deleteUser/:id", deleteUser);

export default userRouter;
