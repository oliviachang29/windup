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
import X from './X'

class Heading extends Component {
  constructor (props) {
    super(props)
  }

  renderX () {
    if (this.props.onPressX) {
      return (
        <X onPress={this.props.onPressX} color="#95989A" viewStyle={GlobalStyles.rightCol} />
      )
    }
  }

  renderBurger () {
    if (this.props.onPressBurger) {
      return (
        <TouchableOpacity onPress={this.props.onPressBurger} style={GlobalStyles.rightCol}>
          <View style={styles.burgerContainer}>
            <View style={[GlobalStyles.burgerRectangle, styles.topBurgerRectangle]} />
            <View style={[GlobalStyles.burgerRectangle, styles.topBurgerRectangle]} />
            <View style={GlobalStyles.burgerRectangle} />
          </View>
        </TouchableOpacity>
      )
    }
  }

  render () {
    return (
      <View style={[styles.container, this.props.style]}
        onLayout={(event) => { this.props.onLayout }}>
        <View style={GlobalStyles.headingCol}>
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  heading: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Circular-Bold',
    fontWeight: '500',
    marginBottom: 16
  },
  burgerContainer: {
    paddingLeft: 50,
    paddingTop: 10,
    paddingRight: 5
  },
  topBurgerRectangle: {
    // marginTop: 10,
    marginBottom: 7
  },
})

module.exports = Heading
