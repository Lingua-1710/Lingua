const db = require('./db')
const {
  Character,
  Quest,
  CharacterPrompts,
  PromptResponses,
  UserQuests,
  Language,
  Prompt,
  Scene,
  User,
  Response
} = require('./models')

require('./models')

module.exports = {
  Character,
  db,
  Quest,
  CharacterPrompts,
  PromptResponses,
  UserQuests,
  Language,
  Prompt,
  Scene,
  User,
  Response
}
