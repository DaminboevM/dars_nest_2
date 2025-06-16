import { ENUM } from "sequelize";
import { DataTypes } from "sequelize";
import { Model, Column, Table } from "sequelize-typescript";
import { UserRole } from "src/global/type/user.type";

@Table({tableName: 'users'})
export class User extends Model {

    @Column({type: DataTypes.STRING, unique: true})
    username: string

    @Column
    age: number

    @Column
    password: string

    @Column({type: ENUM(...Object.values(UserRole)), defaultValue: UserRole.USER})
    role: UserRole
}