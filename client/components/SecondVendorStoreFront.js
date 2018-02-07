import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'
import { getGameState } from '../store'

const SecondVendorStoreFront = () => {
  return (
    <Entity>
      <Entity>
        <a-asset-item
          id="secondstorefront-obj"
          src="models/woman/saloon/model.obj" />
        <a-asset-item
          id="secondstorefront-mtl"
          src="models/woman/saloon/materials.mtl" />
      </Entity>
      {/* Sets the state to 'game'. Used on this store-front cause it takes the longest to load. */}
      <Entity
        primitive="a-obj-model"
        id="secondstorefront"
        src="#secondstorefront-obj"
        mtl="#secondstorefront-mtl"
        position="-16 1 -13.5"
        rotation="0 220 1" />
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

export default connect(null, mapDispatchToProps)(SecondVendorStoreFront)
