import type { Request, Response } from "express";

import { ProductsModelOne } from "../models/mongodb/index.model";

import CommonController from "./common.controller";

import type { Document } from "mongoose";

import type { ProductType } from "../types/product.types";

class HomeController extends CommonController {
  /**
   * index
   * @param _ request
   * @param response response
   */
  index(_: Request, response: Response): void {
    this.setApiSuccessResponse(response, {});
  }

  /**
   * to get products list
   * @param _ request
   * @param response response
   */
  async getProducts(_: Request, response: Response): Promise<void> {
    try {
      const products: Document<ProductType>[] = await ProductsModelOne.find({});
      this.setApiSuccessResponse(response, products);
    } catch (error) {
      this.setApiErrorResponse(response, error.message);
    }
  }
}

export default new HomeController();
