const express = require( 'express' );
const router = express.Router();

router.use((req, res, next) => {
  res.locals.nav = 'postgres';
  next();
})

router.get('/categories', (req, res, next) => {
 res.render('indexPG', { navApp: 'home' });
})

module.exports = router;
