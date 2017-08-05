import 'react-native'
import React from 'react'
import Index from '../index.ios.js'

jest.mock('react-native-code-push', () => {

  return jest.fn(() => ({
      InstallMode: jest.fn(),
      CheckFrequency: jest.fn(),
  }))
})

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  )
})
