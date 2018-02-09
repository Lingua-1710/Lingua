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
} = require(`./server/db`)

const users = [
  {id: 1, name: `sam`, username: `food`, password: `123`},
  {id: 2, name: `owen`, username: `sushi`, password: `123`},
]

const characters = [
  {
    name: `Octo`,
    startingPromptId: 1
  },
  {
    name: `Gypsy`,
    startingPromptId: 8
  },
  {
    name: `Gypsy3`,
    startingPromptId: 17
  }
]

const quests = [
  {id: 1, name: 'Buy an apple', text: 'Buy an apple', promptResponsesId: 11},
  {id: 2, name: 'Buy cheese', text: 'Buy cheese', promptResponsesId: 12},
  {id: 3, name: 'Buy a cat', text: 'Buy a cat', promptResponsesId: 27},
  {id: 6, name: 'Buy a apple doughnut', text: 'Buy a apple doughnut', promptResponsesId: 62},
  {id: 7, name: 'Discover the secret of the macarons', text: 'Discover the secret of the macarons', promptResponsesId: 80},
]

let userQuests = []
users.forEach(user => {
  quests.forEach(quest => {
    userQuests.push({userId: user.id, questId: quest.id})
  })
})

const characterOnePrompts = [
  {id: 1, text: `Do you want an apple?`},
  {id: 2, text: `Do you want a cheese?`},
  {id: 3, text: `Bye.`},
  {id: 4, text: `The best apple ever!`},
  {id: 5, text: `Here is your apple!`},
  {id: 6, text: `Here is your cheese!`},
  {id: 7, text: `I don't have time for this.`}
]

const characterTwoPrompts = [
  {id: 8, text: `Do you like cats?`},
  {id: 9, text: `Fantastic, I have a cat to sell!`},
  {id: 10, text: `Do you want a fish?`},
  {id: 11, text: `Very, very cute`},
  {id: 12, text: `Here is your cat!`},
  {id: 13, text: `Fantastic, I have a fish to sell!`},
  {id: 14, text: `Sometimes`},
  {id: 15, text: `You don't deserve it!`},
  {id: 16, text: `Here is your fish!`}
]

const characterThreePrompts = [
  {id: 17, text: `Hi, how are you doing today?`},
  {id: 18, text: `I'm doing great, thanks for asking. How many I help you?`},
  {id: 19, text: `Yes it's always sunny here. How may I help you?`},
  {id: 20, text: `That's unfortunate to hear. How about a doughnut to cheer you up?`},
  {id: 21, text: `Really? What kind of doughnut do you want?`},
  {id: 22, text: `Of course the chocolate glazed and apple doughnuts are the best`},
  {id: 23, text: `Ah yes we have jelly doughnuts, strawberry jelly doughnuts, glazed, chocolate glazed, apple, double chocolate, cinnamon...`},
  {id: 24, text: `Wow that's deep! Here are two doughnuts and a macaron, free of charge`},
  {id: 25, text: `That's what I like to hear! What kind of doughnut do you want?`},
  {id: 26, text: `Sure, one jelly doughnut and one apple doughnut. That will be two dollars and fifty cents please.`},
  {id: 27, text: `Here is your chocolate glazed doughnut. That will be one dollar and twenty five cents please.`},
  {id: 28, text: `Here is your apple doughnut. That will be one dollar and twenty five cents please.`},
  {id: 29, text: `One chocolate glazed and one apple doughnut. That will be two dollars and fifty cents please.`},
  {id: 30, text: `Okay, here are your doughnuts. That will be ten dollars please.`},
  {id: 31, text: `Hope you have a fantastic day! Bye.`},
  {id: 32, text: `Let me tell you a secret`},
  {id: 33, text: `It's okay, have a macaron too`},
  {id: 34, text: `Yes, one small cup of coffee. That will be an additional one dollar and fifty cents`},
  {id: 35, text: `Yes the secret of my macarons...`}
]

const prompts = [
  ...characterOnePrompts,
  ...characterTwoPrompts,
  ...characterThreePrompts
]

const characterPrompts = [
  ...characterOnePrompts.map(prompt => {
    return {characterId: 1, promptId: prompt.id}
  }),
  ...characterTwoPrompts.map(prompt => {
    return {characterId: 2, promptId: prompt.id}
  }),
  ...characterThreePrompts.map(prompt => {
    return {characterId: 3, promptId: prompt.id}
  })
]

const characterOneResponses = [
  {id: 1, text: `Yes`},
  {id: 2, text: `No`},
  {id: 3, text: `What kind of apple?`},
  {id: 4, text: `What kind of cheese?`},
  {id: 5, text: `Bye`},
  {id: 6, text: `Okay I'll buy one.`},
  {id: 7, text: `I don't believe you`},
  {id: 8, text: `Impossible`},
  {id: 9, text: `Thanks`}
]

const characterTwoResponses = [
  {id: 10, text: `I love cats`},
  {id: 11, text: `I do not like cats`},
  {id: 12, text: `How cute is the cat?`},
  {id: 13, text: `Perfect, I'll buy it`},
  {id: 14, text: `I love fish`},
  {id: 15, text: `I don't like fish`},
  {id: 16, text: `Is the fish large?`},
  {id: 17, text: `I can get my own`},
  {id: 18, text: `I want a better fish`}
]

const characterThreeResponses = [
  {id: 19, text: `I'm fine, thanks very much. How are you?`},
  {id: 20, text: `I'm doing great, the weather is so nice today`},
  {id: 21, text: `Not so well, every day is a long day`},
  {id: 22, text: `I really really want a doughnut`},
  {id: 23, text: `What do you recommend?`},
  {id: 24, text: `I'm not sure. What do you have?`},
  {id: 25, text: `That's very kind of you but I'm okay. What I need is more than a doughnut.`},
  {id: 26, text: `Yes. That'd be great. Every day is doughnut day.`},
  {id: 27, text: `Let me consider for a minute... Can I have a jelly doughnut and a apple doughnut please?`},
  {id: 28, text: `I'll have a chocolate glazed please.`},
  {id: 29, text: `I'll have a apple doughnut please.`},
  {id: 30, text: `I'll have both please.`},
  {id: 31, text: `I'll take one of each please.`},
  {id: 32, text: `Thanks. That's just what I needed`},
  {id: 33, text: `Wow you're too kind. I'm feeling better already.`},
  {id: 34, text: `Where did the macaron come from?`},
  {id: 35, text: `Here you go. Thanks very much.`},
  {id: 36, text: `Ah I forgot my wallet. I'm so sorry.`},
  {id: 37, text: `Actually could I also have a small cup of coffee please?`},
  {id: 38, text: `I don't want to hear it`},
  {id: 39, text: `What secret?`},
  {id: 40, text: `Yes tell me right now`},
  {id: 41, text: `I'm so sorry. Thanks so much.`}
]

const responses = [
  ...characterOneResponses,
  ...characterTwoResponses,
  ...characterThreeResponses
]

const characterOnePromptResponses = [
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
  {promptId: 6, responseId: 9, nextPromptId: 3},
  {promptId: 7, responseId: 5, nextPromptId: null}
]

const characterTwoPromptResponses = [
  {promptId: 8, responseId: 10, nextPromptId: 9},
  {promptId: 8, responseId: 11, nextPromptId: 10},
  {promptId: 9, responseId: 12, nextPromptId: 11},
  {promptId: 9, responseId: 13, nextPromptId: 12},
  {promptId: 11, responseId: 7, nextPromptId: 15},
  {promptId: 11, responseId: 13, nextPromptId: 12},
  {promptId: 10, responseId: 14, nextPromptId: 13},
  {promptId: 10, responseId: 15, nextPromptId: 7},
  {promptId: 13, responseId: 16, nextPromptId: 14},
  {promptId: 13, responseId: 17, nextPromptId: 7},
  {promptId: 14, responseId: 13, nextPromptId: 16},
  {promptId: 14, responseId: 18, nextPromptId: 7},
  {promptId: 16, responseId: 9, nextPromptId: 3},
  {promptId: 12, responseId: 9, nextPromptId: 3},
  {promptId: 15, responseId: 5, nextPromptId: 3}
]

const characterThreePromptResponses = [
  {promptId: 17, responseId: 19, nextPromptId: 18},
  {promptId: 17, responseId: 20, nextPromptId: 19},
  {promptId: 17, responseId: 21, nextPromptId: 20},
  {promptId: 18, responseId: 22, nextPromptId: 21},
  {promptId: 18, responseId: 23, nextPromptId: 22},
  {promptId: 18, responseId: 24, nextPromptId: 23},
  {promptId: 19, responseId: 22, nextPromptId: 21},
  {promptId: 19, responseId: 23, nextPromptId: 22},
  {promptId: 19, responseId: 24, nextPromptId: 23},
  {promptId: 20, responseId: 23, nextPromptId: 22},
  {promptId: 20, responseId: 25, nextPromptId: 24},
  {promptId: 20, responseId: 26, nextPromptId: 25},
  {promptId: 21, responseId: 23, nextPromptId: 22},
  {promptId: 21, responseId: 24, nextPromptId: 23},
  {promptId: 21, responseId: 27, nextPromptId: 26},
  {promptId: 22, responseId: 28, nextPromptId: 27},
  {promptId: 22, responseId: 29, nextPromptId: 28},
  {promptId: 22, responseId: 30, nextPromptId: 29},
  {promptId: 23, responseId: 23, nextPromptId: 22},
  {promptId: 23, responseId: 29, nextPromptId: 22},
  {promptId: 23, responseId: 31, nextPromptId: 30},
  {promptId: 24, responseId: 32, nextPromptId: 31},
  {promptId: 24, responseId: 33, nextPromptId: 31},
  {promptId: 24, responseId: 34, nextPromptId: 32},
  {promptId: 25, responseId: 23, nextPromptId: 22},
  {promptId: 25, responseId: 24, nextPromptId: 23},
  {promptId: 25, responseId: 27, nextPromptId: 26},
  {promptId: 26, responseId: 35, nextPromptId: 31},
  {promptId: 26, responseId: 36, nextPromptId: 33},
  {promptId: 26, responseId: 37, nextPromptId: 34},
  {promptId: 27, responseId: 35, nextPromptId: 31},
  {promptId: 27, responseId: 36, nextPromptId: 33},
  {promptId: 27, responseId: 37, nextPromptId: 34},
  {promptId: 28, responseId: 35, nextPromptId: 31},
  {promptId: 28, responseId: 36, nextPromptId: 33},
  {promptId: 28, responseId: 37, nextPromptId: 34},
  {promptId: 29, responseId: 35, nextPromptId: 31},
  {promptId: 29, responseId: 36, nextPromptId: 33},
  {promptId: 29, responseId: 37, nextPromptId: 34},
  {promptId: 30, responseId: 35, nextPromptId: 31},
  {promptId: 30, responseId: 36, nextPromptId: 33},
  {promptId: 30, responseId: 37, nextPromptId: 34},
  {promptId: 31, responseId: 5, nextPromptId: null},
  {promptId: 32, responseId: 38, nextPromptId: 31},
  {promptId: 32, responseId: 39, nextPromptId: 35},
  {promptId: 32, responseId: 40, nextPromptId: 20},
  {promptId: 33, responseId: 32, nextPromptId: 31},
  {promptId: 33, responseId: 34, nextPromptId: 32},
  {promptId: 33, responseId: 41, nextPromptId: 31},
  {promptId: 34, responseId: 35, nextPromptId: 31},
  {promptId: 34, responseId: 36, nextPromptId: 33},
  {promptId: 35, responseId: 40, nextPromptId: null}
]

let promptResponses = [
  ...characterOnePromptResponses,
  ...characterTwoPromptResponses,
  ...characterThreePromptResponses
]

promptResponses = promptResponses.map((promptResponse, id) => {
  return {id: id+1, ...promptResponse}
})

const languages = [
  {name: `Spanish`, code: `es-419`, google: `es`},
  {name: `French`, code: `fr-FR`, google: `fr`},
  {name: `German`, code: `de-DE`, google: `de`}
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
    console.log(`Seeding database`)
    return seed(prompts, responses, promptResponses, languages, characterPrompts, characters, users, quests, userQuests)
  })
  .then(() => console.log(`Seeding successful`))
  .catch(err => {
    console.error(`Error while seeding`)
    console.error(err.stack)
  })
  .finally(() => {
    db.close()
    return null
  })
