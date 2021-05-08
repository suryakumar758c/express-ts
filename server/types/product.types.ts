import type { ObjectId } from "mongoose";

interface ProductType {
  name: string;
  count: number;
  _id?: ObjectId;
}

export type { ProductType };
