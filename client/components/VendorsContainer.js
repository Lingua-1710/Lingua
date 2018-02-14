import { connect } from 'react-redux'
import FirstVendor from './FirstVendor'
import SecondVendor from './SecondVendor'
import ThirdVendor from './ThirdVendor'
import { getPrompt, setCharacter, translateResponse, getLoading } from '../store'

export const mapState = (storeState, ownProps) => {
  const numResponses = storeState.currentPrompt.responses ? storeState.currentPrompt.responses.length : 0
  const correctAdjustPosition = { x: 0, y: -.1, z: 1 }
  const promptAdjustPosition = { x: 0, y: 2 + numResponses, z: -1 }
  const hintAdjustPosition = { x: 0, y: -0.5, z: -1 }
  const responseAdjustPosition = { x: 0, y: 2, z: -1 }
  const listeningAdjustPosition = { x: .5, y: 1, z: 0}
  const matchCharacter = storeState.currentCharacter === ownProps.characterId
  const displayPromptResponses = storeState.currentPrompt && matchCharacter
  return {
    currentPrompt: storeState.currentPrompt,
    vendorResponse: storeState.vendorResponse,
    language: storeState.currentLanguage,
    currentQuest: storeState.currentQuest,
    currentCharacter: storeState.currentCharacter,
    currentLanguage: storeState.currentLanguage,
    correctAdjustPosition,
    promptAdjustPosition,
    hintAdjustPosition,
    responseAdjustPosition,
    matchCharacter,
    displayPromptResponses,
    listeningAdjustPosition
  }
}

export const mapDispatch = (dispatch) => {
  return {
    setCurrentPrompt: (prompt) => dispatch(getPrompt(prompt)),
    setCurrentCharacter: (character) => dispatch(setCharacter(character)),
    getVendorResponse: (response, learningLang, nativeLang) => dispatch(translateResponse(response, learningLang, nativeLang)),
    setLoading: (loading) => dispatch(getLoading(loading))
  }
}

export const FirstVendorContainer = connect(mapState, mapDispatch)(FirstVendor)
export const SecondVendorContainer = connect(mapState, mapDispatch)(SecondVendor)
export const ThirdVendorContainer = connect(mapState, mapDispatch)(ThirdVendor)
