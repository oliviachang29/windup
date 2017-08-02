'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native'
import GlobalStyles from '../GlobalStyles'
var {width} = Dimensions.get('window')
export default class Notification extends Component {
  renderIcon () {
    var icon
    if (this.props.type === 'success') {
      icon = '✓'
    } else if (this.props.type === 'error') {
      icon = '✕'
    } else {
      icon = ''
    }
    if (!icon === '') {
      return (
        <View style={styles.leftCol}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
        {this.renderIcon()}
        <View style={styles.rightCol}>
          <Text style={GlobalStyles.title}>{this.props.title}</Text>
          <Text style={GlobalStyles.text}>{this.props.text}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: width - 30,
    padding: 16,
    margin: 10,
    marginTop: 30,
    borderColor: '#808080',
    borderWidth: 1,
    flexDirection: 'row'
  },
  leftCol: {
    flex: 1
  },
  rightCol: {
    flex: 5
  },
  icon: {
    fontSize: 30
  }
})

module.exports = Notification
