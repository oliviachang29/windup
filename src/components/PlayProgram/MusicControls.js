// IncrementControl.js
// Used in PlayProgram.js
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'

const backArrows = '<<'
const frontArrows = '>>'

class MusicControls extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  renderPausedOrPlayingText () {
    if (this.state.delayed) {
      return 'delayed'
    } else {
      return this.state.isPlaying ? 'playing' : 'paused'
    }
  }

  render () {
    return (
      <View style={styles.playView}>
        <TouchableOpacity
          style={styles.backArrows}
          onPress={() => this.props.changeTime(-10)}>
          <View>
            <Text style={styles.arrows}>{backArrows} 10s</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => this.props.playSound}
          onLongPress={() => this.props.restartMusic}>
          <Text style={styles.length}>{this.props.currentTime}</Text>
          <View style={[styles.pausedOrPlayingView]}>
            <Text style={styles.pausedOrPlaying}>{this.renderPausedOrPlayingText()}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.frontArrows}
          onPress={() => this.props.changeTime(10)}>
          <Text style={styles.arrows}>10s                                                                        {frontArrows}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  length: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  pausedOrPlaying: {
    color: '#FFF',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10
    // fontFamily: 'CircularTT-Book'
  },
  pausedOrPlayingView: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingBottom: 12,
    width: 70,
    alignSelf: 'center'
  },
  playView: {
    width: 334,
    flex: 1,
    flexDirection: 'row'
  },
  backArrows: {
    flex: 1
    // marginRight: 30
  },
  arrows: {
    color: 'white',
    fontSize: 20,
    marginTop: 30
    // justifyContent: 'center',
    // alignSelf: 'center'
  },
  playButton: {
    flex: 1
  },
  frontArrows: {
    flex: 1
    // marginLeft: 30
  }
})

module.exports = MusicControls
