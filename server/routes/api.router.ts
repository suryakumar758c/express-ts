import { Router } from "express";

import ProductController from "../controllers/product.mysql.controller";

const router: Router = Router();

const productController: ProductController = new ProductController();

router.get("/", productController.index);
router.get("/products/get-products", productController.getProducts);
router.post("/products/add-product", productController.addProduct);
router.put("/products/update-product", productController.updateProduct);
router.delete("/products/delete-product", productController.deleteProduct);

export default router;
