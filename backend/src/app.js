import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';



const app = express();

const allowedOrigins = process.env.CORS_ORIGIN.split(","); // Support multiple origins

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies & authentication headers
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