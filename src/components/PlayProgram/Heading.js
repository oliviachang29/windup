// IncrementControl.js
// Used in PlayProgram.js
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

  render () {
    return (
      <View style={styles.nav}>
        <View style={styles.headingCol}>
          <Text allowFontScaling={false} style={styles.heading}>{this.props.programType}</Text>
          <View style={styles.subheadingView}>
            <Text allowFontScaling={false} style={styles.subheading}>{this.props.musicName}</Text>
          </View>
          <View style={[GlobalStyles.rectUnderline, styles.whiteRectangle]}></View>
        </View>
        <TouchableOpacity onPress={() => this.props.gotoProgramList()} style={styles.xCol}>
          <Image source={require('../../assets/images/white-x.png')} style={styles.x} />
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  nav: {
    flex: 1.5,
    flexDirection: 'row'
  },
  headingCol: {
    flex: 200
  },
  xCol: {
    marginLeft: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  heading: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Circular-Bold'
  },
  subheadingView: {
    flexDirection: 'row',
    marginTop: 6
  },
  subheading: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Circular-Book',
    height: 30
    // flex: 1
  },
  length: {
    flex: 1
  },
  whiteRectangle: {
    marginTop: 26,
    backgroundColor: 'white'
  }
})

module.exports = Heading
