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
       <View style={[styles.nav, this.props.style]}
        onLayout={(event) => { this.props.onLayout }}>
        <View>
          {!this.props.programType ? null : 
            <Text allowFontScaling={false} style={styles.heading}>{this.props.programType}</Text>
          }
          {!this.props.musicName ? null : 
            <Text allowFontScaling={false} style={styles.subheading}>{this.props.musicName}</Text>
          }
          {!(this.props.programType || this.props.musicName) ? null : 
            <View style={[GlobalStyles.rectUnderline, styles.whiteRectangle]}></View>
          }
        </View>
        <X onPress={() => this.props.gotoProgramList()} color="white" viewStyle={[GlobalStyles.rightCol, styles.x]} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  nav: {
    marginTop: 40,
    flex: 1.4,
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
  },
  x: {
    marginTop: 30
  }
})

module.exports = Heading
