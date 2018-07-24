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
        <View style={styles.headingCol}>
          <Text allowFontScaling={false} allowFontScaling={false} style={styles.heading}>{this.props.heading}</Text>
          <View style={GlobalStyles.rectUnderline}>{/* Small rectangle underneath heading */}</View>
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
    marginBottom: 10
  },
  heading: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'SF Pro Text',
    fontWeight: '500',
    marginBottom: 16
  },
  headingCol: {
    flex: 7
  },
  xCol: {
    flex: 1
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
    paddingTop: 13,
    paddingLeft: 0
  },
  burgerRectangle: {
    backgroundColor: '#95989A',
    height: 2,
    width: 27,
    borderRadius: 100
  },
  topBurgerRectangle: {
    // marginTop: 10,
    marginBottom: 7
  }
})

module.exports = Heading
