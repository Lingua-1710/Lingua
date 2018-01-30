const {
  db,
  Item,
  Langugage,
  Prompt,
  Scene,
  User,
  Responses
} = require('./server/db')

const items = []
const prompts = [
  {text: 'Hello, how are you?'},
  {text: 'Would you like to buy a cat?'},
  {text: 'Would you like some nice ham? It\'s very dry.'},
  {text: 'How about some kidneys?'},
  {text: 'Are you a cop?'}
]
const responses = [
  {text: 'I am a goose', isCorrect: false, promptId: 1},
  {text: 'You are a tasty muffin', isCorrect: false, id: 1},
  {text: 'I am doing well, thank you', isCorrect: true, id: 1},
  {text: 'Yes, I would like to buy a dog', isCorrect: false, id: 2},
  {text: 'Yes, I love bananas', isCorrect: false, id: 2},
  {text: 'Yes, I would like to buy a cat', isCorrect: true, id: 2},
  {text: 'Yes, I am a vegetarian', isCorrect: false, id: 3},
  {text: 'No, my cousin is a pig', isCorrect: false, id: 3},
  {text: 'Yes, I would love some dry ham', isCorrect: true, id: 3},
  {text: 'Yes, I would love to purchase a foot', isCorrect: false, id: 4},
  {text: 'Are they tasty?', isCorrect: false, id: 4},
  {text: 'Yes please, you can never have too many kidneys', isCorrect: true, id: 4},
  {text: 'Yes, I am a parrot', isCorrect: false, id: 5},
  {text: 'Yes, I am a cop', isCorrect: false, id: 5},
  {text: 'No, I am not a cop', isCorrect: true, id: 5}
]
const languages = [
  {name: 'Spanish', code: 'es-419', google: 'es'},
  {name: 'French', code: 'fr-FR', google: 'fr'},
  {name: 'German', code: 'de-DE', google: 'de'},
  {name: 'Italian', code: 'it-IT', google: 'it'},
  {name: 'Korean', code: 'ko-KR', google: 'ko'}
]
// const scenes = []
// const users = []

// items.forEach((item) => {
//   Item.create(item)
// })
function addPrompts(prompts) {
  return prompts.forEach((prompt) => {
    Prompt.create(prompt)
  })
}

function addResponses(responses) {
  return responses.forEach((response) => {
    Response.create(response)
  })
}

function addLanguages(languages) {
  return languages.forEach((language) => {
    Language.create(language)
  })
}


function seed(prompts, responses, languages) {
  return Promise.all([addPrompts(prompts), addResponses(responses), addLanguages(languages)])
}


// scenes.forEach((scene) => {
//   Scene.create(scene)
// })

// users.forEach((user) => {
//   User.create(user)
// })

db.sync({force: true})
  .then(() => {
    console.log('Seeding database')
    return seed(prompts, responses, languages)
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding')
    console.error(err.stack)
  })
  .finally(() => {
    db.close()
    return null
  })
