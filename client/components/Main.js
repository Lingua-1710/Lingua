import React from 'react'
import { connect } from 'react-redux'
import { Scene, Entity } from 'aframe-react'
import { getCharacterPrompts } from '../utils'
import { Vendors, Player, HomeScreen, EnterScene, Loading, PickLanguage, PickQuest } from './index'

const Main = (props) => {
  const { prompts, characters, gameState } = props
  let characterPrompts = {}
  if (characters.length && prompts.length) {
    characters.map(character => characterPrompts[character.id] = getCharacterPrompts(prompts, character.id))
  }
  return (
    <Scene
      id="scene"
      inspector="url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js"
      environment={{
        preset: 'forest',
        seed: 2,
        lighting: 'distant',
        lightPosition: {
          x: -0.110,
          y: 1.000,
          z: 0.330
        },
        fog: 0.8,
        ground: 'hills',
        groundYScale: 6.31,
        groundTexture: 'none',
        groundColor: '#2c441f',
        grid: 'none'
      }}
    >
      <Player />
      <HomeScreen />
      {gameState !== 'loading' ?
      <Entity>
        <EnterScene />
        <PickLanguage />
        <PickQuest />
      </Entity> :
      <Loading /> }
      <Vendors characterPrompts={characterPrompts} />
      <Entity
        primitive='a-light'
        type='directional'
        color='#FFF'
        intensity={1}
        position={{ x: -1, y: 1, z: 0 }}
      />
    </Scene>
  )
}

export const mapState = ({ characters, prompts, gameState }) => ({ characters, prompts, gameState })

export default connect(mapState)(Main)
