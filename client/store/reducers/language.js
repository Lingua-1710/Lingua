//ACTION TYPES
const SET_LANGUAGE = 'SET_LANGUAGE'

//ACTION CREATORS
export const setLanguage = language => {
  return {
    type: SET_LANGUAGE,
    language
  }
}

const defaultLanguage = {
  nativeLang: 'en',
  learningLang: 'en',
  learningLangCode: 'en-US'
}

export default function(state = defaultLanguage, action) {
  switch(action.type) {
    case SET_LANGUAGE:
      return Object.assign({}, action.language)
    default:
      return state
  }
}
