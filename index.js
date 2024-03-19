import createError from "http-errors";
import express from "express";
import cors from "cors";
import { connect } from './db.js'
import indexRouter from "./routes/index.js"
import userRouter from "./routes/users.js"
import signupRouter from "./routes/signup.js"
import signinRouter from "./routes/signin.js"
import { mongodbMiddleware } from './MongoDB/Mongodbmiddleware.js'
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", }));

app.use(connect)

app.use(mongodbMiddleware)

app.use("/", indexRouter)

app.use("/signup", signupRouter)

app.use("/signin", signinRouter)

app.use("/users", userRouter)

app.listen(3000, () => {
    console.log("server is running");
})


