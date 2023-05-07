import {createUser, findUserByEmail, findUsers, removeUserByEmail, updateUser} from "./user.service";
import {FastifyReply, FastifyRequest} from "fastify";
import {CreateUserInput, FindeUserInput, UpdateUserInput} from "./user.schema";


export async function getUsersHandler(request: FastifyRequest<any>, reply: FastifyReply) {
    try {
        const users: any[] = await findUsers();
        return reply.code(201).send(users);
    } catch (error: any) {
        console.log(error);
        return reply.code(500).send(error);
    }
}

export async function getUsersByEmailHandler(request: FastifyRequest<{ Params: FindeUserInput; }>, reply: FastifyReply) {
    try {
        const user = await findUserByEmail(request?.params?.email || '');
        return reply.code(201).send(user);
    } catch (error: any) {
        console.log(error);
        return reply.code(500).send(error);
    }
}

export async function postUserHandler(request: FastifyRequest<{ Body: CreateUserInput; }>, reply: FastifyReply) {
    try {
        const user = await createUser(request?.body || {});
        return reply.code(201).send(user);
    } catch (error: any) {
        console.log(error);
        return reply.code(500).send(error);
    }
}

export async function putUserHandler(request: FastifyRequest<{ Body: UpdateUserInput; Params: FindeUserInput; }>, reply: FastifyReply) {
    try {
        const user = await updateUser(request?.params?.email || '', request?.body || {});
        return reply.code(201).send(user);
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}

export async function deleteUsersByEmailHandler(request: FastifyRequest<{ Params: FindeUserInput; }>, reply: FastifyReply) {
    try {
        const user = await removeUserByEmail(request?.params?.email || '');
        return reply.code(201).send(user);
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}

