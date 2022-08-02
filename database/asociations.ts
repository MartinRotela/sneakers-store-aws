import Brand from '../models/brands';
import Product from '../models/product';

Brand.hasMany(Product, { as: 'products' });
Product.belongsTo(Brand);
