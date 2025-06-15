import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UserUpdateDto } from './dto/user.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private model: typeof User) {}

    async updateUser(payload: Required<UserUpdateDto>) {
        if (!payload.username) throw new BadRequestException('Username is required')

        const user = await this.model.findOne({ where: { username: payload.username } })

        if (!user) throw new NotFoundException('User not found!')

        await this.model.update(payload, { where: { username: payload.username },})
        return { message: 'User successfully updated' }
  }


  async deleteUser(username: string) {
    if(!username) throw new BadRequestException('username is reuired !')

    const user = await this.model.findOne({ where: { username } })
    if (!user) throw new NotFoundException('User not found')

    await this.model.destroy({ where: { username } })
    return 'User successfully deleted'
  }
}