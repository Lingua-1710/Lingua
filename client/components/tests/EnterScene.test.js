import React from 'react'
import 'aframe'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import jest from 'jest'
// import EnterScene from '../EnterScene'
// import renderer from 'react-test-renderer'

import { EnterScene } from '../index.js'

jest.mock('react-dom')

describe ('The EnterScene component', () => {
  let Enter, clickSpy
  beforeEach('Create component and onChange spy', () => {
    clickSpy = sinon.spy()
    Enter = chaiEnzyme.shallow(<EnterScene onClick={clickSpy} />)
  })

  it('calls click fn', () => {
    Enter.simulate('click', {})
    expect(clickSpy.called).to.be.true
  })
})
