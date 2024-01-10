import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = () => {
    mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => console.log("connection to BDD done"))
    .catch(() => console.log("impossible to connect BDD"))


}

export default connectDB;