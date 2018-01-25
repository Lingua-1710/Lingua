import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import 'babel-polyfill';
import 'aframe-particle-system-component';
import 'aframe-environment-component'


const FirstVendor = (props) => {
  return (
    <Entity>
      <a-assests>
        <a-asset-item id="octo-obj" src="models/octo/ramenocto.obj"></a-asset-item>
        <a-asset-item id="octo-mtl" src="models/octo/ramenoctomaterials.mtl"></a-asset-item>
      </a-assests>
      <a-obj-model id="octo" src="#octo-obj" mtl="#octo-mtl" position="0 1 -3" rotation="10 180 0" >
      </a-obj-model>
      <Entity
        primitive="a-light"
        type="directional"
        color="#FFF"
        intensity={1}
        position={{ x: 2.5, y: 0.0, z: 0.0 }}
      />
    </ Entity>
  )
};
export default FirstVendor;
