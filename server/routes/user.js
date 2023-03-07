import express from "express";
import { signup, login } from "../controllers/auth.js";
import { getAllUsers, updateProfile, follow, unfollow } from "../controllers/Users.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get("/getAllUsers", getAllUsers);

router.patch("/update/:id", auth, updateProfile);

router.put("/follow/:id", auth, follow);
router.put("/unfollow/:id", auth, unfollow);

export default router;