const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.status(200).send('/api/prompts is working')
  next()
})

module.exports = router
