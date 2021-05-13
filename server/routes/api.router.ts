import { Router } from "express";

import HomeController from "../controllers/home.controller";

const router: Router = Router();

const homeController: HomeController = new HomeController();

router.get("/", homeController.index);
router.get("/products/get-products", homeController.getProducts);
router.post("/products/add-product", homeController.addProduct);
router.put("/products/update-product", homeController.updateProduct);
router.delete("/products/delete-product", homeController.deleteProduct);

export default router;
