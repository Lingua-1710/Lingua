import React from 'react'
import { Cursor }  from '../Cursor'
import { Entity } from 'aframe-react'
import enzyme, { shallow } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

describe("Cursor", () => {
  let shallowCursor
  const cursor = () => {
    if (!shallowCursor) {
      shallowCursor = shallow(
        <Cursor />
      )
    }
    return shallowCursor
  }

  beforeEach(() => {
    shallowCursor = undefined
  })

  describe('Component: EnterScene', () => {
    it('renders an Entity', () => {
      const entities = cursor().find(Entity)
      expect(entities.length).toBeGreaterThan(0)
    })
  })
})
