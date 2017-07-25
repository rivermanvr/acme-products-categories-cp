const db = require( './db' );
const Product = require( './Product' );
const Category = require( './Category' );

const sync = () => db.sync({ force: true });

//........More to come:
const seed = () => sync();

module.exports = { seed, models: { Product, Category } };
