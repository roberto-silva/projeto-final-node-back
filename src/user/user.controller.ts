import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { Role } from "../auth/jwt-strategy/role.decorator";
import { JwtGuard } from "../auth/jwt-strategy/jwt.guard";
import { RoleGuard } from "../auth/jwt-strategy/role.guard";

@Controller("api/v1/users")
export class UserController {


  @Inject(UserService)
  private readonly service: UserService;

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  private async getUsers(@Query() query): Promise<any> {
    return await this.service.findAllUser(query);
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Get("email/:email")
  private async getUserByName(@Param("email") email: string): Promise<any> {
    return await this.service.findUserByEmail({ email });
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Get("id/:id")
  private async getUserById(@Param("id") id: string): Promise<any> {
    return await this.service.findUserById({ id });
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Delete("id/:id")
  private async deleteUserById(@Param("id") id: string): Promise<any> {
    return await this.service.removeUserById(id);
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  private async postUser(@Body() request: Request | UserEntity | any): Promise<any> {
    return await this.service.saveUser(request);
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Put("id/:id")
  private async putUser(@Body() request: Request | UserEntity | any, @Param("id") id: string): Promise<any> {
    const body: any = request as UserEntity;
    body.id = id || null;
    return await this.service.updateUser(body);
  }
}
