const router = require('express').Router()
const translate = require('google-translate-api')

router.get('/', (req, res, next) => {
  let fromLang = req.query.fromLang
  let toLang = req.query.toLang
  let speech = req.query.text
  translate(speech, { from: fromLang, to: toLang })
    .then((translation) => {
      res.json(translation.text)
    })
    .catch(next)
})

module.exports = router
