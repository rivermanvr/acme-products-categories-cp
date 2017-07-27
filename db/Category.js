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
  // just a getter example:
  getterMethods: {
    doubleName: function () {
      return this.name + ' ' + this.name;
    }
  }
};

const Category = db.define('category', defineAttr, defineOptions);

// just an example of an instance method:
Category.prototype.greet = function () {
  return `The category record that you selected is ${this.name}`;
};

Category.list = function () {
  return this.findAll()
}

module.exports = Category;
