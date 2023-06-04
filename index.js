import express from "express";
import morgan from "morgan";
import router from "./routes/userRoutes.js";
import mongoose from "mongoose";


const app=express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v2',router);

mongoose.connect('mongodb+srv://Snehal:Snehal1234@mern-todo.va7rcii.mongodb.net/AwdizData?retryWrites=true&w=majority')
.then(()=>console.log("DB Connected"))
.catch((error)=>console.log(error,"database error"))

app.listen(9010,()=>console.log("working on PORT 8000"))
