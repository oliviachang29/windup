// import 'react-native'
// import React from 'react'
// import ProgramList from '../src/screens/ProgramList.js'

// jest.mock('react-native-code-push', () => {
//   return jest.fn(() => ({
//       InstallMode: jest.fn(),
//       CheckFrequency: jest.fn(),
//   }))
// })

// jest.mock('react-native-maps', () => {
//   return class MockMapView extends React.Component {
//     static Marker = props => React.createElement('Marker', props, props.children);
//     static propTypes = { children: React.PropTypes.any };
//
//     render() {
//       return React.createElement('MapView', this.props, this.props.children);
//     }
//   }
// });

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer'
//
// it('renders correctly', () => {
//   const tree = renderer.create(
//     <ProgramList />
//   )
// })
