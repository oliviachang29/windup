'use strict'

import React, {Component} from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native'

import Button from '../components/Shared/Button'
import Heading from '../components/Shared/Heading'
import GlobalStyles from '../GlobalStyles'
import HelpText from '../components/Help/HelpText'

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
  constructor (props) {
    super(props)
    this.props.navigator.setStyle({
      navBarHidden: true
    })
    var date = new Date()
    this.state = {
      addingANewProgram: false,
      editingAProgram: false,
      deletingAProgram: false,
      helpImporting: this.props.helpWithImporting || false,
      onYourPhone: false,
      onAComputerOrCD: false,
      inAFileStorageApp: false,
      somewhereElse: false,
      year: date.getFullYear(),
      version: "1.0.1"
    }
  }

  renderOnYourPhone () {
    if (this.state.onYourPhone) {
      return (
        <View>
          <Text style={[styles.text, styles.textUnderLink]}>Where on your phone is your music stored?</Text>
          <SmallButton text='>> In a file storage app' onPress={() => this.setState({inAFileStorageApp: !this.state.inAFileStorageApp})} viewStyle={styles.link} />
          <HText show={this.state.inAFileStorageApp} text={HelpText.inAFileStorageApp()} />
          <SmallButton text='>> Somewhere else' onPress={() => this.setState({somewhereElse: !this.state.somewhereElse})} viewStyle={styles.link} />
          <HText show={this.state.somewhereElse} text={HelpText.somewhereElse()} />
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
      <View style={GlobalStyles.innerContainer}>
        <Heading heading='Help' onPressX={() => this.props.navigator.dismissModal()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Button color="#e94e77" text='Adding a new program' onPress={() => this.setState({addingANewProgram: !this.state.addingANewProgram})} viewStyle={[styles.link]} />
          <HText show={this.state.addingANewProgram} text={HelpText.addingANewProgram()} />

          {/*<Button color="#d68189" text='Editing a program' viewStyle={[styles.link]} onPress={() => this.setState({editingAProgram: !this.state.editingAProgram})} />
          <HText show={this.state.editingAProgram} text={HelpText.editingAProgram()} />*/}

          <Button color="#c6a49a" text='Deleting a program' viewStyle={[styles.link]} onPress={() => this.setState({deletingAProgram: !this.state.deletingAProgram})} />
          <HText show={this.state.deletingAProgram} text={HelpText.deletingAProgram()} />

          <Button color="#79bd9a" text='Help with importing music' viewStyle={[styles.link]} onPress={() => this.setState({helpImporting: !this.state.helpImporting})} />
          {this.renderHelpImporting()}

          <Button color="#3b8686" text='Visit developer website' viewStyle={[styles.link]} onPress={() => this.openLink()} />

           <View style={styles.versionAndCopyright}>
            <Text allowFontScaling={false} style={styles.copyright}>Windup v{this.state.version}</Text>
            <Text allowFontScaling={false} style={styles.copyright}>(c) {this.state.year} Olivia Chang</Text>
          </View>
          <View style={{marginBottom: 150}} />
        </ScrollView>
      </View>
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
  },
  copyright: {
    color: '#808080',
    fontFamily: 'Circular-Book',
    fontSize: 10,
    marginTop: 10,
    marginBottom: 0
  }
})

module.exports = Help
