const router = require('express').Router()
const languageRouter = require('./languageRouter')
const userRouter = require('./userRouter')
const objectRouter = require('./objectRouter')
const sceneRouter = require('./sceneRouter')
const promptRouter = require('./promptRouter')
const translationRouter = require('./translationRouter')
const responseRouter = require('./responseRouter')

router.use('/languages', languageRouter)
router.use('/users', userRouter)
router.use('/objects', objectRouter)
router.use('/scenes', sceneRouter)
router.use('/prompts', promptRouter)
router.use('/translation', translationRouter)
router.use('/responses', responseRouter)

module.exports = router
