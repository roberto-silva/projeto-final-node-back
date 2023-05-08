import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoleEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id!: string;

  @Column({ type: "varchar" })
  public name!: string;

  @Column("boolean")
  isDelete: boolean;

  constructor(id?: string, name?: string) {
    super();
    this.id = id;
    this.name = name;
  }
}
