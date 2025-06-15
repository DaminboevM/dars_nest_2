import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/user.model';

@Controller('api')
export class UsersController {

    constructor(private readonly userService: UsersService) {}


    @Put('update')
    UpdateUser (@Body() payload: Required<User>) {
        return this.userService.updateUser(payload)
    }

    @Delete('delete/:username')
    DeleteUser (@Param('username') username: string) {
        return this.userService.deleteUser(username)
    }
}
