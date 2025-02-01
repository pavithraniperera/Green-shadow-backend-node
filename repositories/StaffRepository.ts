import {PrismaClient} from "@prisma/client";
import Staff from "../model/Staff";
import Role from "../model/Role";


const prisma = new PrismaClient();

export class StaffRepository {

    async createStaff(staffData: any, fieldIds: string[]=[]): Promise<any> {
        return prisma.$transaction(async (tx) => {
            const newStaff = await tx.staff.create({
                data: {
                    firstName: staffData.firstName,
                    lastName: staffData.lastName,
                    gender: staffData.gender,
                    designation: staffData.designation,
                    email: staffData.email,
                    dob: staffData.dob,
                    address: staffData.address,
                    contact: staffData.contact,
                    joinDate: staffData.joinDate,
                    role: staffData.role,

                },
            });

            if (fieldIds && fieldIds.length > 0) {
                await tx.fieldStaff.createMany({
                    data: fieldIds.map((fieldId) => ({
                        fieldId,
                        staffId: (newStaff as Staff).staffId,
                    })),
                });
            }

            return newStaff;
        });


    }

    async updateStaff(staffId: string, staffData: any, fieldIds: string[]): Promise<any> {
        return prisma.$transaction(async (tx) => {
            const updatedStaff = await tx.staff.update({
                where: { staffId },
                data: {
                    firstName: staffData.firstName,
                    lastName: staffData.lastName,
                    gender: staffData.gender,
                    designation: staffData.designation,
                    email: staffData.email,
                    dob: staffData.dob,
                    address: staffData.address,
                    contact: staffData.contact,
                    joinDate: staffData.joinDate,
                    role: staffData.role
                },
            });

            // Remove existing fields
            await tx.fieldStaff.deleteMany({
                where: { staffId },
            });

            // Add new fields
            if (fieldIds && fieldIds.length > 0) {
                await tx.fieldStaff.createMany({
                    data: fieldIds.map((fieldId) => ({
                        fieldId,
                        staffId: (updatedStaff as Staff).staffId,
                    })),
                });
            }

            return updatedStaff;
        });
    }

    async deleteStaff(staffId: string): Promise<void> {
        return prisma.$transaction(async (tx) => {
            // Delete associated field relationships
            await tx.fieldStaff.deleteMany({
                where: { staffId },
            });

            // Delete Staff
            await tx.staff.delete({
                where: { staffId },
            });
        });
    }

    async getAllStaff(): Promise<any> {
        // Get all staff without  fields
        const staffList = await prisma.staff.findMany();

        // Fetch all staff-field relationships separately
        const staffFieldRelations = await prisma.fieldStaff.findMany({
            select: {
                staffId: true,
                fieldId: true,
            },
        });

        //  Attach fieldIds to the corresponding staff members
        return staffList.map((staff) => {
            const fieldIds = staffFieldRelations
                .filter((relation) => relation.staffId === staff.staffId)
                .map((relation) => relation.fieldId);

            return {
                ...staff,
                fieldIds, // Attach field IDs manually
            };
        });
    }

    async getStaffById(staffId: string) {

        const staff = await prisma.staff.findUnique({
            where:{
                staffId
            }
        });
        if (!staff) {
            return null;
        }

        const relatedFields = await prisma.fieldStaff.findMany(
            {
                where:{staffId},
                select:{fieldId:true}
            }
        )
        const fieldIds = relatedFields.map(relation => relation.fieldId);
        return {...staff ,fieldIds}



    }



}




