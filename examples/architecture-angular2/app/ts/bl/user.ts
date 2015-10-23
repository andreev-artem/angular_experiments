export class User {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    extSync: boolean;

    getFullName(): string {
        var names = [];
        if (this.firstName && this.firstName.length > 0) {
            names.push(this.firstName);
        }
        if (this.middleName && this.middleName.length > 0) {
            names.push(this.middleName);
        }
        if (this.lastName && this.lastName.length > 0) {
            names.push(this.lastName);
        }
        return names.join(' ');
    }

    static fromJson(rawData: any): User {
        var user = new User();
        user.email = rawData.email;
        user.firstName = rawData.firstName;
        user.lastName = rawData.lastName;
        user.middleName = rawData.middleName;
        user.extSync = !!rawData.extSync;
        return user;
    }
}