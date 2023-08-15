import express from "express";
import {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js";
import {adminOnly, verifyUser} from '../middleware/AuthUser.js'


const router = express.Router();

router.get("/users", verifyUser, adminOnly, getUser);
router.get("/users/:id", verifyUser, getUserById);
router.post("/users", createUser);
router.patch("/users/:id", verifyUser, adminOnly, updateUser);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

export default router;