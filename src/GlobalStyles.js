'use strict'

import {
  StyleSheet
} from 'react-native'

const GlobalStyles = StyleSheet.create({
  // TODO: add custom fonts
  // Bold, black text at top left of each screen
  container: {
    flex: 1
  },
  innerContainer: {
    marginTop: 43,
    marginLeft: 26,
    marginRight: 26,
    marginBottom: 10
  },
  dark: {
    color: '#808080',
    fontSize: 20,
    fontWeight: 'bold'
  },
  title: {
    color: '#808080',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Circular-Book'
  },
  text: {
    color: '#B7B7B7',
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Circular-Book'
  },
  span: {
    color: '#808080',
    fontSize: 15,
    fontFamily: 'Circular-Book'
  },
  thinUnderline: {
    borderBottomColor: '#95989A',
    borderBottomWidth: 0.5
  },
  thickUnderline: {
    borderBottomColor: '#95989A',
    borderBottomWidth: 2,
    paddingBottom: 6
  },
  bold: {
    fontFamily: 'Circular-Bold'
  },
  success: {
    color: '#86CB92',
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 25
  }
})

module.exports = GlobalStyles
