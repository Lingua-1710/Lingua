const router = require('express').Router()
const { Prompt } = require('../../db')

router.get('/', (req, res, next) => {
  Prompt.scope('populated').findAll()
    .then(prompts => res.json(prompts))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Prompt.scope('populated').findById(req.params.id)
    .then(prompt => res.json(prompt))
    .catch(next)
})


module.exports = router
