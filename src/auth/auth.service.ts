import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from 'src/models/user.model'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UserLoginDto, UserRegisterDto } from './dto/auth.dto'
import { NotFoundError } from 'rxjs'

@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private model: typeof User, private jwt: JwtService ){}

    async register (payload: Required<UserRegisterDto>) {
        const user = await this.model.findOne({ where: {username: payload.username} })

        if(user) throw new ConflictException('User alredy exists')
        const hash = await bcrypt.hash(payload.password, 10)

        const data = await this.model.create({...payload, password: hash})
        const token = await this.jwt.sign({id: data.id, role: data.dataValues.role})

        return {acsessToken: token}
    }




    async login(payload: Required<UserLoginDto>) {
        const user = await this.model.findOne({ where: { username: payload.username } })

        if (!user) throw new ForbiddenException('Invalid username or password')
        console.log(user)
        console.log('payload.password', payload.password)
        console.log('user.password', user.password)
        const deshif = await bcrypt.compare(payload.password, user.dataValues.password)
        if (!deshif) throw new ForbiddenException('Invalid username or password')

        const token = await this.jwt.sign({ id: user.id, user: user.role })

        return { acsessToken: token }
    }



}