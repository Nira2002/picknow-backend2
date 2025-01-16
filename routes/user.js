import express from "express";
import {loginUser, myProfile, registerUser, verifyUser, updateUser, changePassword } from "../controllers/usercontroll.js";  // Correct path
import { isAuth } from "../middelware/isAuth.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/profile", isAuth, myProfile);
router.put("/user/update", isAuth, updateUser);
router.put("/user/change-password", isAuth, changePassword);


export default router;
