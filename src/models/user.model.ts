import { DataTypes } from "sequelize";
import { Model, Column, Table } from "sequelize-typescript";

@Table
export class User extends Model {

    @Column({type: DataTypes.STRING, unique: true})
    username: string

    @Column
    age: number

    @Column
    password: string
}