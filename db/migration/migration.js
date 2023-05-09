const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: String(process.env.PG_USER),
    host: String(process.env.PG_HOST),
    password: String(process.env.PG_PASSWORD),
    port: parseInt(process.env.PG_PORT),
});

const pg = module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
};

const CREATE_DATABASE = `CREATE DATABASE ${process.env.PG_DB};`;
pg.query(CREATE_DATABASE, () => console.log(CREATE_DATABASE));

const INSERT_USER = `INSERT INTO "user" (id, email, password, "roleId", "isDelete") VALUES ('1', 'admin@gmail.com', '$2a$10$CrvQB6BbIJlAdDrDITITH.QqlOUqOuhcmzMbkyVHPOlvRRTjQhr3i', '1', false);`;
pg.query(INSERT_USER, (error) => {
    if (error) {
        console.log(error)
    }
    console.log(INSERT_USER)
});

const INSERT_ROLE = `INSERT INTO "role" (id, name, "isDelete") VALUES ('1', 'admin', false);`;
pg.query(INSERT_ROLE, (error) => {
    if (error) {
        console.log(error)
    }
    console.log(INSERT_ROLE)
});
