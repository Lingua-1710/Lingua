import React from 'react'
import FirstVendor  from '../FirstVendor'
import { Entity } from 'aframe-react'
import enzyme, { shallow } from 'enzyme'
import sinon from 'sinon'
import store from '../../store'

import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

describe("FirstVendor", () => {
  let props
  let shallowFirstVendor
  const firstVendor = (props) => {
    if (!shallowFirstVendor) {
      shallowFirstVendor = shallow(
        <FirstVendor store={store} />
      )
    }
    return shallowFirstVendor
  }

  beforeEach(() => {
    props = {
      userSpeech: undefined,
      prompts: undefined,
      currentPrompt: undefined,
    }
    shallowFirstVendor = undefined
  })

  it('calls componentDidMount', () => {
    sinon.spy(firstVendor().prototype, 'componentDidMount')
    firstVendor()
    expect(firstVendor().prototype.componentDidMount.calledOnce).toBe(true)
  })

  it('renders an Entity', () => {
    const entities = firstVendor().find(Entity)
    expect(entities.length).toBeGreaterThan(0)
  })
})
