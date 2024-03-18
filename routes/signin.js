import express from "express";
import { User } from "../Models/userModal.js";
var router = express.Router();
import bcrypt from 'bcryptjs'

/* GET home page. */
router.post("/", async function (req, res) {
    try {
        const { email, password } = req.body;

        if ((email && password) || (email !== "" && password !== "")) {
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).send({ error: "User does not Exist !!" })
            }

            const validatePassword = await bcrypt.compare(password, user.password);

            if (!validatePassword) {
                return res.status(500).send({ error: "Password is Invalid" })
            }

            //create the token data
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            }

            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1h' });

            res.cookie("token", token);

            res.status(200).send({
                message: "Login successfully",
                success: true
            })

        } else {
            throw new Error("Something is Missing ")
        }

    } catch (e) {
        return res.status(500).send({ error: e.message })
    }
});

export default router;
