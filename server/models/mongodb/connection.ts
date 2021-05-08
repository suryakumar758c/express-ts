import mongoose from "mongoose";

import type { Connection } from "mongoose";

const { MONGO_CONNECTION_STRING } = process.env;

const connection: Connection & Promise<Connection> = mongoose.createConnection(
  MONGO_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

connection
  .then((): void => {
    console.log("mongodb connected");
  })
  .catch((error): void => console.log("mongodb connection error", error));

export default connection;
