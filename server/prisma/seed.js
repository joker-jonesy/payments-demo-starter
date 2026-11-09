import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const products = [
  { name: 'Mechanical Keyboard', description: 'Tactile switches, RGB backlight.', priceCents: 8999, stock: 25, imageUrl: 'https://picsum.photos/seed/keyboard/400/300' },
  { name: 'Wireless Mouse', description: 'Ergonomic, 6-month battery.', priceCents: 3499, stock: 40, imageUrl: 'https://picsum.photos/seed/mouse/400/300' },
  { name: 'USB-C Hub', description: '7-in-1 hub with HDMI and SD reader.', priceCents: 4599, stock: 30, imageUrl: 'https://picsum.photos/seed/hub/400/300' },
  { name: 'Laptop Stand', description: 'Adjustable aluminum stand.', priceCents: 2999, stock: 50, imageUrl: 'https://picsum.photos/seed/stand/400/300' },
  { name: 'Desk Mat', description: 'Extra-large felt desk mat.', priceCents: 1999, stock: 60, imageUrl: 'https://picsum.photos/seed/deskmat/400/300' },
];

await prisma.orderItem.deleteMany();
await prisma.order.deleteMany();
await prisma.product.deleteMany();
for (const p of products) await prisma.product.create({ data: p });
console.log(`Seeded ${products.length} products`);
await prisma.$disconnect();
