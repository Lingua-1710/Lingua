const router = require('express').Router()
const { Prompt, Character } = require('../../db')

const getPrompts = () => {
  return Prompt.scope('populated').findAll()
}

const getPromptsByCharacterId = (characterId) => {
  return Prompt.scope('populated').findAll({
    include: [{
      model: Character,
      where: {
        id: characterId
      }
    }]
  })
}

router.get('/', (req, res, next) => {
  const characterId = Number(req.query.characterId)
  const get = characterId ? getPromptsByCharacterId : getPrompts
  get(characterId)
    .then(prompts => {
      return res.json(prompts)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Prompt.scope('populated').findById(req.params.id)
    .then(prompt => res.json(prompt))
    .catch(next)
})

module.exports = router
