import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import 'babel-polyfill';
import 'aframe-particle-system-component';
import 'aframe-environment-component'

// possible color palette for later
const COLORS = ['#D92B6A', '#9564F2', '#FFCF59']

class Main extends Component {
  constructor() {
    super()

    this.state = {
      colorIndex: 0,
      spherePosition: { x: 0.0, y: 4, z: -10.0 }
    };
  };

  render() {
    return (
      <Scene
        environment={{
          preset: 'starry',
          seed: 2,
          lightPosition: { x: 0.0, y: 0.03, z: -0.5 },
          fog: 0.8,
          ground: 'canyon',
          groundYScale: 6.31,
          groundTexture: 'walkernoise',
          groundColor: '#8a7f8a',
          grid: 'none'
        }}
      >
      </Scene>
    )
  }
};

export default Main;
