// routes.ts
import express from 'express';
import { welcomePage, getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from '../controllers';

const router = express.Router();

router.get('/', welcomePage);
router.get('/products', getAllProducts);
router.post('/product', createProduct);
router.get('/product/:id', getProductById);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

export default router;