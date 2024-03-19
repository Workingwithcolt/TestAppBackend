import mongoose from "mongoose";

//basically the idea of the verification regarding to the password reset and signup 
// firstly we signup then the verification id is come to the user by any way 
//then we verify that verification id by the searching in the database

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Provide a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please Provide a email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please enter the password"]
    },
    age: {
        type: String,
    },
    address: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpire: Date
})

export const User = mongoose.model("users", userSchema);
