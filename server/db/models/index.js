const Quest = require('./quest')
const Character = require('./character')
const PromptResponses = require('./promptResponses')
const CharacterPrompts = require('./characterPrompts')
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

Prompt.belongsToMany(Character, { through: CharacterPrompts })
Character.belongsToMany(Prompt, { through: CharacterPrompts })

Prompt.belongsToMany(Response, { through: PromptResponses })
Response.belongsToMany(Prompt, { through: PromptResponses })

module.exports = {
  Quest,
  PromptResponses,
  CharacterPrompts,
  Language,
  Prompt,
  Scene,
  User,
  Response,
  Character
}
