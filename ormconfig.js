require('dotenv/config');

const sync = process.env.PG_SYNC === 'true' || process.env.PG_SYNC === true;

const extra = process.env.PG_SSL && process.env.PG_SSL === 'true' ? {
    ssl: true,
    rejectUnauthorized: false
} : {};

module.exports = {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: sync,
    entities: [
        "{src,dist}/**/*.entity{.ts,.js} "
    ],
    extra: extra,
    migrations: [ "src/migration/**/*.ts" ],
    subscribers: [ "src/subscriber/**/*.ts" ],
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
    },
};