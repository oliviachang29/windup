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

  constructor(props) {
    super(props)
    var icon
    var backgroundColor
    if (this.props.type === 'success') {
      icon = '✓'
      backgroundColor = '#86CB92'
    } else if (this.props.type === 'error') {
      icon = '✕'
      backgroundColor = '#D93858'
    } else {
      icon = ''
      backgroundColor = 'white'
    }
    this.state = {
      icon: icon,
      backgroundColor: backgroundColor
    }
  }

  renderIcon () {
    if (!this.state.icon === '') {
      return (
        <View style={styles.leftCol}>
          <Text style={styles.icon}>{this.state.icon}</Text>
        </View>
      )
    }
  }

  renderText () {
    if (this.props.text) {
      return (
        <Text style={[GlobalStyles.text, styles.text]}>{this.props.text}</Text>
      )
    }
  }

  render () {
    return (
      <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
        {this.renderIcon()}
        <View style={styles.rightCol}>
          <Text style={[GlobalStyles.title, styles.title]}>{this.props.title}</Text>
          {this.renderText()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    padding: 16,
    paddingBottom: 20,
    margin: 10,
    marginTop: 30,
    borderRadius: 4
  },
  leftCol: {
    flex: 1
  },
  rightCol: {
    flex: 5
  },
  icon: {
    fontSize: 30
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  text: {
    marginTop: 10,
    fontSize: 17,
    color: 'white'
  }
})

module.exports = Notification
