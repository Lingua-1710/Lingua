const router = require('express').Router()
const { Prompt, Character } = require('../../db')

router.get('/', (req, res, next) => {
  CharacterPrompt.findAll()
    .then(characterPrompts => {
      return Promise.all(characterPrompts.map(characterPrompt => {
        return Prompt.scope('populated').findById(characterPrompt.promptId)
      }))
    })
    .then(prompts => res.json(prompts))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Prompt.scope('populated').findById(req.params.id)
    .then(prompt => res.json(prompt))
    .catch(next)
})


module.exports = router
