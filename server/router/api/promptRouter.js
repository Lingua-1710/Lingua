const router = require('express').Router()
const { Prompt, CharacterPrompt } = require('../../db')

router.get('/', (req, res, next) => {
  let query = {where: {}}
  if(req.query.characterId) {
    query.where = {characterId: req.query.characterId}
  }
  CharacterPrompt.findAll(query)
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
