
import express from "express";
import dotenv from "dotenv";
import path from "path";
import {ENV} from "./lib/env.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connect } from "http2";
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT= ENV.PORT || 3000;

const app=express();
app.use(express.json());

const __dirname= path.resolve();

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


// make ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
    });
}
app.listen(PORT,() => {
    console.log("Server is on, at "+PORT)
    connectDB();
});