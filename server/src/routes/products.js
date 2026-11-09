import { Router } from 'express';
import { prisma } from '../db.js';

const router = Router();

router.get('/', async (_req, res) => {
  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
  res.json(products);
});

export default router;
