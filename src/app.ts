import buildServer from "./server";

const server = buildServer();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

async function main() {
  try {
    await server.listen(PORT);

    console.log(`Server ready at http://localhost:3000`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
