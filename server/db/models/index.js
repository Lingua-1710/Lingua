const Item = require('./item')
const Language = require('./language')
const Prompt = require('./prompt')
const Scene = require('./scene')
const User = require('./user')
const Response = require('./response')

User.belongsToMany(Language, { through: 'user_languages' })
Language.belongsToMany(User, { through: 'user_languages' })
User.belongsToMany(Scene, { through: 'user_scenes' })
Scene.belongsToMany(User, { through: 'user_scenes' })
Item.belongsToMany(Prompt, { through: 'prompt_items' })
Prompt.belongsToMany(Item, { through: 'prompt_items' })
Item.belongsToMany(Scene, { through: 'scene_items' })
Scene.belongsToMany(Item, { through: 'scene_items' })
Prompt.hasMany(Response)

module.exports = {
  Item,
  Language,
  Prompt,
  Scene,
  User,
  Response
}
