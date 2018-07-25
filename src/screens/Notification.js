'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native'
import GlobalStyles from '../GlobalStyles'
var {width} = Dimensions.get('window')
export default class Notification extends Component {

  constructor (props) {
    super(props)

    var backgroundColor
    if (this.props.type === 'success') {
      backgroundColor = '#86CB92'
    } else if (this.props.type === 'error') {
      backgroundColor = '#D93858'
    } else {
      backgroundColor = 'white'
    }
    this.state = {
      backgroundColor: backgroundColor
    }
  }

  renderText () {
    if (this.props.text) {
      return (
        <Text allowFontScaling={false} style={[GlobalStyles.text, styles.text]}>{this.props.text}</Text>
      )
    }
  }

  render () {
    return (
      <View style={[styles.container, GlobalStyles.shadow, {backgroundColor: this.state.backgroundColor, shadowColor: this.state.backgroundColor}]}>
        <View style={styles.leftCol}>
          <Text allowFontScaling={false} style={[GlobalStyles.title, styles.title]}>{this.props.title}</Text>
          {this.renderText()}
        </View>
        {/*<TouchableOpacity onPress={() => this.closeNotification()} style={styles.rightCol}>
          <Image source={require('../assets/images/white-x.png')} style={styles.x} />
        </TouchableOpacity>*/}
      </View>
    )
  }

  closeNotification () {
    this.props.navigator.dismissInAppNotification()
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    padding: 16,
    paddingBottom: 20,
    margin: 10,
    marginTop: 30,
    borderRadius: 4,
    flexDirection: 'row'
  },
  leftCol: {
    flex: 8
  },
  rightCol: {
    flex: 1,
    justifyContent: 'center'
  },
  x: {
    width: 25,
    height: 25
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
