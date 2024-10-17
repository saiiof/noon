import mongoose from "mongoose";
export const connectDB = ()=>{
    
mongoose
.connect(process.env.DB_URL)
.then(() => {
  console.log("db conected successfully");
})
.catch((error) => {
  console.log("faild to connect db");
});

}