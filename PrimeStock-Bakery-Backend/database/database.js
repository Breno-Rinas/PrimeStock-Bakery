const roles = [
  {
    id: 1,
    name: 'Admin',
    description: 'Administrator - full access to all features',
    permissions: ['dashboard', 'products', 'shopping-list', 'settings', 'users']
  },
  {
    id: 2,
    name: 'Buyer',
    description: 'Buyer - can only access shopping list',
    permissions: ['shopping-list']
  }
];

const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@primestock.com',
    password: 'admin123',
    role_id: 1,
  },
  {
    id: 2,
    name: 'Buyer User',
    email: 'buyer@primestock.com',
    password: 'buyer123',
    role_id: 2,
  }
];

const products = [
  {
    id: 1,
    name: 'Flour (All-Purpose)',
    unit: 'kg',
    price: 5.99,
    stock_quantity: 50,
    image_url: '/uploads/products/flour.jpg',
    description: 'High-quality all-purpose flour for baking',
  },
  {
    id: 2,
    name: 'Sugar (Granulated)',
    unit: 'kg',
    price: 3.49,
    stock_quantity: 75,
    image_url: '/uploads/products/sugar.jpg',
    description: 'Pure granulated sugar for baking',
   
  },
 
];

const shoppingList = [
  {
    id: 1,
    product_id: 1,
    product_name: 'Flour (All-Purpose)',
    quantity: 10,
    product_unit: 'kg',
    priority: 'high',
    status: 'pending',
  },
  
];

export const database = {
  roles,
  users,
  products,
  shoppingList
};

export default database;
