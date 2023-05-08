import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategyService } from "./jwt-strategy/jwt-strategy.service";
import { UserModule } from "../user/user.module";
import { ConfigModule } from "@nestjs/config";
import { RoleModule } from "../role/role.module";

@Module({
  imports: [
    UserModule,
    RoleModule,
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({
      secret: "abcd123456",
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService]
})
export class AuthModule {
}
