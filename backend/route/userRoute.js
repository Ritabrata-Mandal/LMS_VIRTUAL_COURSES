import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser, updateProlie } from "../controller/userController.js"
import upload from "../middleware/multer.js";

const userRouter=express.Router();

userRouter.get("/getcurrentuser",isAuth,getCurrentUser);

//upload.single("photoUrl") is Multer middleware.
// It tells Multer:
// "Expect exactly one uploaded file whose form field name is photoUrl."
userRouter.post("/profile",isAuth,upload.single("photoUrl"),updateProlie);

export default userRouter;