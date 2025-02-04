import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

//  Hash Password
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

// Compare Password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

//  Generate Access Token (Short-lived like 15 min)
export const generateAccessToken = (userId: string, role: string): string => {
    return jwt.sign({ userId, role }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

//  Generate Refresh Token (Long-lived, liked 7 days)
export const generateRefreshToken = (userId: string): string => {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

//  Verify Access Token
export const verifyAccessToken = (token: string): any => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

//  Verify Refresh Token
export const verifyRefreshToken = (token: string): any => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
};
