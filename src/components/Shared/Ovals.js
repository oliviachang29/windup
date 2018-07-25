
import React, {Component} from 'react'
import {
  Text,
  StyleSheet,
  View
} from 'react-native'

class Ovals extends Component {
  render () {
    return (
      <View style={styles.ovals}>
	      <View style={[styles.oval, styles.oval1]}></View>
	      <View style={[styles.oval, styles.oval2, {top: Math.random()*50}]}></View>
	    </View>
    )
  }
}

const styles = StyleSheet.create({
   ovals: {
    flexDirection: 'row',
    position: 'absolute',
  },
  oval: {
    opacity: 0.08,
    width: 100,
    height: 90,
    borderRadius: 50,
    backgroundColor: 'white',
    transform: [
      {scaleX: 2}
    ]
  },
  oval1: {
    top: 50,
    zIndex: 1
  },
  oval2: {
    width: 200,
    height: 144,
    borderRadius: 100,
    transform: [
      {scaleX: 2}
    ],
    left: 50,
    zIndex: 2
  }
})

module.exports = Ovals