const {
  MYSQL_HOST,
  MYSQL_PORT = 3306,
  MYSQL_USER,
  MYSQL_ROOT_PASSWORD,
  MYSQL_DB,
} = process.env;

import { Sequelize } from "sequelize";

const connection: Sequelize = new Sequelize({
  dialect: "mysql",
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  username: MYSQL_USER,
  password: MYSQL_ROOT_PASSWORD,
  database: MYSQL_DB,
});

connection
  .authenticate()
  .then((): void => {
    console.log("mysql connected");
  })
  .catch((error): void => console.log("mysql connection error", error));

export default connection;
