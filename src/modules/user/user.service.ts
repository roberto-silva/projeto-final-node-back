import {hashPassword} from "../../../../Projetos/PUC/fastify-prisma-rest-api/src/utils/hash";
import prisma from "../../../../Projetos/PUC/fastify-prisma-rest-api/src/utils/prisma";
import {CreateUserInput} from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const {password, ...rest} = input;

  const {hash, salt} = hashPassword(password);

  const user = await prisma.user.create({
    data: {...rest, salt, password: hash},
  });

  return user;
}

export async function updateUser(email: any, user: any) {
  return await prisma.user.update({
    where: {email},
    data: user
  });
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email
    },
  });
}

export async function removeUserByEmail(email: string) {
  return await prisma.user.delete({
    where: {
      email
    }
  });
}

export async function findUsers() {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
}
