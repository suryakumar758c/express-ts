const { MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env;

import { Sequelize } from "sequelize";

const connection: Sequelize = new Sequelize({
  dialect: "mysql",
  host: MYSQL_HOST,
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

connection
  .authenticate()
  .then((): void => {
    console.log("mysql connected");
  })
  .catch((error): void => console.log("mysql connection error", error));

export default connection;
