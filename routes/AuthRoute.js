import express from "express";
import {
    Login,
    Logout,
    isMe
} from '../controllers/Auth.js';


const router = express.Router();

router.get("/me", isMe);
router.post("/login", Login);
router.delete("/logout", Logout);

export default router;