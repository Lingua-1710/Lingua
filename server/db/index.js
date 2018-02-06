const db = require('./db')
const {
  Quest,
  PromptResponse,
  Language,
  Prompt,
  Scene,
  User,
  Response
} = require('./models')

require('./models')

module.exports = {
  db,
  Quest,
  PromptResponse,
  Language,
  Prompt,
  Scene,
  User,
  Response
}
