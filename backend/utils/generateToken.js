import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const generateTokens = async(res, userId) => {

    const accessToken = jwt.sign(
        { userId }, 
        process.env.JWT_ACCESS_SECRET, 
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { userId }, 
        process.env.JWT_REFRESH_SECRET, 
        { expiresIn: '7d' }
    );

    await User.findByIdAndUpdate(userId, { refreshToken });

    res.cookie('accessToken', accessToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    //Set Refresh Token in http-only cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return accessToken;
};