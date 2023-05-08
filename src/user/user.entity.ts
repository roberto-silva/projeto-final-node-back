import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: "varchar" })
    public email!: string;

    @Column({ type: "varchar" })
    public password!: string;

    @Column({ type: "varchar" })
    roleId: string;

    @Column("boolean")
    isDelete: boolean;
}
