import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId,res) => {
    const { JWT_SECRET } = ENV;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({userId:userId},JWT_SECRET,{expiresIn:"7d"});

    res.cookie("jwt",token, {
        maxAge: 7*24*60*60*1000, // 7 days in milliseconds
        httpOnly: true, //prevent client-side JavaScript from accessing the cookie
        sameSite: "strict", // restricts the cookie to be sent only in a first-party context
        secure: ENV.NODE_ENV === "production" ? true:false, // ensures the cookie is sent over HTTPS in production
    });

    return token;
};