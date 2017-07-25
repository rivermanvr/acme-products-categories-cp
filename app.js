const express = require( 'express' );
const app = express();
const path = require( 'path' );
const swig = require( 'swig' );
const routesJS = require( './routes/routesJS' );
const routesPG = require( './routes/routesPG' );
const bodyParser = require( 'body-parser' );
const methodOverride = require( 'method-override' );
const dbJS = require( './db/dataJS' );

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false});

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use((req, res, next) => {
  res.locals.error1 = false;
  next();
});

app.use('/js', (req, res, next) => {
  let categories = dbJS.listCat();
  res.locals.catNames = Object.keys(categories);
  res.locals.categories = JSON.stringify(categories, null, '\t');
  res.locals.nav = 'javascript';
  next();
});

app.use('/js', routesJS);
app.use('/pg', routesPG);

app.get('/', (req, res, next) => {
  res.render('index', { nav: 'home' });
});

module.exports = app;
