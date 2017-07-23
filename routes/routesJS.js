const express = require( 'express' );
const router = express.Router();

router.use((req, res, next) => {
  res.locals.nav = 'javascript';
  next();
})

router.get('/categories', (req, res, next) => {
 res.render('indexJS', { navApp: 'home' });
})

module.exports = router;
