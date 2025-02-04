import {UserRepository} from "../repositories/UserRepository";

import { Request, Response } from 'express';
import {
    comparePassword,
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../repositories/AuthRepository";
import Role from "../model/Role";
import User from "../model/User";


const userRepository = new UserRepository();
export class AuthController{
   async register (req: Request, res: Response)  {
        try {
            const { email, password, role } = req.body;

            // Check if user already exists
            const existingUser = await userRepository.findUserByEmail(email);
            if (existingUser) {
                 res.status(400).json({ message: "User already exists" });
            }

            // Create new user
            const newUser = await userRepository.createUserWithStaff(
                email,
                password,
                role as Role,
            );


            res.status(201).json({ message: "User registered successfully", newUser});
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
   }

     async login (req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await userRepository.findUserByEmail(email);
            if (!user)  res.status(401).json({ message: "Invalid email or password" });

            const isMatch = await comparePassword(password, (user as User).password);
            if (!isMatch)  res.status(401).json({ message: "Invalid email or password" });

            // Generate Tokens
            const accessToken = generateAccessToken((user as User).id, (user as User).role);
            const refreshToken = generateRefreshToken((user as User).id);


            res.json({accessToken : accessToken, refreshToken : refreshToken});
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    async refreshAccessToken(req: Request, res: Response) {
        const authHeader = req.headers.authorization;
        const refreshToken = authHeader?.split(" ")[1]; // Extract token

        if (!refreshToken) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyRefreshToken(refreshToken);
        if (!decoded) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken(decoded.id, decoded.role);

        return res.json({ accessToken: newAccessToken });
    }


}