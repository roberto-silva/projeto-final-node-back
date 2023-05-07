import buildServer from "./server";

const server = buildServer();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

async function main() {
    try {

        await server.listen({
            port: PORT
        }).then(() => {
            console.log(`HTTP running, port - ${PORT}`)
        });

    } catch (error: any) {
        console.error(error);
        process.exit(1);
    }
}

main();
