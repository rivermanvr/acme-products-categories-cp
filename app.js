const express = require( 'express' );
const app = express();
const path = require( 'path' );
const swig = require( 'swig' );
const routesJS = require( './routes/routesJS' );
const routesPG = require( './routes/routesPG' );

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false});

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use('/js', routesJS);
app.use('/pg', routesPG);

app.get('/', (req, res, next) => {
  res.render('index', { nav: 'home' });
});

module.exports = app;
