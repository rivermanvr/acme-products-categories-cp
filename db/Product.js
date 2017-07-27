const db = require( './db' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validation: {
      len: {
        args: [1, 22],
        msg: 'Please enter a name with a length from 1 to 22'
      }
    }
  }
};

const defineOptions = {};

const Product = db.define('product', defineAttr, defineOptions);

module.exports = Product;
