import joi from "joi";

import type { Request, Response } from "express";

import { ProductsModelOne } from "../models/mysql/index.model";

import CommonController from "./common.controller";

import type { ProductTypeTwo as ProductType } from "../types/product.types";

class ProductController extends CommonController {
  constructor() {
    super();
    this.index = this.index.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  /**
   * index
   * @param _ request
   * @param response response
   */
  public index(_: Request, response: Response): void {
    this.setApiSuccessResponse(response, {});
  }

  /**
   * to get products list
   * @param _ request
   * @param response response
   */
  public async getProducts(_: Request, response: Response): Promise<void> {
    try {
      const products: ProductType[] = await ProductsModelOne.getProducts();
      this.setApiSuccessResponse(response, products);
    } catch (error) {
      this.setApiErrorResponse(response, error);
    }
  }

  /**
   * to add new product
   * @param request request
   * @param response response
   */
  public async addProduct(request: Request, response: Response): Promise<void> {
    try {
      const productSchema: joi.ObjectSchema<ProductType> = joi
        .object({
          name: joi.string().required(),
          count: joi.number().required(),
        })
        .required();

      const product: ProductType = await productSchema.validateAsync(
        request.body
      );

      product._id = await ProductsModelOne.addProduct(product);
      this.setApiSuccessResponse(response, product);
    } catch (error) {
      this.setApiErrorResponse(response, error);
    }
  }

  /**
   * to update a product
   * @param request request
   * @param response response
   */
  public async updateProduct(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const product: ProductType = request.body;
      await ProductsModelOne.updateProduct(product);
      this.setApiSuccessResponse(response, product);
    } catch (error) {
      this.setApiErrorResponse(response, error);
    }
  }

  /**
   * delete product
   * @param request request
   * @param response response
   */
  public async deleteProduct(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const { _id }: ProductType = request.body;
      await ProductsModelOne.deleteProduct(_id);
      this.setApiSuccessResponse(response, { _id });
    } catch (error) {
      this.setApiErrorResponse(response, error);
    }
  }
}

export default ProductController;
