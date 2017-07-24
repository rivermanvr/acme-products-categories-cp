const express = require( 'express' );
const router = express.Router();
const dbJS = require( '../db/dataJS' );

router.use((req, res, next) => {
  let categories = dbJS.listCat();
  res.locals.catNames = Object.keys(categories);
  res.locals.categories = JSON.stringify(categories, null, '\t');
  res.locals.nav = 'javascript';
  next();
});

//Category Routes Follow:

//...Categories Home...
router.get('/categories', (req, res, next) => {
 res.render('indexJS', { navApp: 'home', action: true });
});

//...Categories Home plus edit page...
router.get('/categories/:name', (req, res, next) => {
 res.render('indexJS', { navApp: 'home', action: false, actionValue: req.params.name });
});

//...After editing Category, the actual put occurs...
router.put('/categories/:name', (req, res, next) => {
  dbJS.changeCat(req.params.name, req.body.nameChg);
    res.redirect('/js/categories');
});

//...adding a new category
router.post('/categories', (req, res, next) => {
  let returnVal = dbJS.addCat(req.body.name);
  if (!returnVal){
    res.locals.error1 = true;
    res.render('indexJS', { navApp: 'home', name: req.body.name });
  }else {
    res.redirect('/js/categories');
  }
});

//...removing a category...
router.delete('/categories/:name', (req, res, next) => {
  dbJS.removeCat(req.params.name);
  res.redirect('/js/categories');
});

//Product Routes Follow:

//...Category/Products Home page...
router.get('/categories/:name/products', (req, res, next) => {
  let products = dbJS.listCat(req.params.name);
 res.render('productsJS', { navApp: req.params.name, products, action: true });
});

//...Category/Products Home plus edit page...
router.get('/categories/:name/products/:id', (req, res, next) => {
  let products = dbJS.listCat(req.params.name);
  res.render('productsJS', { navApp: req.params.name, action: false, products, actionValue: req.params.id });
});

//...After editing Category, the actual put occurs...
router.put('/categories/:name/products/:id', (req, res, next) => {
  dbJS.changeProd(req.params.id, req.body.nameChg, req.params.name);
  res.redirect(`/js/categories/${req.params.name}/products`);
});

//...adding a new product
router.post('/categories/:name/products', (req, res, next) => {
  let returnVal = dbJS.addProd(req.body.name, req.params.name);
  if (!returnVal){
    res.locals.error1 = true;
    let products = dbJS.listCat(req.params.name);
    res.render('productsJS', { navApp: req.params.name, products, action: true, name: req.body.name });
  } else {
    res.redirect(`/js/categories/${req.params.name}/products`);
  }
});

//...removing a product from a category...
router.delete('/categories/:name/products/:id', (req, res, next) => {
  dbJS.removeProd(req.params.id, req.params.name);
  res.redirect(`/js/categories/${req.params.name}/products`);
});

module.exports = router;
