const router = require('express').Router();
const translate = require('google-translate-api');

router.get('/', (req, res, next) => {
  console.log('you said: ', req.query)
  translate(req.query, {from: 'en', to: 'es'})
  .then((translation) => res.json(translation.text))
  .catch(next)
});

module.exports = router;
