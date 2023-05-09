import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {ProductModule} from "./product/product.module";
import {ConfigModule} from "@nestjs/config";
import {RoleModule} from "./role/role.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {dataSourceOptions} from "../db/data-source";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule, AuthModule, ProductModule, RoleModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      database: process.env.PG_DB,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true // never true in production!
    })
    //TypeOrmModule.forRoot(dataSourceOptions)
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
