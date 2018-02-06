const Quest = require('./quest')
const PromptResponse = require('./promptResponse')
const CharacterPrompt = require('./characterPrompt')
const Language = require('./language')
const Prompt = require('./prompt')
const Scene = require('./scene')
const User = require('./user')
const Response = require('./response')

User.belongsToMany(Language, { through: 'user_languages' })
Language.belongsToMany(User, { through: 'user_languages' })

User.belongsToMany(Scene, { through: 'user_scenes' })
Scene.belongsToMany(User, { through: 'user_scenes' })

Scene.belongsToMany(Quest, { through: 'scene_quests' })
Quest.belongsToMany(Scene, { through: 'scene_quests' })

<<<<<<< HEAD
Scene.belongsToMany(Character, { through: 'scene_characters' })
Character.belongsToMany(Scene, { through: 'scene_characters' })

Prompt.belongsToMany(Character, { through: CharacterPrompt })
Character.belongsToMany(Prompt, { through: CharacterPrompt })

=======
>>>>>>> c5a6e8cf4e29803aa3b6e35e297e7bb18da7d1d5
Prompt.belongsToMany(Response, { through: PromptResponse })
Response.belongsToMany(Prompt, { through: PromptResponse })

module.exports = {
  Quest,
  PromptResponse,
  CharacterPrompt,
  Language,
  Prompt,
  Scene,
  User,
  Response
}
