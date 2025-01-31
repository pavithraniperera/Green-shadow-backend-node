import Role from "./Role";

export default class Staff{
    staffId: string;
    firstName: string;
    lastName: string;
    gender: string;
    designation: string;
    email: string;
    dob: Date;
    address: string;
    contact: string;
    joinDate: Date;
    role: Role;
    fieldIds: string[];


    constructor(
        staffId: string,
        firstName: string,
        lastName: string,
        gender: string,
        designation: string,
        email: string,
        dob: Date,
        address: string,
        contact: string,
        joinDate: Date,
        role: Role,
        fieldIds:string[]

    ) {
        this.staffId = staffId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.designation = designation;
        this.email = email;
        this.dob = dob;
        this.address = address;
        this.contact = contact;
        this.joinDate = joinDate;
        this.role = role;
        this.fieldIds = fieldIds;
    }
}