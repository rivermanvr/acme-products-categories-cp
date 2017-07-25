const db = require( './db' );
const Product = require( './Product' );
const Category = require( './Category' );
const CategoryProduct = require( './CategoryProduct' );

Category.belongsToMany(Product, { through: CategoryProduct });
Product.belongsToMany(Category, { through: CategoryProduct });

const sync = () => db.sync({ force: true });

const seed = () => sync()
  .then(() => {
    let categoryArr = ['Hunting', 'Running', 'Swimming', 'Music', 'Outdoors', 'Baseball'];
    let id = 0;
    let promiseArr = categoryArr.map(category => {
      id++;
      return Category.create({ name: category, id });
    })
    Promise.all(promiseArr);
  })
  .then(() => {
    let productArr = ['Bow', 'Arrow', 'Baseball Hat', 'Goggles', 'Gibson', 'Yamaha', 'Poncho', 'Swim Trucks', 'Stetson Hat', 'Wilson Bat', 'Water Bottle'];
    let id = 0;
    let promiseArr = productArr.map(product => {
      id++;
      return Product.create({ name: product, id });
    })
    Promise.all(promiseArr);
  })
  // .then(() => {

  // })


module.exports = { seed, models: { Product, Category, CategoryProduct } };
