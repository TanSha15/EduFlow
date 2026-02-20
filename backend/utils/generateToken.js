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

    // Set Access Token
    res.cookie('accessToken', accessToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        // FIX: Changed 'strict' to 'none' for cross-domain production support
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
        maxAge: 15 * 60 * 1000 
    });

    // Set Refresh Token
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        // FIX: Changed 'strict' to 'none' for cross-domain production support
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    return accessToken;
};