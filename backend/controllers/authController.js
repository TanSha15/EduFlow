import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import { generateTokens } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";


//------------------------------SIGNUP--------------------------------

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "student", 
    });

    // --- NEW: Generate and Set Cookies Immediately ---
    // This ensures the browser receives the 'accessToken' cookie right now
    await generateTokens(res, newUser._id); 

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        streak: newUser.streak || 0, // Include streak for the Dashboard UI
      },
    });
  } catch (error) {
    console.error("Error while creating a User:", error);
    return res.status(500).json({
      success: false,
      message: "Error while creating a User",
      error: error.message,
    });
  }
};


//------------------------------LOGIN------------------------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    // Generate tokens and set refresh token in cookie

    const accessToken = await generateTokens(res, user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
};

//------------------------------REFRESH TOKEN--------------------------------
export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No refresh token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== token) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid refresh token" });
    }
    const accessToken = await generateTokens(res, user._id);

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    res.clearCookie("refreshToken");
    return res
      .status(403)
      .json({ success: false, message: "Session expired, please login again" });
  }
};


//------------------------------LOGOUT--------------------------------------
export const logout = async (req, res) => {
    try {
        // Clear the cookies by setting their expiration to the past
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({ 
            success: true, 
            message: "Logged out successfully" 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Error during logout" 
        });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password"); 
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};