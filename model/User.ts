import Role from './Role';

class User {
    id: string;
    email: string;
    password: string;
    role: Role;
    staffId: string;


    constructor(id: string, email: string, password: string, role: Role, staffId: string) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.staffId = staffId;
    }
}

export default User;
