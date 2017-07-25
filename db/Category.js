const db = require( './db' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
};

const defineMethods = {};

const Category = db.define('category', defineAttr, defineMethods);

module.exports = Category;
