import {HttpStatus, Injectable, OnModuleInit} from "@nestjs/common";
import {UserEntity} from "./user.entity";
import {firstValueFrom, from, map} from "rxjs";
import {paginate, Pagination} from "nestjs-typeorm-paginate";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UserService implements OnModuleInit {

  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  async onModuleInit(): Promise<any> {
    // await this.insertBaseUser();
  }

  public async findAllUser(payload: Request | any): Promise<any> {
    try {
      const users = await from(paginate<UserEntity>(this.repository, payload))
        .pipe(map((page: Pagination<UserEntity>) => {
          return page;
        }));
      const pagination = await firstValueFrom(users);
      return {
        items: pagination.items as any[],
        links: null,
        pagination: pagination.meta as any,
        status: HttpStatus.OK,
        messages: []
      };
    } catch (error) {
      throw error;
    }
  }

  public async findUserByEmail(payload: Request | any): Promise<any> {
    return this.buildingResponseSuccess(await this.findUserBy(payload, "email"), HttpStatus.OK, []);
  }

  public async findUserById(payload: Request | any): Promise<any> {
    return this.buildingResponseSuccess(await this.findUserBy(payload, "id"), HttpStatus.OK, []);
  }

  private async findUserBy?(payload: Request | any, type: string): Promise<any> {
    try {
      const response: any = await this.repository
        .createQueryBuilder(String(process.env.PG_DB))
        .where(`${process.env.PG_DB}.${type} = :${type}`, { [type]: payload[type] })
        .getOne();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async removeUserById(payload: Request | any): Promise<any> {
    try {
      const query = JSON.parse(payload.query);
      let response = await this.repository.createQueryBuilder(process.env.PG_DB)
        .where(`${process.env.PG_DB}.id = :id`, { id: query.id })
        .getOne();
      if (response) {
        response.isDelete = !response?.isDelete;
        await this.repository.createQueryBuilder()
          .update(UserEntity).set(response).where("id = :id", { id: response?.id }).execute();
        return { status: HttpStatus.OK, messages: [] };
      }
      return { status: HttpStatus.NOT_FOUND, messages: [] };
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(payload: Request | any): Promise<any> {
    try {
      let role;
      if (payload?.id) {
        let response = await this.repository.createQueryBuilder(process.env.PG_DB)
          .where(`${process.env.PG_DB}.id = :id`, { id: payload.id })
          .andWhere(`${process.env.PG_DB}.isDelete = false`)
          .getOne();
        if (response) {
          role = await this.repository.createQueryBuilder()
            .update(UserEntity).set(response).where("id = :id", { id: response?.id }).execute();
        }
      } else {
        return this.buildingResponseSuccess(role, HttpStatus.NOT_FOUND, []);
      }
      return this.buildingResponseSuccess(role, HttpStatus.OK, []);
    } catch (error) {
      throw error;
    }
  }

  public async saveUser(payload: Request | any): Promise<any> {
    try {
      payload.isDelete = false;
      const role = await this.repository.save(payload);
      return this.buildingResponseSuccess(role, HttpStatus.OK, []);
    } catch (error) {
      throw error;
    }
  }

  private async insertBaseUser(): Promise<void> {
    try {
      // email: admin@gmail.com
      // password: 12345678
      const response = await this.findUserById({ id: "1" });
      if (response.user === undefined || response.user === null) {
        await this.repository.insert({
          id: '1', password: "$2a$10$CrvQB6BbIJlAdDrDITITH.QqlOUqOuhcmzMbkyVHPOlvRRTjQhr3i",
          email: "admin@gmail.com", roleId: "1", isDelete: false
        });
      }
    } catch (error) {
      throw error;
    }
  }

  private buildingResponseSuccess(user: UserEntity | any, status: HttpStatus, messages: string[]): any {
    return { user: user, status: status, messages: messages };
  }
}
