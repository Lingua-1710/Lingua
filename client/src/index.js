import React from 'react';
import ReactDOM from 'react-dom';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import 'babel-polyfill';
import 'aframe-particle-system-component';
import 'aframe-physics-system';
class App extends React.Component {
  render() {
    return (
      <Scene physics="debug: true" inspector="url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js">
        <Entity static-body geometry="primitive: box; depth: 50; height: 0.1; width: 50"
                material="color: #2E3837; shader: flat"
                physics-body="mass: 0; boundingBox: 50 0.1 50" position="0 0 -10" />
        <Entity dynamic-body geometry={{ primitive: 'box' }} material={{ color: 'red' }} position={{ x: 0, y: 2, z: -5 }} />
        <Entity particle-system={{ preset: 'snow' }} />
        <Entity light={{ type: 'point' }} />
        <Entity text={{ value: 'Hello, WebVR!' }} />
      </Scene>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
