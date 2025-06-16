import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../type/user.type";


export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles)