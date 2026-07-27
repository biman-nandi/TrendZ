import { addProduct, getProduct, deleteProduct, getAllProduct, addImages, deleteImages, addProductVariants, addAttribute } from "../controllers/products.controller.js";
import { Router } from "express";

export const productRoute = Router()

productRoute.post('/', addProduct)
productRoute.get('/:id', getProduct)
productRoute.delete('/:id', deleteProduct)
productRoute.get('/', getAllProduct)

productRoute.post('/:product_id/product-variant', addProductVariants)

productRoute.post('/variants/:variant_id/images', addImages)
productRoute.delete('/variants/:variant_id/images', deleteImages)

productRoute.post('/variants/:variant_id/attributes', addAttribute)