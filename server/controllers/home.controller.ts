import type { Request, Response } from "express";

import { ProductsModelOne } from "../models/mongodb/index.model";

import CommonController from "./common.controller";

import type { Document } from "mongoose";

import type { ProductType } from "../types/product.types";

class HomeController extends CommonController {
  test = 1;
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
      const products: Document<ProductType>[] = await ProductsModelOne.find({});
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
      const product: ProductType = request.body;
      const productExists:
        | Document<number | {}>
        | number = await ProductsModelOne.findOne({
        name: product.name,
      }).countDocuments();

      if (productExists) throw new Error("Product already exists!");

      const {
        _id,
      }: Document<any | { _id: string }> = await ProductsModelOne.create(
        product
      );
      product._id = _id;
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
      const { _id, count, name }: ProductType = request.body;
      await ProductsModelOne.updateOne({ _id }, { count, name });
      this.setApiSuccessResponse(response, { _id, count, name });
    } catch (error) {
      this.setApiErrorResponse(response, error);
    }
  }

  public async deleteProduct(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const { _id }: ProductType = request.body;
      await ProductsModelOne.deleteOne({ _id });
      this.setApiSuccessResponse(response, { _id });
    } catch (error) {
      this.setApiErrorResponse(response, error);
    }
  }
}

export default HomeController;
