const db = require( './db' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validation: {
      notEmpty: true,
      len: {
        args: [1, 22],
        msg: 'Please enter a name with a length from 1 to 22'
      }
    }
  }
};

const defineOptions = {
  // getter example:
  getterMethods: {
    doubleName: function () {
      return this.name + ' ' + this.name;
    }
  }
};

const Category = db.define('category', defineAttr, defineOptions);

module.exports = Category;
