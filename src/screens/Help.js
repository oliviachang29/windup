'use strict'

import React, {Component} from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  Image 
} from 'react-native'

import Button from '../components/Shared/Button'
import ScrollViewTitle from '../components/Shared/ScrollViewTitle'
import Heading from '../components/Shared/Heading'
import Utils from '../Utils'
import GlobalStyles from '../GlobalStyles'
import HelpText from '../components/Help/HelpText'
import AudioImport from '../components/Shared/AudioImport'

class SmallButton extends Component {
  render () {
    return (
      <Button 
        color="#48C6EF" 
        text={this.props.text} 
        disabled={this.props.disabled} 
        viewStyle={[this.props.viewStyle]}
        onPress={() => this.props.onPress()} />
    )
  }
}

class HText extends Component {
  render () {
    if (this.props.show) {
      return (
        <Text style={styles.text} selectable>{this.props.text}</Text>
      )
    } else { return null }
  }
}

export default class Help extends Component {
  static navigatorStyle = Utils.scrollViewTitleNavStyle()
  
  constructor (props) {
    super(props)

    var date = new Date()
    this.state = {
      addingANewProgram: false,
      editingAProgram: false,
      deletingAProgram: false,
      helpImporting: this.props.helpWithImporting || false,
      onYourPhone: this.props.onYourPhone || false,
      onAComputerOrCD: false,
      year: date.getFullYear(),
      version: "0.1.0"
    }
  }

  componentDidMount() {
    if (this.props.onYourPhone) {
      this.refs.scrollView.scrollTo({x: 0, y: 650, animated: true})
    } else if (this.props.helpWithImporting) {
      this.refs.scrollView.scrollTo({x: 0, y: 330, animated: true})
    }
  }

  renderOnYourPhone () {
    if (this.state.onYourPhone) {
      return (
        <View>
          <Text style={[styles.text, styles.textUnderLink]}>1. Open your music file on your phone, and tap the Share icon in the bottom left. It looks like an upwards arrow inside a box.</Text>
          <Image source={require('../assets/images/instructions_1.png')} style={[GlobalStyles.image, styles.image]} resizeMode="contain"/>
          <Text style={[styles.text, styles.textUnderLink]}>2. Tap "Import to Windup". The file will be copied over to Windup, and the New Program screen will apear.</Text>
          <Image source={require('../assets/images/instructions_2.png')} style={[GlobalStyles.image, styles.image]} resizeMode="contain"/>
          <Text style={[styles.text, styles.textUnderLink]}>3. You’re good to go! Follow the instructions in “Adding a new program” to finish importing.</Text>
        </View>
      )
    }
  }

  renderHelpImporting () {
    if (this.state.helpImporting) {
      return (
        <View>
          <Text style={[styles.text, styles.textUnderLink]}>Where is your program music stored? {'\n\n'} Note: you need to have the actual music file (.aac, .mp3, .mp4, .wav, etc) and not stored on iTunes, Apple Music, Spotify, Tidal, or Pandora or Youtube.</Text>
          <SmallButton text='> On your phone' onPress={() => this.setState({onYourPhone: !this.state.onYourPhone})} viewStyle={styles.link} />
          {this.renderOnYourPhone()}
          <SmallButton text='> On your computer or CD' onPress={() => this.setState({onAComputerOrCD: !this.state.onAComputerOrCD})} viewStyle={styles.link} />
          <HText show={this.state.onAComputerOrCD} text={HelpText.onAComputerOrCD()} />
        </View>
      )
    }
  }

  render () {
    return (
        <ScrollView 
          ref='scrollView' 
          style={[GlobalStyles.container, GlobalStyles.innerContainer]}
          keyboardDismissMode='interactive' 
          showsVerticalScrollIndicator={false}
          onScroll={(event) => Utils.handleScroll(event, this.props.navigator)}
          scrollEventThrottle={16}>
            <AudioImport navigator={this.props.navigator} />
            <Heading heading='Help' onPressX={() => this.props.navigator.dismissModal()} />
            <Button color="#e94e77" text='Adding a new program' onPress={() => this.setState({addingANewProgram: !this.state.addingANewProgram})} viewStyle={[styles.link]} />
            <HText show={this.state.addingANewProgram} text={HelpText.addingANewProgram()} />

            <Button color="#d68189" text='Editing a program' viewStyle={[styles.link]} onPress={() => this.setState({editingAProgram: !this.state.editingAProgram})} />
            <HText show={this.state.editingAProgram} text={HelpText.editingAProgram()} />

            <Button color="#c6a49a" text='Deleting a program' viewStyle={[styles.link]} onPress={() => this.setState({deletingAProgram: !this.state.deletingAProgram})} />
            <HText show={this.state.deletingAProgram} text={HelpText.deletingAProgram()} />

            <Button color="#79bd9a" text='Help with importing music' viewStyle={[styles.link]} onPress={() => this.setState({helpImporting: !this.state.helpImporting})} />
            {this.renderHelpImporting()}

            <Button color="#3b8686" text='Visit developer website' viewStyle={[styles.link]} onPress={() => this.openLink()} />

             <View style={styles.versionAndCopyright}>
              <Text allowFontScaling={false} style={styles.span}>Windup v{this.state.version}</Text>
              <Text allowFontScaling={false} style={styles.span}>(c) {this.state.year} Olivia Chang</Text>
            </View>
        </ScrollView>
    )
  }

  openLink () {
    Linking.openURL('https://windup.oliviachang.me').catch(err => console.error('An error occurred', err));
  }
}

const styles = StyleSheet.create({
  link: {
    marginBottom: 20,
    alignSelf: 'flex-start'
  },
  text: {
    marginBottom: 40,
    color: '#878787',
    fontSize: 15,
    fontFamily: 'Circular-Book'
  },
  textUnderLink: {
    marginTop: 0
  },
  linkToWebsite: {
    marginTop: 20,
    fontSize: 18
  },
  versionAndCopyright: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  span: {
    color: '#808080',
    fontFamily: 'Circular-Book',
    fontSize: 10,
    margin: 5
  },
  image: {
    height: 600
  }
})

module.exports = Help
