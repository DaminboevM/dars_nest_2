import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, 
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      username: 'postgres',
      database: 'dars8',
      password: 'admin',
      port: 5432,
      models: [User],
      autoLoadModels: true,
      synchronize: true
    }),
    JwtModule.register({
      global: true,
      secret: 'admin',
      signOptions: {expiresIn: '5m'}
    }),
    UsersModule
  ],
  controllers: [UsersController],
})
export class AppModule {}
