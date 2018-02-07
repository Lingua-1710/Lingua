import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'
import { getGameState } from '../store'

const ThirdVendorStoreFront = () => {
  return (
    <Entity>
      <Entity>
        <a-asset-item
          id="thirdstorefront-obj"
          src="models/donut/bakery/bakery.obj" />
        <a-asset-item
          id="storefront-mtl"
          src="models/donut/bakery/bakery.mtl" />
      </Entity>
      {/* Sets the state to 'game'. Used on this store-front cause it takes the longest to load. */}
      <Entity
        primitive="a-obj-model"
        id="thirdstorefront"
        src="#thirdstorefront-obj"
        mtl="#thirdstorefront-mtl"
        position="-30 .9 3"
        rotation="0 210 1" />
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

export default connect(null, mapDispatchToProps)(ThirdVendorStoreFront)
