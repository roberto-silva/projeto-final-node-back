import {DataSource, DataSourceOptions} from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    migrations: [__dirname + "/db/migrations/*{.js,.ts}"],
    subscribers: [__dirname + "/subscribers/**/*{.js,.ts}"],
    synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
