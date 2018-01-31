import React from 'react'
import renderer from 'react-test-renderer'
import store from '../../store'
import { EnterScene }  from '../EnterScene'
import enzyme, { shallow } from 'enzyme'
import sinon from 'sinon'

import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

describe('Component: EnterScene', () => {
  it('renders <a-plane>', () => {
    const tree = renderer.create(
      <EnterScene store={store} />
    ).toJSON()
    expect(tree.type).toBe('a-plane')
  })

  it('renders <a-plane> with id', () => {
    const tree = renderer.create(
      <EnterScene store={store} id="enter-scene-plane" />
    ).toJSON()
    expect(tree.props.id).toBe('enter-scene-plane')
  })

  it('should be able to be clicked', () => {
    const clickSpy = sinon.spy()
    const component = shallow(<EnterScene setGameState={clickSpy} />)
    component.find('#enter-scene-plane').prop("events").click()
    expect(clickSpy.called).toBe(true)
  })
})
