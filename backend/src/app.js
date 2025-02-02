import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';



const app = express();

app.use(
    cors({
      origin: "http://localhost:5173", // Change this to your frontend URL
      credentials: true, // Allow cookies to be sent
      methods: ["GET", "POST", "PUT", "DELETE"], // Allow required methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
    })
  );


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))
app.use(cookieParser())



//import routes
import helathCheckRouter from "./routes/healthCheck.routes.js"
import userRouter from "./routes/user.route.js";

//routes
app.use("/api/v1/healthCheck", helathCheckRouter)
app.use("/api/v1/users", userRouter)

export {
    app
}