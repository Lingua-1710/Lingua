import React from 'react'
import { EnterScene }  from '../EnterScene'
import { Entity } from 'aframe-react'
import enzyme, { shallow } from 'enzyme'
import sinon from 'sinon'

import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

describe("EnterScene", () => {
  let shallowEnterScene
  const enterScene = () => {
    if (!shallowEnterScene) {
      shallowEnterScene = shallow(
        <EnterScene />
      )
    }
    return shallowEnterScene
  }

  beforeEach(() => {
    shallowEnterScene = undefined
  })

  describe('Component: EnterScene', () => {
    it('renders an Entity', () => {
      const entities = enterScene().find(Entity)
      expect(entities.length).toBeGreaterThan(0)
    })

    it('contains everything else that gets rendered', () => {
      const entities = enterScene().find(Entity)
      const wrappingEntity = entities.first()
      expect(wrappingEntity.children()).toEqual(enterScene().children())
    })

    it('should be able to be clicked', () => {
      const clickSpy = sinon.spy()
      const component = shallow(<EnterScene setGameState={clickSpy} />)
      component.find('#enter-scene-plane').prop("events").click()
      expect(clickSpy.called).toBe(true)
    })
  })
})
