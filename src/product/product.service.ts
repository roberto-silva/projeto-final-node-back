import {HttpStatus, Injectable, OnModuleInit} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {firstValueFrom, from, map} from "rxjs";
import {paginate, Pagination} from "nestjs-typeorm-paginate";
import {ProductEntity} from "./product.entity";

@Injectable()
export class ProductService implements OnModuleInit {

  @InjectRepository(ProductEntity)
  private readonly repository: Repository<ProductEntity>;

  public async onModuleInit(): Promise<any> {
    // await this.insertBaseProduct();
  }

  public async findAllProduct(payload: Request | any): Promise<any> {
    try {
      const products = await from(paginate<ProductEntity>(this.repository, payload))
        .pipe(
          map((page: Pagination<ProductEntity>) => {
            return page;
          }));
      const pagination = await firstValueFrom(products);

      return {
        items: pagination.items, links: "", messages: [], pagination: pagination.meta, status: HttpStatus.OK
      };
    } catch (error) {
      throw error;
    }
  }

  public async findProductByName(payload: Request | any): Promise<any> {
    return this.buildingResponseSuccess(await this.findProductBy(payload, "name"), HttpStatus.OK, []);
  }

  public async findProductById(payload: Request | any): Promise<any> {
    return this.buildingResponseSuccess(await this.findProductBy(payload, "id"), HttpStatus.OK, []);
  }

  public async removeProductById(payload: Request | any): Promise<any> {
    try {
      let response = await this.repository.createQueryBuilder(process.env.PG_DB)
        .where(`${process.env.PG_DB}.id = :id`, { id: payload })
        .getOne();
      if (response) {
        response.isDelete = !response?.isDelete;
        await this.repository.createQueryBuilder()
          .update(ProductEntity).set(response).where("id = :id", { id: response?.id }).execute();
        return { status: HttpStatus.OK, messages: [] };
      }
      return { status: HttpStatus.NOT_FOUND, messages: [] };
    } catch (error) {
      throw error;
    }
  }

  public async saveProduct(payload: Request | any): Promise<any> {
    try {
      const product = await this.repository.save(payload);
      return this.buildingResponseSuccess(product, HttpStatus.OK, []);
    } catch (error) {
      throw error;
    }
  }

  public async updateProduct(payload: Request | any): Promise<any> {
    try {
      let product;
      if (payload?.id) {
        let response = await this.repository.createQueryBuilder(process.env.PG_DB)
          .where(`${process.env.PG_DB}.id = :id`, { id: payload.id })
          .andWhere(`${process.env.PG_DB}.isDelete = false`)
          .getOne();
        if (response) {
          product = await this.repository.createQueryBuilder()
            .update(ProductEntity).set(response).where("id = :id", { id: response?.id }).execute();
        } else {
          return this.buildingResponseSuccess(product, HttpStatus.NOT_FOUND, []);
        }
      }
      return this.buildingResponseSuccess(product, HttpStatus.OK, []);
    } catch (error) {
      throw error;
    }
  }

  private async findProductBy?(payload: Request | any, type: string): Promise<any> {
    try {
      return await this.repository
        .createQueryBuilder(process.env.PG_DB)
        .where(`${process.env.PG_DB}.${type} = :${type}`, { [type]: payload[type] })
        .andWhere(`${process.env.PG_DB}.isDelete = false`)
        .getOne();
    } catch (error) {
      throw error;
    }
  }

  private async insertBaseProduct(): Promise<void> {
    try {
      const response = await this.findProductById({ id: '1' });
      if (!response.product) {
        await this.repository.insert(
          { id: '1', name: "test", isDelete: false });
      }
    } catch (error) {
      throw error;
    }
  }

  private buildingResponseSuccess(product: ProductEntity, status: HttpStatus, messages: string[]): any {
    return { product: product, status: status, messages: messages };
  }
}
