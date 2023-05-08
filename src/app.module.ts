import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { ConfigModule } from "@nestjs/config";
import { RoleModule } from "./role/role.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule, AuthModule, ProductModule, RoleModule,
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      entities: ["dist/**/*.entity.{ts,js}"],
      synchronize: true // never true in production!
    })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
