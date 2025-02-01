import {UserRepository} from "../repositories/UserRepository";
import {Request, Response} from "express";
import Role from "../model/Role";

const userRepository = new UserRepository();

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { email, password, role, fieldIds } = req.body;

            if (!email || !password || !role) {
                 res.status(400).json({ message: "Email, password, and role are required" });
            }

            const existingUser = await userRepository.findUserByEmail(email);
            if (existingUser) {
                 res.status(400).json({ message: "User with this email already exists" });
            }

            const newUser = await userRepository.createUserWithStaff(
                email,
                password,
                role as Role,
            );

            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userRepository.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving users", error });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userRepository.getUserById(id);
            if (!user) {
                 res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving user", error });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updates = req.body;
            console.log(updates)

            const updatedUser = await userRepository.updateUser(id, updates);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: "Error updating user", error });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await userRepository.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", error });
        }
    }
}



export default UserController;