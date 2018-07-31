'use strict'

import {
  StyleSheet,
  Dimensions
} from 'react-native'

const height = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    // marginTop: 40,
    marginLeft: 26,
    marginRight: 26,
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
  },
  rectUnderline: {
    backgroundColor: '#E6E6E6',
    height: 3,
    width: 56,
    borderRadius: 100
  },
  shadow: {
    // shadowOffset: {width: 2, height: 2},
    // shadowRadius: 10,
    // shadowOpacity: 0.3
  },
  // heading
  headingCol: {
    flex: 200
  },
  rightCol: {
    marginLeft: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  burgerRectangle: {
    backgroundColor: '#95989A',
    height: 2,
    width: 27,
    borderRadius: 100
  },
  buttonView: {
    marginBottom: 20
  },
  menu: {
    padding: 30,
    paddingTop: 45,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 8,
    width: deviceWidth * .9
  },
  image: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
    width: '100%',
    height: 200
  }
})

module.exports = GlobalStyles
