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
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        disabled={this.props.disabled}
        style={[{marginTop: 20}, this.props.viewStyle]}>
        <Text style={[GlobalStyles.text, this.props.textStyle]}>{this.props.text}</Text>
      </TouchableOpacity>
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
    this.state = {
      addingANewProgram: false,
      editingAProgram: false,
      deletingAProgram: false,
      helpImporting: this.props.helpWithImporting || false,
      onYourPhone: false,
      onAComputerOrCD: false,
      inAFileStorageApp: false,
      somewhereElse: false

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
          <Button text='Adding a new program' onPress={() => this.setState({addingANewProgram: !this.state.addingANewProgram})} viewStyle={[styles.link, GlobalStyles.thickUnderline]} />
          <HText show={this.state.addingANewProgram} text={HelpText.addingANewProgram()} />

          <Button text='Editing a program' viewStyle={[styles.link, GlobalStyles.thickUnderline]} onPress={() => this.setState({editingAProgram: !this.state.editingAProgram})} />
          <HText show={this.state.editingAProgram} text={HelpText.editingAProgram()} />

          <Button text='Deleting a program' viewStyle={[styles.link, GlobalStyles.thickUnderline]} onPress={() => this.setState({deletingAProgram: !this.state.deletingAProgram})} />
          <HText show={this.state.deletingAProgram} text={HelpText.deletingAProgram()} />

          <Button text='Help with importing music' viewStyle={[styles.link, GlobalStyles.thickUnderline]} onPress={() => this.setState({helpImporting: !this.state.helpImporting})} />
          {this.renderHelpImporting()}

          <Text style={[GlobalStyles.text, styles.linkToWebsite]} onPress={() => this.openLink()}>Visit developer website</Text>

          <View style={{marginBottom: 150}} />
        </ScrollView>
      </View>
    )
  }

  openLink () {
    Linking.openURL('https://www.windup.top').catch(err => console.error('An error occurred', err));
  }
}

const styles = StyleSheet.create({
  link: {
    marginBottom: 20,
    alignSelf: 'flex-start'
  },
  text: {
    marginTop: -20,
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
  }
})

module.exports = Help
