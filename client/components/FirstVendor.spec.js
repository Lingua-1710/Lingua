import React from 'react'
import { FirstVendor, mapState, mapDispatch } from './FirstVendor'
import { Entity } from 'aframe-react'
import enzyme from 'enzyme'
import { connect } from 'react-redux'
import { shallowWithStore } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'
import { getPrompt } from '../store'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

describe("FirstVendor", () => {
  let props
  let store
  beforeEach(() => {
    props = {
      prompts: undefined,
      currentPrompt: undefined,
      vendorResponse: [],
      language: undefined,
      dispatch: ()=>{}
    }
    store = createMockStore()
  })

  describe('state', () => {
    it('receives correct props from store', () => {
      const expectedProps = props
      const ConnectedComponent = connect(mapState)(FirstVendor)
      const component = shallowWithStore(<ConnectedComponent />, store)
      expect(Object.keys(component.props())).toEqual(Object.keys(expectedProps))
    })
  })

  describe('dispatch', () => {
    it('dispatches the correct actions', () => {
      const ConnectedComponent = connect(null, mapDispatch)(FirstVendor)
      const component = shallowWithStore(<ConnectedComponent />, store)
      component.props().setCurrentPrompt()
      expect(store.isActionDispatched(getPrompt())).toBe(true)
    })
  })

  describe('renders an A-frame react component', () => {
    let mockState
    beforeEach(() => {
      mockState = () => {
        return {
          prompts: true,
          currentPrompt: 'test',
          vendorResponse: '',
          language: {
            nativeLang: 'en',
            learningLang: 'en',
            learningLangCode: 'en-US'
          },
          listen: ()=>{}
        }
      }
    })

    it('that is an Entity', () => {
      const ConnectedComponent = connect(mockState, mapDispatch)(FirstVendor)
      const component = shallowWithStore(<ConnectedComponent />, store)
      const entities = component.dive().first()
      expect(entities.type().name).toBe('Entity')
    })

    it('that contains everything else that gets rendered', () => {
      const ConnectedComponent = connect(mockState, mapDispatch)(FirstVendor)
      const component = shallowWithStore(<ConnectedComponent />, store)
      const entities = component.dive().find(Entity)
      const wrappingEntity = entities.first()
      expect(wrappingEntity.children().length).toEqual(component.dive().children().length)
    })
  })
})
