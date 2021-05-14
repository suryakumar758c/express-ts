import { Model, DataTypes } from "sequelize";

import connection from "./connection";

import type { ProductTypeTwo } from "../../types/product.types";

interface ProductAttributes {
  id: number;
  name: string;
  count: number;
}

class ProductsModel
  extends Model<ProductAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public count: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * get products
   * @returns products
   */
  public static async getProducts(): Promise<ProductTypeTwo[]> {
    return this.findAll();
  }

  /**
   * add product
   * @param product product details
   * @returns id
   */
  public static async addProduct(product: ProductTypeTwo): Promise<string> {
    const productExists: number = await this.count({
      where: { name: product.name },
    });

    if (productExists > 0) throw new Error("Product already exists!");

    const { id }: ProductsModel = await this.create(product);

    return id.toString();
  }

  /**
   * update product
   * @param product product detail
   */
  public static async updateProduct(product: ProductTypeTwo): Promise<void> {
    const { _id: id, count, name }: ProductTypeTwo = product;
    await this.update({ count, name }, { where: { id } });
  }

  /**
   * delete product
   * @param id id
   */
  public static async deleteProduct(id: string): Promise<void> {
    this.destroy({ where: { id } });
  }
}

ProductsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { tableName: "products", sequelize: connection, timestamps: true }
);

ProductsModel.sync()
  .then((data): void => {
    console.log("table created", data);
  })
  .catch((error): void => console.log("products table error", error));

export default ProductsModel;
