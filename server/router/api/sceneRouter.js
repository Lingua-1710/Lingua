const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.status(200).send('/api/scenes is working')
  next()
})

module.exports = router
