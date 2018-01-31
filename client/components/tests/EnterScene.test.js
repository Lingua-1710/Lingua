import React from 'react'
import 'aframe'
import chai from 'chai'
import sinon from 'sinon'
import chaiEnzyme from 'chai-enzyme'
import sinonChai from 'sinon-chai'
import EnterScene from '../EnterScene'

chai.use(chaiEnzyme())
chai.should()
chai.use(sinonChai)

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
