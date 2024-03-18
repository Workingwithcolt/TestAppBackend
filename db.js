import mongoose from "mongoose";

//the exclamentry icon that indicate the it is always present

export async function connect(req,res,next) {
    try {
        mongoose.connect('mongodb+srv://youtube:Satara123@cluster0.4trpa0d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("mongodb is successfullty connected ");

        })
        connection.on('error', (err) => {
            console.log("MongoDb connection error.please make sure mongodb is running." + err);
            process.exit();
        })
    } catch (e) {
        console.log("Something went Wrong!!");
        console.log(e);
        next(e)
    }
    next()
}