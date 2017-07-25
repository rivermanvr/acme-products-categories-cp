const db = require( './db' );

const defineAttr = {};

const defineMethods = {};

const CategoryProduct = db.define('categoryproduct', defineAttr, defineMethods);

module.exports = CategoryProduct;
