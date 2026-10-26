import { RolesEnum } from "../enums/roles-enum"
import { StatusEnum } from "../enums/status-enum"

export interface User {
        id: string,
        name: string,
        email: string,
        password: string,
        phoneNumber: number,
        photoUrl?: string,
        role: RolesEnum,
        status: StatusEnum,
        createdAt?: Date,
        updatedAt?: Date
}
