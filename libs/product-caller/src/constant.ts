export const ProductServeiceRMQ = {
  name: 'RMQ_PRODUCT_SERVICE',
  service: 'product-project',
};

export const ProductCommands = {
  createProduct: {
    cmd: 'product',
    method: 'create',
  },
  getByProductId: {
    cmd: 'product',
    method: 'getByProductId',
  },
  getAllProducts: {
    cmd: 'product',
    method: 'getAllProducts',
  },
  updateProduct: {
    cmd: 'product',
    method: 'updateProduct',
  },
  deleteProduct: {
    cmd: 'product',
    method: 'deleteProduct',
  },
};

export const CartCommands = {
  createCart: {
    cmd: 'cart',
    method: 'create',
  },
  getByCartId: {
    cmd: 'cart',
    method: 'getCartById',
  },
  getAllCarts: {
    cmd: 'cart',
    method: 'getAllCarts',
  },
  updateCart: {
    cmd: 'cart',
    method: 'updateCart',
  },
  deleteCart: {
    cmd: 'cart',
    method: 'deleteCart',
  },
  getReports: {
    cmd: 'cart',
    method: 'getReports',
  },
};
