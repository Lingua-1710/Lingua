const router = require('express').Router()
const { Character } = require('../../db')

router.get('/', (req, res, next) => {
  Character.findAll()
    .then(characters => res.json(characters))
    .catch(next)
})

router.get('/:characterId', (req, res, next) => {
  Character.findById(req.params.characterId)
    .then(character => res.json(character))
    .catch(next)
})

module.exports = router
