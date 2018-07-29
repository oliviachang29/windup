import React, {Component} from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native'

import GlobalStyles from '../../GlobalStyles'

class X extends Component {
  render () {
    return (
      <TouchableOpacity 
        onPress={() => this.props.onPress()}
        hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
        style={[styles.container, this.props.viewStyle]}>
          <View style={[GlobalStyles.burgerRectangle, styles.x, styles.leftX, {backgroundColor: this.props.color}]} />
          <View style={[GlobalStyles.burgerRectangle, styles.x, styles.rightX, {backgroundColor: this.props.color}]} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingRight: 10
  },
  x: {
    // top: 5,
    width: 40,
  },
  leftX: {
    position: 'absolute',
    transform: [
      {rotate: '45deg'}
    ]
  },
  rightX: {
    position: 'absolute',
    transform: [
      {rotate: '-45deg'}
    ]
  }
})

module.exports = X
