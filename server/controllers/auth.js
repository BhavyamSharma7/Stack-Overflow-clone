import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import users from "../models/auth.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(404).json({message: "User with the details already exist!!"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await users.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.status(200).json({ result: newUser, token });
    } catch (err) {
        console.log(err);
        res.status(500).json("Something went wrong!!");
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({message: "No User exists with the given credentials!!!"});
        }

        const isPassCrt = await bcrypt.compare(password, existingUser.password);
        if (!isPassCrt) {
            return res.status(400).json({message: "Invalid credentials!!!"});
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        console.log(err);
        res.status(500).json("Something went wrong!!");
    }
}