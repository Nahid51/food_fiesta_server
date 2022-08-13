import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModal from "../modals/user.js";

const secret = "test";

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await userModal.findOne({ email });
        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exists!" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials!" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "1h",
        });

        res.status(200).json({ result: oldUser, token });
    }

    catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const oldUser = await userModal.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await userModal.create({
            email,
            password: hashPassword,
            name: name,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, {
            expiresIn: "1h",
        });
        res.status(201).json({ result, token });
    }

    catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

export const googleSignIn = async (req, res) => {
    const { email, name, token, googleId } = req.body;

    try {
        const oldUser = await userModal.findOne({ email });
        if (oldUser) {
            const result = { _id: oldUser._id.toString(), email, name };
            return res.status(200).json({ result, token });
        }

        const result = await userModal.create({
            email,
            name,
            googleId,
        });

        res.status(200).json({ result, token });
    }

    catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

export const makeAdmin = async (req, res) => {
    const { email } = req.body;

    try {
        const filter = { email: email }
        const updateDoc = { $set: { role: "admin" } };
        const result = await userModal.updateOne(filter, updateDoc);
        res.status(200).json(result);
    }

    catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }


};