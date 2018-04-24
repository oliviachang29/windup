'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native'

import GlobalStyles from '../GlobalStyles'
import realm from '../realm'
import Utils from '../Utils'

import Heading from '../components/PlayProgram/Heading'

const Sound = require('react-native-sound')
import Slider from 'react-native-slider'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import MusicControl from 'react-native-music-control';

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
      soundLoaded: false,
      circularFill: 0
    }

    this.playSound = this.playSound.bind(this)
    this.restartMusic = this.restartMusic.bind(this)
    this.logTime = this.logTime.bind(this)
    this.changeTime = this.changeTime.bind(this)
    this.onSliderUpdate = this.onSliderUpdate.bind(this)
    this.updateCurrentTime = this.updateCurrentTime.bind(this)
    this.handleDelayPressed = this.handleDelayPressed.bind(this)
    this.moveCircularProgress = this.moveCircularProgress.bind(this)
    this.updatePlayback = this.updatePlayback.bind(this)
  }


  componentDidMount () {
    MusicControl.resetNowPlaying()
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
        this.configureMusicControls()
        // console.log("repeat" + this.state.repeat)
        // console.log("numberloops" + music.getNumberOfLoops())
      }
    })
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    clearTimeout(this.delayTimeout)
    this.setState({ isPlaying: false, delayed: false })
    if (music) { music.release() }
    MusicControl.resetNowPlaying()
  }

  renderPausedOrPlaying () {
    if (!this.state.isPlaying) {
      return (
        <View style={styles.pausedOrPlayingView}>
           <Image
              style={styles.pausedOrPlayingButton}
              source={require('../assets/images/play-button.png')}
            />
        </View>
      )
    } else if (!this.state.delayed) {
      return (
        <View style={styles.pausedOrPlayingView}>
          <Image
              style={[styles.pausedOrPlayingButton, styles.pausedButton]}
              source={require('../assets/images/pause-button.png')}
            />
        </View>
      )
    }
  }

  renderPauseBars () {
    if (this.state.delayed) {
      return (
        <Image
            style={[styles.pausedOrPlayingButton, styles.pauseBars]}
            source={require('../assets/images/pause-bars.png')}
          />
        )
    }
  }

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

            <View style={GlobalStyles.container}>
              <View style={styles.playView}>
                <TouchableOpacity
                disabled={!this.state.isLoaded}
                style={styles.backArrows}
                onLongPress={this.restartMusic}
                onPress={() => this.changeTime(-10)}>
                  <View>
                    <Text allowFontScaling={false} style={styles.arrows}>{backArrows} 10s</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.playButton}
                  onPress={this.playSound}
                  disabled={!this.state.isLoaded}>
                    <View style={[styles.delayedView]} >
                      <AnimatedCircularProgress
                      ref={c => this.circularProgress = c}
                      size={70}
                      width={4}
                      fill={this.state.circularFill}
                      tintColor='#FFFFFF'
                      backgroundColor={program.color} />
                      {this.renderPauseBars()}
                    </View>
                    {this.renderPausedOrPlaying()}
                </TouchableOpacity>

                <TouchableOpacity
                disabled={!this.state.isLoaded}
                style={styles.frontArrows}
                onPress={() => this.changeTime(10)}>
                  <Text allowFontScaling={false} style={styles.arrows}>10s {frontArrows}</Text>
                </TouchableOpacity>
              </View>

              <View ref="slider" style={styles.slider}>
                <TouchableWithoutFeedback onPressIn={this.tapSliderHandler} disabled={!this.state.isLoaded}>
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
                <View style={styles.times}>
                  <Text allowFontScaling={false} style={styles.timeText}>{Utils.secondsToTime(this.state.currentTime)}</Text>
                  <Text allowFontScaling={false} style={[styles.timeText, styles.lengthText]}>{Utils.secondsToTime(length)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.delayRepeatContainer}>
              {/* Delay */}
              <View
                disabled={!this.state.isLoaded}
                style={[styles.delayContainer, {flexDirection: 'row'}]}>
                <Text
                  onPress={() => this.handleDelayPressed(-5, false)}
                  onLongPress={() => this.handleDelayPressed(0, true)}
                  style={[styles.minusPlus, styles.minus]}>-</Text>
                  <View>
                    <Text allowFontScaling={false} style={styles.amount}>{this.state.delayAmount}s</Text>
                    <Text allowFontScaling={false} style={styles.caption}>delay</Text>
                  </View>
                  <Text
                    onPress={() => this.handleDelayPressed(5, false)}
                    onLongPress={() => this.handleDelayPressed(20, true)}
                    style={[styles.minusPlus, styles.plus]}>+</Text>
              </View>
              {/* Repeat */}
              <TouchableOpacity
                disabled={!this.state.isLoaded}
                onPress={() => this.handleRepeatPressed()}>
                <View>
                  <Text allowFontScaling={false} style={styles.amount}>{this.state.amount}{this.state.repeat ? '✓' : '✕'}</Text>
                  <Text allowFontScaling={false} style={styles.caption}>repeat</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  setUpMusicControl () {
    var program = this.props.program
    MusicControl.setNowPlaying({
      title: program.programType,
      artist: program.musicName,
      artwork: require('../assets/images/music-control.png'),
      // duration: length,
      elapsedTime: this.state.currentTime
    })

   // on iOS this event will also be triggered by the audio router change event.
   // This happens when headphones are unplugged or a bluetooth audio peripheral disconnects from the device

  }

  configureMusicControls () {
    MusicControl.enableControl('play', true)
    MusicControl.enableControl('pause', true)
    MusicControl.enableControl('stop', false)
    MusicControl.enableControl('nextTrack', true)
    MusicControl.enableControl('previousTrack', false)
    MusicControl.enableControl('skipForward', true, {interval: 10})
    MusicControl.enableControl('skipBackward', true, {interval: 10})

    MusicControl.on('play', ()=> {
      console.log('music control - play')
      music.play()
      this.setState({ isPlaying: true })
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
        elapsedTime: this.state.currentTime
      })
   })

    MusicControl.on('pause', ()=> {
      console.log('music control - pause')
      music.pause()
      this.setState({ isPlaying: false })
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
        elapsedTime: this.state.currentTime
      })
    })

    MusicControl.on('skipForward', ()=> {
      this.changeTime(10)
    });

    MusicControl.on('skipBackward', ()=> {
       this.changeTime(-10)
    })
  }

  setCurrentTime(time) {
    music.setCurrentTime(time)
    this.setState({
      currentTime: time,
      sliderValue: time / length
    })
    MusicControl.updatePlayback({
      elapsedTime: this.state.currentTime
    })
  }

  updateCurrentTime () {
    music.getCurrentTime((seconds) => {
      this.setState({ currentTime: seconds })
    })
    if (this.state.isPlaying) {
      this.setState({ sliderValue: this.state.currentTime / length })
    }
  }

  restartMusic () {
    this.setCurrentTime(0)
  }

  moveCircularProgress (fill, time) {
    this.circularProgress.performLinearAnimation(fill, time)
  }

  updatePlayback(playing) {
    if (playing) {
       MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
        elapsedTime: this.state.currentTime
      })
    } else {
       MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
        elapsedTime: this.state.currentTime
      })
    }
  }

  // TODO: doesn't play sound from currentTime, only plays sound from beginning
  playSound () {
    // Toggle state
    this.setState({ isPlaying: !this.state.isPlaying })

    this.moveCircularProgress(0, 0)


    if (this.state.isPlaying) {
      music.pause()
      console.log('music paused')
      this.setState({delayed: false})
      clearTimeout(this.delayTimeout)
      this.updatePlayback(false);
    } else {
      this.updatePlayback(true);
      console.log('music played')
      if (this.state.delayAmount > 0) {
        this.setState({delayed: true})
      }

      var delayTime = this.state.delayAmount * 1000

      this.moveCircularProgress(100, this.state.delayAmount * 1000)

      this.delayTimeout = setTimeout(() => {
        this.moveCircularProgress(0, 0)
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
      }, delayTime)

      if (this.state.logTimeSet === false) {
        this.logTime()
        this.setState({logTimeSet: true})
        this.setUpMusicControl()
      }
    }
  }

  logTime () {
    // TODO: check if music.isplaying, update state ?
    this.interval = setInterval(() => {
      this.updateCurrentTime()
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

  handleDelayPressed (amount, longPress) {
    if (longPress) {
      this.setState({ delayAmount: amount })
    } else {
      if (amount > 0) { // if adding seconds
        if (this.state.delayAmount >= 20) {
          this.setState({ delayAmount: 0 })
        } else {
          this.setState({ delayAmount: this.state.delayAmount + amount })
        }
      } else { // if subtracting seconds
        if (this.state.delayAmount <= 0) {
          this.setState({ delayAmount: 20 })
        } else {
          this.setState({ delayAmount: this.state.delayAmount + amount })
        }
      }
    }

    realm.write(() => {
      this.props.program.delayAmount = this.state.delayAmount
    })
  }

  handleRepeatPressed() {
    console.log('repeat pressed')
    this.setState({repeat: !this.state.repeat})
    // TODO: still doesn't make sense
    this.state.repeat ? music.setNumberOfLoops(0) : music.setNumberOfLoops(-1)
    console.log("music.getNumberOfLoops()" + music.getNumberOfLoops())
    realm.write(() => {
      this.props.program.repeat = this.state.repeat
    })
  }

  updateRealm () {
    realm.write(() => {
      this.props.program.delayAmount = this.state.delayAmount
      this.props.program.repeat = this.state.repeat
      this.props.program.currentTime = this.state.currentTime
        // program.currentTime = this.state.currentTime;
    })
  }

  // navigation
  gotoProgramList () {
    this.updateRealm()
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
  pausedOrPlaying: {
    color: '#FFF',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: 'Circular-Book'
  },
  delayedView: {
    alignSelf: 'center'
  },
  pauseBars: {
    marginTop: -47
  },
  pausedOrPlayingButton: {
    alignSelf: 'center',
  },
  pausedOrPlayingView: {
    marginTop: -70
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
  },
  sliderThumb: {
    width: 15,
    height: 15
  },
  times: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Circular-Book',
  },
  delayRepeatContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  delayContainer: {
    marginRight: 50,
    marginLeft: -30
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
  minusPlus: {
    color: 'white',
    fontSize: 20,
    padding: 20
  }
})

module.exports = PlayProgram
