'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
} from 'react-native'

import GlobalStyles from '../GlobalStyles'
import realm from '../realm'
import Utils from '../Utils'

import Heading from '../components/PlayProgram/Heading'

const Sound = require('react-native-sound')
import Slider from 'react-native-slider'

// Sound
var music // don't delete this
var length = 0
Sound.setCategory('Playback', true)

export default class PlayProgram extends Component {

  constructor (props) {
    super(props)

    this.props.navigator.setStyle({
      navBarHidden: true,
      statusBarTextColorSchemeSingleScreen: 'light'
    })

    var currentTime = this.props.program.currentTime ? this.props.program.currentTime : 0

    this.state = {
      isLoaded: false,
      isPlaying: false,
      delayAmount: this.props.program.delayAmount,
      repeat: this.props.program.repeat,
      currentTime: currentTime,
      logTimeSet: false,
      delayed: false,
    }

    this.playSound = this.playSound.bind(this)
    this.logTime = this.logTime.bind(this)
    this.changeTime = this.changeTime.bind(this)
    this.onSliderUpdate = this.onSliderUpdate.bind(this)
    this.restartMusic = this.restartMusic.bind(this)
    this.handleDelayPressed = this.handleDelayPressed.bind(this)
  }


  componentDidMount () {
    music = new Sound(this.props.program.fileName, Sound.DOCUMENT, (error) => {
      if (error) {
        console.log('failed to load the sound')
        // alert user that sound failed to load
        this.props.navigator.showInAppNotification({
         screen: 'app.Notification',
         passProps: {
           title: 'Failed to load music',
           text: 'You may need to delete this program and upload another.',
           type: 'error'
         }
        })
      } else {
        console.log('sound was loaded')
        length = Math.floor(music.getDuration())
        this.setState({
          sliderValue: this.props.program.currentTime / length,
          isLoaded: true
        })
        music.setCurrentTime(this.state.currentTime)
        this.state.repeat ? music.setNumberOfLoops(-1) : music.setNumberOfLoops(0)
        console.log("repeat" + this.state.repeat)
        console.log("numberloops" + music.getNumberOfLoops())
      }
    })
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    clearTimeout(this.delayTimeout)
    this.setState({ isPlaying: false, delayed: false })
    if (music) { music.release() }
  };

  render () {
    var program = this.props.program
    const backArrows = "<<"
    const frontArrows = ">>"
    return (
      <View style={[styles.container, {backgroundColor: program.color}]}>

        <View style={GlobalStyles.innerContainer}>

          {/* Custom nav bar */}
          <Heading
            navigator={this.props.navigator}
            programType={program.programType}
            musicName={program.musicName}
            length={Utils.secondsToTime(length)}
            gotoProgramList={() => this.gotoProgramList()}
            changeProgramType={(newValue) => {this.changeAttribute(newValue, 'programType')}}
            changeMusicName={(newValue) => {this.changeAttribute(newValue, 'musicName')}}
          />

          <View style={styles.innerContainer}>
            <View style={styles.playView}>
              <TouchableOpacity
              style={styles.backArrows}
              onLongPress={this.restartMusic}
              onPress={() => this.changeTime(-10)}>
                <View>
                  <Text style={styles.arrows}>{backArrows} 10s</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.playButton}
                onPress={this.playSound}
                disabled={!this.state.isLoaded}
                >
                <Text style={styles.length}>{Utils.secondsToTime(this.state.currentTime)}</Text>
                <View style={[styles.pausedOrPlayingView]}>
                  <Text style={styles.pausedOrPlaying}>{this.renderPausedOrPlayingText()}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
              style={styles.frontArrows}
              onPress={() => this.changeTime(10)}>
                <Text style={styles.arrows}>10s {frontArrows}</Text>
              </TouchableOpacity>
            </View>

            <View ref="slider" style={styles.slider}>
              <TouchableWithoutFeedback onPressIn={this.tapSliderHandler}>
                <Slider
                  value={this.state.sliderValue}
                  disabled={!this.state.isLoaded}
                  step={0.001}
                  thumbStyle={styles.sliderThumb}
                  thumbTouchSize={{width: 80, height: 80}}
                  minimumTrackTintColor="#FFF"
                  maximumTrackTintColor="#DDD"
                  thumbTintColor="#FFF"
                  onSlidingComplete={(newValue) => this.onSliderUpdate(newValue)} />
              </TouchableWithoutFeedback>
            </View>


            <View style={styles.delayRepeatContainer}>
              {/* Delay */}
              <TouchableOpacity
                style={[styles.delayContainer]}
                onPress={() => this.handleDelayPressed()}
                onLongPress={() => this.handleDelayPressed(true)}>
                <View>
                  <Text style={styles.amount}>{this.state.delayAmount}s</Text>
                  <Text style={styles.caption}>delay</Text>
                </View>
              </TouchableOpacity>
              {/* Repeat */}
              <TouchableOpacity
                onPress={() => this.handleRepeatPressed()}>
                <View>
                  <Text style={styles.amount}>{this.state.amount}{this.state.repeat ? '✓' : '✕'}</Text>
                  <Text style={styles.caption}>repeat</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  setCurrentTime(time) {
    music.setCurrentTime(time)
    this.setState({
      currentTime: time,
      sliderValue: this.state.currentTime / length
    })
  }

  restartMusic () {
    this.setCurrentTime(0)
  }

  // TODO: doesn't play sound from currentTime, only plays sound from beginning
  playSound () {
    // Toggle state
    this.setState({ isPlaying: !this.state.isPlaying })

    if (this.state.isPlaying) {
      music.pause()
      this.setState({delayed: false})
      clearTimeout(this.delayTimeout)
    } else {

      if (this.state.delayAmount > 0) {
        this.setState({delayed: true})
      }
      if (this.state.currentTime === length) {
        var timeToDelay = 0
      } else {
        var timeToDelay = this.state.delayAmount * 1000
      }
      this.delayTimeout = setTimeout(() => {
        if (this.state.isPlaying) {
          if (this.state.currentTime === length) {
            this.restartMusic()
          } else {
            music.setCurrentTime(this.state.currentTime)
          }
          this.setState({delayed: false})
          music.play(() => {
            if (!this.state.repeat) {
              this.setCurrentTime(length)
              this.setState({isPlaying: false})
            }
          })
        }
      }, timeToDelay)

      if (this.state.logTimeSet === false) {
        this.logTime()
        this.setState({logTimeSet: true})
      }
    }
  }

  logTime () {

    // TODO: check if music.isplaying, update state ?
    this.interval = setInterval(() => {
      // Changes the state to paused
      music.getCurrentTime((seconds) => {
        this.setState({ currentTime: seconds })
      })
      if (this.state.isPlaying) {
        this.setState({ sliderValue: this.state.currentTime / length })
      }
    }, 500)
  }
   // TODO: fix the fact that it can go past the length
  changeTime(change) {
    if (change > 0) {
      var timeUntilEnd = length - this.state.currentTime
      if (timeUntilEnd === 0) {
        change = length * -1
      } else if (timeUntilEnd < change) {
        change = timeUntilEnd
      }
    } else {
      if (this.state.currentTime < (change * -1)) {
        change = this.state.currentTime * -1
      }
    }

    var newTime = this.state.currentTime + change
    this.setCurrentTime(newTime)
  }

  onSliderUpdate (newValue) {
    var newTime = newValue * length
    // TODO: need to update currentTime as it scrolls
    music.setCurrentTime(newTime)
    this.setState({ currentTime: newTime, sliderValue: newValue })
  }

  tapSliderHandler = (evt) => {
    this.refs.slider.measure((fx, fy, width, height, px, py) => {
      var newSliderValue = ((evt.nativeEvent.locationX - px) / width)
      var newTime = newSliderValue * length
      this.setCurrentTime(newTime)
      this.setState({sliderValue: newSliderValue })
    })
  }

  handleDelayPressed (longPress=false) {
    console.log("previous delay amount:" + this.state.delayAmount)
    if (this.state.delayAmount >= 20) {
      this.setState({ delayAmount: 0 })
    } else {
      this.setState({ delayAmount: this.state.delayAmount + 5 })
    }
    if (longPress) {
      this.setState({ delayAmount: 0 })
    }
    console.log("current delay amount:" + this.state.delayAmount)
  }

  handleRepeatPressed() {
    console.log('repeat pressed')
    this.setState({repeat: !this.state.repeat})
    // TODO: still doesn't make sense
    this.state.repeat ? music.setNumberOfLoops(0) : music.setNumberOfLoops(-1)
    console.log("music.getNumberOfLoops()" + music.getNumberOfLoops())
  }

  renderPausedOrPlayingText () {
    if (this.state.delayed) {
      return 'delayed'
    } else {
      return this.state.isPlaying ? 'playing' : 'paused'
    }
  }

  changeAttribute (newValue, attribute) {
    realm.write(() => {
      if (attribute === 'programType') {
        this.props.program.programType = newValue
      } else if (attribute === 'musicName') {
        this.props.program.musicName = newValue
      }
    })
  }

  // navigation
  gotoProgramList () {
    realm.write(() => {
      this.props.program.delayAmount = this.state.delayAmount
      this.props.program.repeat = this.state.repeat
      this.props.program.currentTime = this.state.currentTime
        // program.currentTime = this.state.currentTime;
    })
    this.props.navigator.dismissAllModals()
  }

  gotoEditProgram (program) {
    this.props.navigator.showModal({
      screen: 'app.EditProgram',
      passProps: {program}
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  innerContainer: {
    // marginLeft: 10,
    flex: 3,
    flexDirection: 'column'
  },
  circleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  length: {
    color: '#FFF',
    fontSize: 36,
    fontFamily: 'Circular-Bold',
    alignSelf: 'center'
  },
  pausedOrPlaying: {
    color: '#FFF',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: 'Circular-Book'
  },
  pausedOrPlayingView: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingBottom: 12,
    width: 75,
    alignSelf: 'center',
  },
  playView: {
    width: '100%',
    flex: 1,
    flexDirection: 'row'
  },
  backArrows: {
    flex: 1,
    // marginRight: 30
  },
  arrows: {
    color: 'white',
    fontSize: 20,
    marginTop: 30,
    fontFamily: 'Circular-Book'
    // justifyContent: 'center',
    // alignSelf: 'center'
  },
  playButton: {
    flex: 1,
  },
  frontArrows: {
    flex: 1,
    marginLeft: 'auto',
    alignItems: 'flex-end'
    // marginLeft: 30
  },
  slider: {
    flex: 1,
    marginTop: 30,
    marginBottom: -30
  },
  sliderThumb: {
    width: 15,
    height: 15
  },
  delayRepeatContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  delayContainer: {
    marginRight: 80,
  },
  amount: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily: 'Circular-Medium'
  },
  caption: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal',
    alignSelf: 'center',
    fontFamily: 'Circular-Book'
  },
  editButtonText: {
    color: 'white',
    fontSize: 10,
    alignSelf: 'flex-end',
    marginBottom: 10
  }
})

module.exports = PlayProgram
