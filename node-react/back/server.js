import express from "express" // Import with ESModule
import dotenv from "dotenv"
import connectDB from "./config/config.js";
import articleRouter from "./routes/articleRouter.js";
import cors from "cors"
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";

// const express = require("express")

const app = express(); // create application express

// take req.body // POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
dotenv.config();



connectDB();

app.use(articleRouter)
app.use(productRouter)
app.use(userRouter)

app.listen(process.env.PORT || 9000, () => {

    console.log(`execute server : ${process.env.BASE_URL}`)
})

