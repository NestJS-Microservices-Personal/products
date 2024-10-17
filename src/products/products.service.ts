import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger("Product-Service")

  onModuleInit() {
    this.$connect
    this.logger.log("Database Connected")
  }
  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto

    const totalPages = await this.product.count({
      where:{available:true}
    })
    const lastPage = Math.ceil(totalPages / limit);

    return {
      meta: {
        total: totalPages,
        page,
        lastPage
      },
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where:{available:true}
      })
    }
  }

  async findOne(id: string) {
    const product = await this.product.findFirst({
      where: { id }
    })
    if (!product) throw new RpcException(`Product with id ${id} not found`);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id)
    const {id:__, ...data}= updateProductDto
    const productUpdate = await this.product.update({
      where:{id},
      data
    })
    return productUpdate;
  }

  async remove(id: string) {
    await this.findOne(id)
    const productUpdate = await this.product.update({
      where:{id},
      data: {
        available: false
      }
    })
    return productUpdate;
  }
}
