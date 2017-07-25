const db = require( './db' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
};

const defineMethods = {};

const Product = db.define('product', defineAttr, defineMethods);

module.exports = Product;
