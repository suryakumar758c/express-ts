import { Schema } from "mongoose";

import connection from "./connection";

import type { LeanDocument, Document, Model, ObjectId } from "mongoose";

import type { ProductType } from "../../types/product.types";

interface ProductModelType extends Model<Document<any, {}>> {
  getProducts(): Promise<LeanDocument<Document<ProductType>[]>>;
  addProduct(product: ProductType): Promise<string>;
  updateProduct(product: ProductType): Promise<void>;
  deleteProduct(_id: string | ObjectId): Promise<void>;
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
  const productExists: Document<number, {}> | number = await this.findOne({
    name: product.name,
  })
    .countDocuments()
    .exec();

  if (productExists > 0) throw new Error("Product already exists!");

  const { _id }: Document<any, {}> = await this.create(product);

  return _id.toString();
};

/**
 * update product
 * @param product product detail
 */
productsSchema.statics.updateProduct = async function (
  product: ProductType
): Promise<void> {
  const { _id, count, name }: ProductType = product;
  await this.updateOne({ _id }, { count, name }).exec();
};

/**
 * delete product
 * @param _id id
 */
productsSchema.statics.deleteProduct = async function (
  _id: string | ObjectId
): Promise<void> {
  await this.deleteOne({ _id }).exec();
};

export default connection.model<Document<any, {}>, ProductModelType>(
  "products",
  productsSchema
);
