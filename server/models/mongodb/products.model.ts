import { Schema } from "mongoose";

import connection from "./connection";

const productsSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

export default connection.model("products", productsSchema);
