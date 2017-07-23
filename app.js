const express = require( 'express' );
const app = express();
const path = require( 'path' );
const swig = require( 'swig' );

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false});

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res, next) => {
  res.render('index');
})

module.exports = app;
