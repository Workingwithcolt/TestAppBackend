import express from "express";
import { User } from "../Models/userModal.js";
var router = express.Router();
import bcrypt from 'bcryptjs'

/* GET home page. */
router.post("/", async function (req, res) {
    console.log(req.body);
    try {
        const { username, email, password } = req.body;

        if ((username && email && password) ||
            (username !== "" && email !== "" && password !== "")) {
            const user = await User.findOne({ email, username })

            if (!user) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const newUser = new User({
                    username: username,
                    email: email,
                    password: hashedPassword
                })

                const savedUser = await newUser.save();

                return res.status(200).send({ success: true, username:username })
            } else {
                return res.status(500).send({ error: "User is Already Exist" })
            }
        } else {
            throw new Error("Something Went Wrong")
        }

    } catch (e) {
        return res.status(500).send({ error: e.message })
    }
});

export default router;
