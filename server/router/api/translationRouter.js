const router = require('express').Router();
const translate = require('google-translate-api');

router.get('/', (req, res, next) => {
  let query = req.query.speech.split('!')
  let lang = query[0]
  let speech = query[1]
  console.log('req.query', query)
  translate(speech, {from: lang, to: 'en'})
  .then((translation) => {
    console.log('translation:', translation.text)
    res.json(translation.text)
  })
  .catch(next)
});

module.exports = router
