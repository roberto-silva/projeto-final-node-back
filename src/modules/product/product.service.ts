import prisma from "../../utils/prisma";
import {CreateProductInput} from "./product.schema";

export async function getProducts() {
    return await prisma.product.findMany({
        select: {
            content: true, title: true, price: true, id: true, createdAt: true, updatedAt: true,
            owner: {select: {name: true, id: true}}
        }
    });
}

export async function findProductById(id: number) {
    return await prisma.product.findUnique({where: {id},});
}

export async function createProduct(input: CreateProductInput & { ownerId: number }) {
    return await prisma.product.create({data: input});
}

export async function updateProduct(id: number, data: CreateProductInput) {
    return await prisma.product.update({where: {id}, data: data});
}

export async function removeProductById(id: number) {
    return await prisma.product.delete({where: {id}});
}
