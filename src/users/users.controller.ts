import { Body, Controller, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/user.model';
import { AuthGuard } from 'src/auth/guards/jwt-auth.duards';
import { Roles } from 'src/global/decorators/role.decorators';
import { UserRole } from 'src/global/type/user.type';
import { RolesGuard } from 'src/global/guards/roles.guards';

@Controller('api')
export class UsersController {

    constructor(private readonly userService: UsersService) {}


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN)
    @Put('update')
    UpdateUser (@Body() payload: Required<User>) {
        return this.userService.updateUser(payload)
    }
    
    
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN)
    @Delete('delete/:username')
    DeleteUser (@Param('username') username: string) {
        return this.userService.deleteUser(username)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN)
    @Put('add/admin/:username')
    addAdmin(@Param('username') username: string) {
        return this.userService.AddAdmin(username)
    }
}
