import { HttpStatus, Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "./role.entity";
import { Repository } from "typeorm";
import { firstValueFrom, from, map } from "rxjs";
import { paginate, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class RoleService implements OnModuleInit {

  @InjectRepository(RoleEntity)
  private readonly repository: Repository<RoleEntity>;

  public async onModuleInit(): Promise<any> {
    await this.insertBaseRole();
  }

  public async findAllRole(payload: Request | any): Promise<any> {
    try {
      const roles = await from(paginate<RoleEntity>(this.repository, payload))
        .pipe(
          map((page: Pagination<RoleEntity>) => {
            return page;
          }));
      const pagination = await firstValueFrom(roles);

      return {
        items: pagination.items, links: "", messages: [], pagination: pagination.meta, status: HttpStatus.OK
      };
    } catch (error) {
      throw error;
    }
  }

  public async findRoleByName(payload: Request | any): Promise<any> {
    return this.buildingResponseSuccess(await this.findRoleBy(payload, "name"), HttpStatus.OK, []);
  }

  public async findRoleById(payload: Request | any): Promise<any> {
    return this.buildingResponseSuccess(await this.findRoleBy(payload, "id"), HttpStatus.OK, []);
  }

  public async removeRoleById(payload: Request | any): Promise<any> {
    try {
      let response = await this.repository.createQueryBuilder(process.env.DATABASE_NAME)
        .where(`${process.env.DATABASE_NAME}.id = :id`, { id: payload})
        .getOne();
      if (response) {
        response.isDelete = !response?.isDelete;
        await this.repository.createQueryBuilder()
          .update(RoleEntity).set(response).where("id = :id", { id: response?.id }).execute();
        return { status: HttpStatus.OK, messages: [] };
      }
      return { status: HttpStatus.NOT_FOUND, messages: [] };
    } catch (error) {
      throw error;
    }
  }

  public async saveRole(payload: Request | any): Promise<any> {
    try {
      const role = await this.repository.save(payload);
      return this.buildingResponseSuccess(role, HttpStatus.OK, []);
    } catch (error) {
      throw error;
    }
  }

  public async updateRole(payload: Request | any): Promise<any> {
    try {
      let role;
      if (payload?.id) {
        let response = await this.repository.createQueryBuilder(process.env.DATABASE_NAME)
          .where(`${process.env.DATABASE_NAME}.id = :id`, { id: payload.id })
          .andWhere(`${process.env.DATABASE_NAME}.isDelete = false`)
          .getOne();
        if (response) {
          role = await this.repository.createQueryBuilder()
            .update(RoleEntity).set(response).where("id = :id", { id: response?.id }).execute();
        } else {
          return this.buildingResponseSuccess(role, HttpStatus.NOT_FOUND, []);        }
      }
      return this.buildingResponseSuccess(role, HttpStatus.OK, []);
    } catch (error) {
      throw error;
    }
  }

  private async findRoleBy?(payload: Request | any, type: string): Promise<any> {
    try {
      return await this.repository
        .createQueryBuilder(process.env.DATABASE_NAME)
        .where(`${process.env.DATABASE_NAME}.${type} = :${type}`, { [type]: payload[type] })
        .andWhere(`${process.env.DATABASE_NAME}.isDelete = false`)
        .getOne();
    } catch (error) {
      throw error;
    }
  }

  private async insertBaseRole(): Promise<void> {
    try {
      const response = await this.findRoleById({ id: "1" });
      if (!response.role) {
        await this.repository.save(
          { id: "1", name: "admin", isDelete: false });
      }
    } catch (error) {
      throw error;
    }
  }

  private buildingResponseSuccess(role: RoleEntity, status: HttpStatus, messages: string[]): any {
    return { role: role, status: status, messages: messages };
  }
}
