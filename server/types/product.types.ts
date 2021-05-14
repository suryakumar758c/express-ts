import type { ObjectId } from "mongoose";

interface ProductType {
  name: string;
  count: number;
  _id?: ObjectId | string;
}

interface ProductTypeTwo {
  name: string;
  count: number;
  id: number;
  _id?: string;
}

export type { ProductType, ProductTypeTwo };
