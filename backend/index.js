import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"

import cookieParser from "cookie-parser"

const app = express();
dotenv.config()

// connection to MongoDB database using the Mongoose library
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//middlewares

app.use(cookieParser());
app.use(express.json()); // by default we cannot send any json object to express server. To do that, we need this middleware. 
// It will parse the json data and make it available as an object in the req.body property.

app.use("/api/auth",authRoute);   // whenever we visit /auth , authRoute should execute
app.use("/api/users",usersRoute);   
app.use("/api/hotels",hotelsRoute);   
app.use("/api/rooms",roomsRoute);   


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    // customise the errorMessage
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,     // it will give more details about the error
  });
});

app.listen(8800,()=>{
    connect();      // connection is established before the server starts listening for incoming requests
    console.log("Connected to backend!");
});