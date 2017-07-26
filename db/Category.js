const db = require( './db' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true
  }
};

const defineOptions = {};

const Category = db.define('category', defineAttr, defineOptions);

module.exports = Category;
