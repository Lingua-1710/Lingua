const router = require('express').Router()
const { Quest } = require('../../db')

router.get('/', (req, res, next) => {
  Quest.scope('populated').findAll()
    .then(quests => res.json(quests))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Quest.scope('populated').findById(req.params.id)
    .then(quest => res.json(quest))
    .catch(next)
})

module.exports = router
