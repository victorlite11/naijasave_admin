export class NewAdminModel {
    _id?: string;
    name: string = "";
    phoneNumber: string = "";
    email: string = "";
    password: string = "";
    country: string = "";
    state: string = "";
    address: string = "";
    gender: string = "";
    starting_balance: number = 0;
    identity: "super" | "sub" | "head" = "super";
    dateOfBirth: string = "";
    overseer_id: string = "";
}
