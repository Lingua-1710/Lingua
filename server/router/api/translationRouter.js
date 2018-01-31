const router = require('express').Router()
const translate = require('google-translate-api')

router.get('/', (req, res, next) => {
  let query = req.query.translate.split('!')
  let fromLang = query[0]
  let toLang = query[1]
  let speech = query[2]
  translate(speech, { from: fromLang, to: toLang })
    .then((translation) => {
      res.json(translation.text)
    })
    .catch(next)
})

module.exports = router
