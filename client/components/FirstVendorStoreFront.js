import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'
import { getGameState } from '../store'

const FirstVendorStoreFront = (props) => {
  return (
    <Entity>
      <Entity>
        <a-asset-item
          id="storefront-obj"
          src="models/storefront/storefront.obj" />
        <a-asset-item
          id="storefront-mtl"
          src="models/storefront/storefrontmaterials.mtl" />
      </Entity>
      {/* Sets the state to 'game'. Used on this store-front cause it takes the longest to load. */}
      <Entity
        primitive="a-obj-model"
        events={{"model-loaded": () => props.setGameState('game')}}
        id="storefront"
        src="#storefront-obj"
        mtl="#storefront-mtl"
        position="12 1 -11.5"
        rotation="0 160 1" />
    </Entity>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGameState(gameState) {
      dispatch(getGameState(gameState))
    }
  }
}

export default connect(null, mapDispatchToProps)(FirstVendorStoreFront)
