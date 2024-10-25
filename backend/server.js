import express, { urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectToCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/admin.route.js";
import doctorRouter from "./routes/doctor.route.js";
import userRouter from "./routes/user.routes.js";

//app config
const app = express();
const port = process.env.PORT || 4000;

//databse connected
connectDB();
//cloudinary connection
connectToCloudinary();

//middleware
app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));

//api endpoint
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/user", userRouter);
//localhost:4000/api/v1/admin
app.get("/", (req, res) => {
  res.send("api  working");
});

//app listen
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
