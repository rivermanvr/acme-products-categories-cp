const db = require( './db' );
const Product = require( './Product' );
const Category = require( './Category' );
const CategoryProduct = require( './CategoryProduct' );

Category.belongsToMany(Product, { through: CategoryProduct });
Product.belongsToMany(Category, { through: CategoryProduct });

//....remove force true when in production....
const sync = () => db.sync({ force: true });

const seed = () => sync()
  .then(() => {
    //.........putting in a duplicate category so can test validation error handling.......
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
  .then(() => {
    let pairArr =
    [
      [ 1, 1 ], [ 1, 11 ], [ 1, 7 ], [ 1, 2 ], [ 1, 9 ],
      [ 2, 11 ], [ 2, 3 ], [ 2, 7 ], [ 3, 4 ], [ 3, 8 ],
      [ 4, 5 ], [ 4, 6 ], [ 5, 1 ], [ 5, 11 ], [ 5, 3 ],
      [ 5, 7 ], [ 5, 10 ], [ 5, 2 ], [ 5, 9 ], [ 6, 3 ],
      [ 6, 7 ], [ 6, 10 ]
    ];
    let promiseArr = pairArr.map(pair => {
      return CategoryProduct.create({ categoryId: pair[0], productId: pair[1] });
    })
    return Promise.all(promiseArr);
  })
  // .......just an example of getting downstream data..........
  .then(() => Category.findById(2, { include: [{ model: Product }] }
  ))
  .then(category => {
    console.log('category: ', category.dataValues.name);
    console.log('and an example of downstream product data: ', category.dataValues.products[1].name);
    console.log('and a getter ex: ', category.doubleName);

    // you need to invoke the instance method....
    console.log('and an instance ex: ', category.greet());

    // an example of a class method
    return Category.list();
  })
  .then(categories => {
    categories.forEach(category => {
      console.log('an example of a class method: ', category.dataValues);
    })
  });

module.exports = { seed, models: { Product, Category, CategoryProduct } };
