const sequelize = require( 'sequelize' );
const connectDB = process.env.DATABASE_URL || 'postgres://localhost/acme_sql';
const db = new sequelize(connectDB, { logging: false });

module.exports = db;

