import { Body, Controller, Get, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./jwt-strategy/jwt.guard";
import { RoleGuard } from "./jwt-strategy/role.guard";
import { Role } from "./jwt-strategy/role.decorator";

@Controller("api/v1/auth")
export class AuthController {

  @Inject(AuthService)
  private readonly service: AuthService;

  @Post("login")
  private async login(@Body() body): Promise<any> {
    return { token: await this.service.login(body.username, body.password) };
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Get("validate")
  validate(@Req() req) {
    return {validate: 'token is valid'};
  }
}
