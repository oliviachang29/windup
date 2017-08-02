// Used in NewProgram.js

'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

import GlobalStyles from '../../GlobalStyles'

class Heading extends Component {
  constructor (props) {
    super(props)
  }

  renderBackButton () {
    if (this.props.onPressBack) {
      return (
        <TouchableOpacity onPress={this.props.onPressBack} style={styles.backCol} >
          <Image source={require('../../assets/images/back-button.png')} style={styles.backButton} />
        </TouchableOpacity>
      )
    }
  }

  renderX () {
    if (this.props.onPressX) {
      return (
        <TouchableOpacity onPress={this.props.onPressX} style={styles.xCol}>
          <Image source={require('../../assets/images/gray-x.png')} style={styles.x} />
        </TouchableOpacity>
      )
    }
  }

  renderBurger () {
    if (this.props.onPressBurger) {
      return (
        <TouchableOpacity onPress={this.props.onPressBurger} style={styles.burgerCol}>
          <View style={styles.burgerContainer}>
            <View style={[styles.burgerRectangle, styles.topBurgerRectangle]}>{/* Small rectangle underneath heading */}</View>
            <View style={styles.burgerRectangle}>{/* Small rectangle underneath heading */}</View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render () {
    return (
      <View style={[styles.container, this.props.style]}
        onLayout={(event) => { this.props.onLayout }}>
        {this.renderBackButton()}
        <View style={styles.headingCol}>
          <Text style={styles.heading}>{this.props.heading}</Text>
          <View style={styles.smallRectangle}>{/* Small rectangle underneath heading */}</View>
        </View>
        {this.renderX()}
        {this.renderBurger()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    marginBottom: 40
  },
  heading: {
    color: 'black',
    fontSize: 32,
    fontFamily: 'Circular-Bold',
    marginBottom: 16
  },
  smallRectangle: {
    backgroundColor: '#E6E6E6',
    height: 4,
    width: 42,
    borderRadius: 100
  },
  headingCol: {
    flex: 7
  },
  backCol: {
    flex: 1
  },
  backButton: {
    marginRight: 28,
    marginTop: 7
  },
  xCol: {
    flex: 1
    // marginLeft: 'auto',
    // alignItems: 'flex-end'
  },
  x: {
    marginTop: 7,
    marginBottom: 40
  },
  burgerCol: {
    flex: 1
  },
  burgerContainer: {
    height: 75,
    width: 75,
    padding: 20,
    paddingTop: 10,
    paddingLeft: 0
  },
  burgerRectangle: {
    backgroundColor: '#95989A',
    height: 5,
    width: 35,
    borderRadius: 100
  },
  topBurgerRectangle: {
    // marginTop: 10,
    marginBottom: 7
  }
})

module.exports = Heading
