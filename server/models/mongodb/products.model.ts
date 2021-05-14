import { Schema } from "mongoose";

import connection from "./connection";

import type { LeanDocument, Document, Model } from "mongoose";

import type { ProductType } from "../../types/product.types";

interface ProductModelType extends Model<Document<any, {}>> {
  getProducts(): Promise<LeanDocument<Document<ProductType>[]>>;
  addProduct(product: ProductType): Promise<string>;
}

const productsSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

/**
 * get products
 * @returns products
 */
productsSchema.statics.getProducts = async function (): Promise<
  LeanDocument<Document<ProductType>[]>
> {
  return this.find({}).lean();
};

/**
 * add product
 * @param product product details
 * @returns id
 */
productsSchema.statics.addProduct = async function (
  product: ProductType
): Promise<string> {
  const productExists: Document<number | {}> | number = await this.findOne({
    name: product.name,
  })
    .countDocuments()
    .exec();

  if (productExists > 0) throw new Error("Product already exists!");

  const { _id }: Document<any | {}> = await this.create(product);

  return _id.toString();
};

export default connection.model<Document<any, {}>, ProductModelType>(
  "products",
  productsSchema
);
