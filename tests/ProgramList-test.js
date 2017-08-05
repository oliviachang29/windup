import 'react-native'
import React from 'react'
import ProgramList from '../src/screens/ProgramList'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <ProgramList />
    ).toJSON()
  expect(tree).toMatchSnapshot()
})
