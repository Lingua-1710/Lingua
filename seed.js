const {
  db,
  Quest,
  PromptResponses,
  CharacterPrompts,
  UserQuests,
  Language,
  Prompt,
  Character,
  Scene,
  User,
  Response
} = require('./server/db')

const users = [
  {id: 1, name: 'sam', username: 'food', password: '123'},
  {id: 2, name: 'owen', username: 'sushi', password: '123'},
]

const characters = [
  {
    id: 1,
    name: 'Octo',
    startingPromptId: 1
  },
  {
    id: 2,
    name: 'Gypsy',
    startingPromptId: 8
  }
]

const quests = [
  {id: 1, name: 'Buy an apple', text: 'Buy an apple', promptResponsesId: 1},
  {id: 2, name: 'Buy cheese', text: 'Buy cheese', promptResponsesId: 12},
  {id: 3, name: 'Buy a cat', text: 'Buy a cat', promptResponsesId: 27},
  {id: 4, name: 'Buy a fish', text: 'Buy a fish', promptResponsesId: 26}
]

let userQuests = []
users.forEach(user => {
  quests.forEach(quest => {
    userQuests.push({userId: user.id, questId: quest.id})
  })
})

const characterPrompts = [
  {characterId: 1, promptId: 1},
  {characterId: 1, promptId: 2},
  {characterId: 1, promptId: 3},
  {characterId: 1, promptId: 4},
  {characterId: 1, promptId: 5},
  {characterId: 1, promptId: 6},
  {characterId: 1, promptId: 7},
  {characterId: 2, promptId: 3},
  {characterId: 2, promptId: 7},
  {characterId: 2, promptId: 8},
  {characterId: 2, promptId: 9},
  {characterId: 2, promptId: 10},
  {characterId: 2, promptId: 11},
  {characterId: 2, promptId: 12},
  {characterId: 2, promptId: 13},
  {characterId: 2, promptId: 14},
  {characterId: 2, promptId: 15},
  {characterId: 2, promptId: 16}
]

const prompts = [
  {id: 1, text: 'Do you want an apple?'},
  {id: 2, text: 'Do you want cheese?'},
  {id: 3, text: 'Bye!'},
  {id: 4, text: 'The best apple ever!'},
  {id: 5, text: 'Here is your apple'},
  {id: 6, text: 'Here is your cheese'},
  {id: 7, text: 'I don\'t have time for this.'},
  {id: 8, text: 'Do you like cats?'},
  {id: 9, text: 'Fantastic, I have a cat to sell!'},
  {id: 10, text: 'Do you want a fish?'},
  {id: 11, text: 'Very, very cute'},
  {id: 12, text: 'Here is your cat'},
  {id: 13, text: 'Fantastic, I have a fish to sell!'},
  {id: 14, text: 'Sometimes'},
  {id: 15, text: 'You don\'t deserve it'},
  {id: 16, text: 'Here is your fish'}
]

const responses = [
  {id: 1, text: 'Yes'},
  {id: 2, text: 'No'},
  {id: 3, text: 'What kind of apple?'},
  {id: 4, text: 'What kind of cheese?'},
  {id: 5, text: 'Bye'},
  {id: 6, text: 'Okay I\'ll buy one.'},
  {id: 7, text: 'I don\'t believe you'},
  {id: 8, text: 'Impossible'},
  {id: 9, text: 'Thank you'},
  {id: 10, text: 'I love cats'},
  {id: 11, text: 'I do not like cats'},
  {id: 12, text: 'How cute is the cat?'},
  {id: 13, text: 'Perfect, I\'ll buy it'},
  {id: 14, text: 'I love fish'},
  {id: 15, text: 'I don\'t like fish'},
  {id: 16, text: 'Is the fish large?'},
  {id: 17, text: 'I can get my own'},
  {id: 18, text: 'I want a better fish'}
]

const promptResponses = [
  {id: 1, promptId: 1, responseId: 1, nextPromptId: null},
  {id: 2, promptId: 1, responseId: 2, nextPromptId: 2},
  {id: 3, promptId: 1, responseId: 3, nextPromptId: 4},
  {id: 4, promptId: 2, responseId: 1, nextPromptId: 6},
  {id: 5, promptId: 2, responseId: 2, nextPromptId: 3},
  {id: 6, promptId: 2, responseId: 4, nextPromptId: 7},
  {id: 7, promptId: 3, responseId: 5, nextPromptId: null},
  {id: 8, promptId: 4, responseId: 6, nextPromptId: 6},
  {id: 9, promptId: 4, responseId: 7, nextPromptId: 7},
  {id: 10, promptId: 4, responseId: 8, nextPromptId: 7},
  {id: 11, promptId: 5, responseId: 9, nextPromptId: 3},
  {id: 12, promptId: 6, responseId: 9, nextPromptId: 3},
  {id: 13, promptId: 7, responseId: 5, nextPromptId: null},
  {id: 14, promptId: 8, responseId: 10, nextPromptId: 9},
  {id: 15, promptId: 8, responseId: 11, nextPromptId: 10},
  {id: 16, promptId: 9, responseId: 12, nextPromptId: 11},
  {id: 17, promptId: 9, responseId: 13, nextPromptId: 12},
  {id: 18, promptId: 11, responseId: 7, nextPromptId: 15},
  {id: 19, promptId: 11, responseId: 13, nextPromptId: 12},
  {id: 20, promptId: 10, responseId: 14, nextPromptId: 13},
  {id: 21, promptId: 10, responseId: 15, nextPromptId: 7},
  {id: 22, promptId: 13, responseId: 16, nextPromptId: 14},
  {id: 23, promptId: 13, responseId: 17, nextPromptId: 7},
  {id: 24, promptId: 14, responseId: 13, nextPromptId: 16},
  {id: 25, promptId: 14, responseId: 18, nextPromptId: 7},
  {id: 26, promptId: 16, responseId: 9, nextPromptId: 3},
  {id: 27, promptId: 12, responseId: 9, nextPromptId: 3},
  {id: 28, promptId: 15, responseId: 5, nextPromptId: 3}
]

const languages = [
  {name: 'Spanish', code: 'es-419', google: 'es'},
  {name: 'French', code: 'fr-FR', google: 'fr'},
  {name: 'German', code: 'de-DE', google: 'de'}
]

function addPrompts(prompts) {
  return Promise.all(prompts.map(prompt => Prompt.create(prompt)))
}

function addResponses(responses) {
  return Promise.all(responses.map(response => Response.create(response)))
}

function addLanguages(languages) {
  return languages.forEach((language) => {
    Language.create(language)
  })
}

function addCharacters(characters) {
  return Promise.all(characters.map(character => Character.create(character)))
}

function addUsers(users) {
  return users.forEach((user) => {
    User.create(user)
  })
}

function addQuests(quests) {
  return quests.forEach((quest) => {
    Quest.create(quest)
  })
}

function addPromptResponses(promptResponses) {
  return Promise.all(promptResponses.map(promptResponse => PromptResponses.create(promptResponse)))
}

function addCharacterPrompts(characterPrompts) {
  return Promise.all(characterPrompts.map(characterPrompt => CharacterPrompts.create(characterPrompt)))
}

function addUserQuests(userQuests) {
  return Promise.all(userQuests.map(userQuest => UserQuests.create(userQuest)))
}

function seed(prompts, responses, promptResponses, languages, characterPrompts, characters, users, quests, userQuests) {
  return Promise.all([
    addLanguages(languages),
    addPrompts(prompts),
    addResponses(responses),
    addCharacters(characters),
    addUsers(users),
    addQuests(quests)
  ])
    .then(() => Promise.all([
      addUserQuests(userQuests),
      addPromptResponses(promptResponses),
      addCharacterPrompts(characterPrompts)
    ]))
}

db.sync({force: true})
  .then(() => {
    console.log('Seeding database')
    return seed(prompts, responses, promptResponses, languages, characterPrompts, characters, users, quests, userQuests)
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
