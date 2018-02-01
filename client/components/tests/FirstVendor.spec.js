import React from 'react'
import { FirstVendor, mapState, mapDispatch } from '../FirstVendor'
import { Entity } from 'aframe-react'
import enzyme, { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import { connect } from 'react-redux'
import { shallowWithStore } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'
import { fetchPrompts, getPrompt } from '../../store'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

describe("FirstVendor", () => {
  let props
  beforeEach(() => {
    props = {
      userSpeech: undefined,
      prompts: undefined,
      currentPrompt: undefined,
      dispatch: ()=>{}
    }
  })

  describe('state', () => {
    it('receives correct props', () => {
      const expectedProps = props
      const ConnectedComponent = connect(mapState)(FirstVendor)
      const component = shallowWithStore(<ConnectedComponent />, createMockStore(expectedProps))
      expect(Object.keys(component.props())).toEqual(Object.keys(expectedProps))
    })
  })

  describe('dispatch', () => {
    it('dispatches the correct actions', () => {
      const store = createMockStore()
      const ConnectedComponent = connect(undefined, mapDispatch)(FirstVendor)
      const component = shallowWithStore(<ConnectedComponent />, store)
      component.props().setPrompts()
      expect(store.isActionDispatched(fetchPrompts)).toBe(true)
      component.props().setCurrentPrompt()
      expect(store.isActionDispatched(getPrompt)).toBe(true)
    })
  })

  // it('calls componentDidMount', () => {
  //   sinon.spy(FirstVendor.prototype, 'componentDidMount')
  //   firstVendor()
  //   expect(FirstVendor.prototype.componentDidMount.calledOnce).toBe(true)
  // })

  // it('renders an Entity', () => {
  //   const entities = firstVendor().find(Entity)
  //   expect(entities.length).toBeGreaterThan(0)
  // })
})
