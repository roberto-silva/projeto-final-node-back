import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { RoleService } from "../role/role.service";

@Injectable()
export class AuthService {

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(RoleService)
  private readonly roleService: RoleService;

  async login(username: string, password: string) {
    const user = await this.validateCredentials(username, password);

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role
    };

    return this.jwtService.sign(payload);
  }

  async validateCredentials(username: string, password: string) {
    const userRequest: any = await this.userService.findUserByEmail({ email: username });
    let roleRequest: any = null;
    if (userRequest?.user?.roleId) {
      roleRequest = await this.roleService.findRoleById({ id: userRequest?.user?.roleId });
    }
    if (!userRequest?.user) {
      throw new Error("User not found");
    }

    delete userRequest?.user?.roleId;
    let user: any = userRequest?.user;

    user.role = roleRequest?.role ? roleRequest?.role : null;

    return user;
  }
}
