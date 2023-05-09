import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'user'})
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: string;

    @Column({ type: "varchar" })
    public email!: string;

    @Column({ type: "varchar" })
    public password!: string;

    @Column({ type: "varchar" })
    public roleId: string;

    @Column({type: "boolean"})
    public isDelete: boolean;
}
