// IncrementControl.js
// Used in PlayProgram.js
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import X from '../Shared/X'

const deviceWidth = Dimensions.get('window').width

class Heading extends Component {
  onPress() {
    this.props.gotoProgramList()
  }
  render () {
    return (
       <View style={[styles.nav, this.props.style]}
        onLayout={(event) => { this.props.onLayout }}>
        <View style={styles.textContainer}>
          {!this.props.programType ? null : 
            <Text allowFontScaling={false} style={styles.programType}>{this.props.programType}</Text>
          }
          {!this.props.musicName ? null : 
            <Text allowFontScaling={false} style={styles.musicName}>{this.props.musicName}</Text>
          }
          {!(this.props.programType || this.props.musicName) ? null : 
            <View style={[GlobalStyles.rectUnderline, styles.whiteRectangle]}></View>
          }
        </View>
        <X onPress={() => this.onPress()} color="white" viewStyle={[GlobalStyles.rightCol, styles.x]} />
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
  textContainer: {
    width: '80%'
  },
  programType: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Circular-Bold'
  },
  musicName: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Circular-Book',
    marginTop: 10
  },
  length: {
    flex: 1
  },
  whiteRectangle: {
    marginTop: 26,
    backgroundColor: 'white'
  },
  x: {
    marginTop: 30,
  }
})

module.exports = Heading
