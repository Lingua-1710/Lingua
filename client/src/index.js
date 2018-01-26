import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'aframe'
import { Scene } from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'
import 'aframe-physics-system'
import Artyom from 'artyom.js'
import store, { sendSpeech } from '../store'
import { FirstVendor, Box, Cursor, Floor } from '../components'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.listen = this.listen.bind(this)
  }

  listen(){
    let googLang = 'es'
    const speaker = new Artyom()
    speaker.initialize({
      lang: "es-ES",
      debug: true,
      listen: true,
      speed: 1,
      mode: "normal"
    })
    let speech = speaker.newDictation({
      onResult: function(text) {
        store.dispatch(sendSpeech(googLang, text))
      }
    })
    speech.start()
    setTimeout(() => speech.stop(), 5000)
  }

  render() {
    return (
      <Scene
        id="scene"
        physics="debug: true"
        inspector="url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js"
        environment={{
          preset: 'starry',
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
        <FirstVendor />
        <Cursor />
        <Box listen={this.listen}/>
        <Floor />
      </Scene>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'))


