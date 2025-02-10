import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';



const app = express();

app.use(
    cors({
      origin: "http://trend-aura-phi.vercel.app", 
      credentials: true, 
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"], 
      allowedHeaders: ["Content-Type", "Authorization"], 
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
import productRouter from "./routes/product.route.js";
import categoryRouter from './routes/category.route.js'
import cartRouter from "./routes/cart.route.js"

//routes
app.use("/api/v1/healthCheck", helathCheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/cart", cartRouter)

export {
    app
}