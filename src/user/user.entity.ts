import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user'})
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: "varchar" })
    public email!: string;

    @Column({ type: "varchar" })
    public password!: string;

    @Column({ type: "varchar" })
    public roleId: string;

    @Column("boolean")
    public isDelete: boolean;
}
