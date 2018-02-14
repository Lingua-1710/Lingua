import React from 'react'
import { EnterScene }  from './EnterScene'
import { Entity } from 'aframe-react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

describe("EnterScene", () => {
  let shallowEnterScene
  const enterScene = () => {
    if (!shallowEnterScene) {
      shallowEnterScene = shallow(
        <EnterScene gameState='home-screen' />
      )
    }
    return shallowEnterScene
  }

  beforeEach(() => {
    shallowEnterScene = undefined
  })

  describe('Component: EnterScene', () => {
    it('renders an Entity', () => {
      const entity = enterScene().first()
      expect(entity.type().name).toBe('Entity')
    })

    it('contains everything else that gets rendered', () => {
      const entities = enterScene().find(Entity)
      const wrappingEntity = entities.first()
      expect(wrappingEntity.children()).toEqual(enterScene().children())
    })

    it('is able to be clicked', () => {
      const clickSpy = jest.fn()
      const component = shallow(<EnterScene gameState='home-screen' setGameState={clickSpy} />)
      component.find('#enter-scene-plane').prop('events').click()
      expect(clickSpy).toBeCalled()
    })
  })
})
