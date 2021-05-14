import type { ObjectId } from "mongoose";

interface ProductType {
  name: string;
  count: number;
  _id?: ObjectId | string;
}

export type { ProductType };
