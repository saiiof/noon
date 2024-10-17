//import modules'
import path from 'path'
import express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./db/connection.js";
import { globalErrorHandling } from "./src/middleware/asyncHandler.js";
import { initApp } from "./src/bootStrap.js";
//create server
const app = express();
const port = process.env.PORT || 3000
dotenv.config({path : path.resolve('./config/.env')})
//connect db
connectDB();
initApp(app,express)
// globel error
app.use(globalErrorHandling);
//listen server
app.listen(port, () => {
  console.log("server is running on port ", port);
});
