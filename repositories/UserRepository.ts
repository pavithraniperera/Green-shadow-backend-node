import {Prisma, PrismaClient} from "@prisma/client";
import Role from "../model/Role";
import {StaffRepository} from "./StaffRepository";
import Staff from "../model/Staff";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import {hashPassword} from "./AuthRepository";


const prisma = new PrismaClient();
const staffRepository = new StaffRepository()
dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ;
export  class UserRepository{
    async findUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }

    async findStaffByEmail(email: string) {
        return prisma.staff.findUnique({where: {email}});
    }
    async createUser(data: Prisma.UserCreateInput) {
        return prisma.user.create({ data });
    }

    async createUserWithStaff(email:string,password:string,role:Role){
        let staff = await this.findStaffByEmail(email)

        if(!staff){
            staff = await staffRepository.createStaff({
                firstName: "New",
                lastName: "Staff",
                gender: "Not Specified",
                designation: "Worker",
                email,
                dob: new Date(),
                address: "Unknown",
                contact: "0000000000",
                joinDate: new Date(),
                role
            });

        }
        // Hash the password before saving it
        const hashedPassword:string = await hashPassword(password);
        return await this.createUser({
            email: email,
            password: hashedPassword,
            role: role,
            Staff: {connect: {staffId: (staff as Staff).staffId}}
        });

    }

    async getAllUsers() {
        return prisma.user.findMany();
    }

    async getUserById(id: string) {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    async updateUser(id: string, updates: Prisma.UserUpdateInput) {
        return prisma.user.update({
            where: { id },
            data: updates,
        });
    }

    async deleteUser(id: string) {
        return prisma.user.delete({
            where: { id },
        });
    }






}