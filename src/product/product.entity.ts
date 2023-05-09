import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'product'})
export class ProductEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id!: string;

  @Column({ type: "varchar" })
  public name!: string;

  @Column({type: "boolean"})
  public isDelete: boolean;
}
