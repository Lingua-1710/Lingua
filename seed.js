const {
  db,
  Quest,
  Character,
  PromptResponse,
  Language,
  Prompt,
  Scene,
  User,
  Response
} = require('./server/db')

const prompts = [
  {id: 1, text: 'Do you want an apple?'},
  {id: 2, text: 'Do you want a pear?'},
  {id: 3, text: 'Bye!'},
  {id: 4, text: 'The best apple ever!'},
  {id: 5, text: 'Here is your apple'},
  {id: 6, text: 'Here is your pear'},
  {id: 7, text: 'Sorry, I didn\'t understand you'}
]

const responses = [
  {id: 1, text: 'Yes'},
  {id: 2, text: 'No'},
  {id: 3, text: 'What kind of apple?'},
  {id: 4, text: 'What kind of pear?'},
  {id: 5, text: 'Bye'},
  {id: 6, text: 'Okay I\'ll buy one.'},
  {id: 7, text: 'I don\'t believe you'},
  {id: 8, text: 'Is it green?'},
  {id: 9, text: 'Thank you'}
]

let promptResponses = [
  {promptId: 1, responseId: 1, nextPromptId: 5},
  {promptId: 1, responseId: 2, nextPromptId: 2},
  {promptId: 1, responseId: 3, nextPromptId: 4},
  {promptId: 2, responseId: 1, nextPromptId: 6},
  {promptId: 2, responseId: 2, nextPromptId: 3},
  {promptId: 2, responseId: 4, nextPromptId: 7},
  {promptId: 3, responseId: 5, nextPromptId: null},
  {promptId: 4, responseId: 6, nextPromptId: 6},
  {promptId: 4, responseId: 7, nextPromptId: 7},
  {promptId: 4, responseId: 8, nextPromptId: 7},
  {promptId: 5, responseId: 9, nextPromptId: 3},
  {promptId: 6, responseId: 9, nextPromptId: 3}
]

const languages = [
  {name: 'Spanish', code: 'es-419', google: 'es'},
  {name: 'French', code: 'fr-FR', google: 'fr'},
  {name: 'German', code: 'de-DE', google: 'de'},
  {name: 'Italian', code: 'it-IT', google: 'it'},
  {name: 'Korean', code: 'ko-KR', google: 'ko'}
]

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

function addPromptResponses(promptResponses) {
  return promptResponses.forEach((promptResponse) => {
    PromptResponse.create(promptResponse)
  })
}

function addLanguages(languages) {
  return languages.forEach((language) => {
    Language.create(language)
  })
}


function seed(prompts, responses, promptResponses, languages) {
  return Promise.all([
    addPrompts(prompts),
    addResponses(responses),
    addPromptResponses(promptResponses),
    addLanguages(languages)
  ])
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
    return seed(prompts, responses, promptResponses, languages)
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
