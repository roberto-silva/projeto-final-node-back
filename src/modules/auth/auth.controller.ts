import {FastifyReply, FastifyRequest} from "fastify";
import {verifyPassword} from "../../utils/hash";
import {findUserByEmail} from "../user/user.service";
import {LoginInput} from "./auth.schema";


export async function loginHandler(request: FastifyRequest<{ Body: LoginInput; }>, reply: FastifyReply) {
    const body: LoginInput = request?.body;
    const user = await findUserByEmail(body?.email || '');

    if (!user) return reply.code(401).send({message: "Invalid email or password"});

    const correctPassword = verifyPassword({candidatePassword: body.password, salt: user.salt, hash: user.password,});

    if (correctPassword) {
        const {password, salt, ...rest} = user;
        return {accessToken: request.jwt.sign(rest)};
    }

    return reply.code(401).send({message: "Invalid email or password"});
}

