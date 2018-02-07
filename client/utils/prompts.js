export const getCharacterPrompts = (prompts, characterId) => {
  return prompts.filter(prompt => {
    return prompt.characters.find(character => {
      return character.id === characterId
    })
  })
}
