import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductEntity } from "./product.entity";
import { Role } from "../auth/jwt-strategy/role.decorator";
import { JwtGuard } from "../auth/jwt-strategy/jwt.guard";
import { RoleGuard } from "../auth/jwt-strategy/role.guard";

@Controller("api/v1/products")
export class ProductController {

  @Inject(ProductService)
  private readonly service: ProductService;

  @Get()
  private async getProducts(@Query() query): Promise<any> {
    return await this.service.findAllProduct(query);
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Get("name/:name")
  private async getProductByName(@Param("name") name: string): Promise<any> {
    return await this.service.findProductByName({ name });
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Get("id/:id")
  private async getProductById(@Param("id") id: string): Promise<any> {
    return await this.service.findProductById({ id });
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Delete("id/:id")
  private async deleteProductById(@Param("id") id: string): Promise<any> {
    return await this.service.removeProductById(id);
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  private async postProduct(@Body() request: Request | ProductEntity | any): Promise<any> {
    return await this.service.saveProduct(request);
  }

  @Role("admin")
  @UseGuards(JwtGuard, RoleGuard)
  @Put("id/:id")
  private async putProduct(@Body() request: Request | ProductEntity | any, @Param("id") id: string): Promise<any> {
    const body: any = request as ProductEntity;
    body.id = id || null;
    return await this.service.updateProduct(body);
  }
}

