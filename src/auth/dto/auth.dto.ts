import { PickType } from '@nestjs/mapped-types'
import { Min, IsString, MinLength, IsInt, MaxLength } from 'class-validator'

export class UserRegisterDto {
  @IsString()
  @MinLength(3)
  username: string

  @IsInt()
  @Min(18)
  age: number

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string
}

export class UserLoginDto extends PickType(UserRegisterDto, ['username', 'password'] as const) {}