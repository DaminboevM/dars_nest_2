import { Min, IsString, MinLength, IsInt, MaxLength } from 'class-validator'

export class UserUpdateDto {
  @IsString()
  @MinLength(3)
  username: string

  @IsInt()
  @Min(18)
  age?: number

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password?: string
}