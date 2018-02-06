const router = require('express').Router()
const { Language } = require('../../db')

router.get('/', (req, res, next) => {
  Language.findAll()
  .then(languages => res.json(languages))
  .catch(next)
})

module.exports = router
