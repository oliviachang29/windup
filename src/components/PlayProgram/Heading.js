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
import X from '../Shared/X'
class Heading extends Component {

  render () {
    return (
      <View style={styles.nav}>
        <View style={GlobalStyles.headingCol}>
          <Text allowFontScaling={false} style={styles.heading}>{this.props.programType}</Text>
          <View style={styles.subheadingView}>
            <Text allowFontScaling={false} style={styles.subheading}>{this.props.musicName}</Text>
          </View>
          <View style={[GlobalStyles.rectUnderline, styles.whiteRectangle]}></View>
        </View>
        <X onPress={() => this.props.gotoProgramList()} color="white" viewStyle={GlobalStyles.xCol} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  nav: {
    marginTop: 40,
    flex: 1.5,
    flexDirection: 'row'
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
    // height: 30,
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
