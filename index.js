import createError from "http-errors";
import express from "express";
import cors from "cors";
import { connect } from './db.js'
import indexRouter from "./routes/index.js"
import userRouter from "./routes/users.js"
import signupRouter from "./routes/signup.js"
import signinRouter from "./routes/signin.js"
import paymentRouter from "./routes/paymentRoute.js"
import { mongodbMiddleware } from './MongoDB/Mongodbmiddleware.js'
import bodyParser from "body-parser";
var app = express();


app.use(bodyParser.json({limit: '500mb'}));

app.use(bodyParser.urlencoded({
    extended: false, limit: '500mb'
}));
app.use(cors({ origin: "*", }));

app.use(connect)

app.use(mongodbMiddleware)

app.use("/", indexRouter)

app.use("/signup", signupRouter)

app.use("/signin", signinRouter)

app.use("/users", userRouter)

app.use('/payments',paymentRouter)

app.listen(3000, () => {
    console.log("server is running");
})


