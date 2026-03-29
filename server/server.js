import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"





dotenv.config()

const app = express()


app.use(express.json())

app.use(cors({
  origin: "https://neuro-task-ai.vercel.app",
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))

app.use("/api/auth",authRoutes)
app.use("/api/tasks",taskRoutes)
app.use("/api/chat",chatRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`)
})