import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'

const FirstVendorStoreFront = () => {
  return (
    <Entity>
      <a-assests>
        <a-asset-item id="storefront-obj" src="models/storefront/storefront.obj" />
        <a-asset-item id="storefront-mtl" src="models/storefront/storefrontmaterials.mtl" />
      </a-assests>
      <a-obj-model id="storefront" src="#storefront-obj" mtl="#storefront-mtl" position="12 1 -10" rotation="0 175 0" />
    </Entity>
  )
}


export default FirstVendorStoreFront
