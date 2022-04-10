const config = require("./dist/config").default;
module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  supportBigNumbers: false,
  synchronize: false, // Alway use migration.
  // migrationsRun: false,
  logging: true,
  charset: "utf8mb4",
  migrationsTableName: "migration",
  entities: ["dist/entities/**/*.js", "dist/modules/**/entities/**/*.js"],
  migrations: ["dist/database/migrations/**/*.js"],
  subscribers: ["dist/database/subscribers/**/*.js"],
  timezone: "Z",
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/database/migrations",
    subscribersDir: "src/database/subscribers",
  },
};
