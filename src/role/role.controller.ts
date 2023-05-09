import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { RoleEntity } from "./role.entity";
import { RoleService } from "./role.service";
import { Role } from "../auth/jwt-strategy/role.decorator";
import { JwtGuard } from "../auth/jwt-strategy/jwt.guard";
import { RoleGuard } from "../auth/jwt-strategy/role.guard";

@Controller("api/v1/roles")
export class RoleController {

  @Inject(RoleService)
  private readonly service: RoleService;

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  private async getRoles(@Query() query): Promise<any> {
    return await this.service.findAllRole(query);
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Get("name/:name")
  private async getRoleByName(@Param("name") name: string): Promise<any> {
    return await this.service.findRoleByName({ name });
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Get("id/:id")
  private async getRoleById(@Param("id") id: string): Promise<any> {
    return await this.service.findRoleById({ id });
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Delete("id/:id")
  private async deleteRoleById(@Param("id") id: string): Promise<any> {
    return await this.service.removeRoleById(id);
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  private async postRole(@Body() request: Request | RoleEntity | any): Promise<any> {
    return await this.service.saveRole(request);
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Put("id/:id")
  private async putRole(@Body() request: Request | RoleEntity | any, @Param("id") id: string): Promise<any> {
    const body: any = request as RoleEntity;
    body.id = id || null;
    return await this.service.updateRole(body);
  }
}
