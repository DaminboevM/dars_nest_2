import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {

    constructor(private readonly userService: AuthService) {}

    @Post('register')
    Register (@Body() payload: Required<User>) {
        const data = this.userService.register(payload)
        return data
    }

    @Post('login')
    Login (@Body() payload: Required<User>) {
        const data = this.userService.login(payload)
        return data
    }
}
