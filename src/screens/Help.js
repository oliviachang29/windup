'use strict'

import React, {Component} from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  Platform
} from 'react-native'

import Button from '../components/Shared/Button'
import ScrollViewTitle from '../components/Shared/ScrollViewTitle'
import Heading from '../components/Shared/Heading'
import Utils from '../Utils'
import GlobalStyles from '../GlobalStyles'
import HelpText from '../components/Help/HelpText'
import AudioImport from '../components/Shared/AudioImport'
import FastImage from 'react-native-fast-image'

const majorVersionIOS = parseInt(Platform.Version, 10);
const aboveiOS11 = majorVersionIOS >= 11

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
  static navigatorStyle = Utils.navStyle()
  
  constructor (props) {
    super(props)

    var date = new Date()
    this.state = {
      addingANewProgram: false,
      editingAProgram: false,
      deletingAProgram: false,
      helpImporting: this.props.helpWithImporting || this.props.fileStorageApp || this.props.somewhereElse || false,
      onYourPhone: this.props.onYourPhone || this.props.fileStorageApp || this.props.somewhereElse || false,
      fileStorageApp: (this.props.fileStorageApp && aboveiOS11) || false,
      somewhereElse: this.props.somewhereElse || false,
      onAComputerOrCD: false,
      year: date.getFullYear(),
      version: "1.1.2"
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

   onNavigatorEvent(event) {
    switch(event.id) {
      case 'didAppear':
        Utils.trackScreen("app.Help")
       break;
    }
  }

  componentDidMount() {
    var yValue = 0;
    if (this.props.fileStorageApp) {
      yValue = 550
    } else if (this.props.somewhereElse) {
      yValue = aboveiOS11 ? 640 : 550
    } else if (this.props.helpWithImporting) {
      yValue = 330
    }
    this.refs.scrollView.scrollTo({x: 0, y: yValue, animated: true})
  }

  renderSomewhereElse () {
    if (this.state.somewhereElse) {
      return (
        <View>
          <Text style={[styles.text, styles.textUnderLink]}>1. Open your music file on your phone, and tap the Share icon in the bottom left. It looks like an upwards arrow inside a box.</Text>
          <FastImage source={require('../assets/images/somewhereelse_1.png')} style={[GlobalStyles.image, styles.image]} resizeMode={FastImage.resizeMode.contain} />
          <Text style={[styles.text, styles.textUnderLink]}>2. Tap "Import to Windup". The file will be copied over to Windup, and the New Program screen will apear.</Text>
          <FastImage source={require('../assets/images/somewhereelse_2.png')} style={[GlobalStyles.image, styles.image]} resizeMode={FastImage.resizeMode.contain} />
          <Text style={[styles.text, styles.textUnderLink]}>3. You’re good to go! Follow the instructions in “Adding a new program” to finish importing.</Text>
        </View>
      )
    }
  }

  renderFileStorageApp () {
    if (this.state.fileStorageApp) {
      return (
        <View>
          <Text style={[styles.text, styles.textUnderLink]}>Make sure you have the file storage app installed. This example uses Google Drive, but it will work for most file sharing apps (Dropbox, OneDrive, Amazon Drive, etc.)</Text>
          <Text style={[styles.text, styles.textUnderLink]}>1. Open the Files app.</Text>
          <FastImage source={require('../assets/images/filestorage_1.png')} style={[GlobalStyles.image, styles.image]} resizeMode={FastImage.resizeMode.contain} />
          <Text style={[styles.text, styles.textUnderLink]}>2. Go to the "Browse" tab, and tap "Edit" in the top right.</Text>
          <FastImage source={require('../assets/images/filestorage_2.png')} style={[GlobalStyles.image, styles.image]} resizeMode={FastImage.resizeMode.contain} />
          <Text style={[styles.text, styles.textUnderLink]}>3. Tap the switch to the right of the "Drive" icon to enable Google Drive.</Text>
          <FastImage source={require('../assets/images/filestorage_3.png')} style={[GlobalStyles.image, styles.image]} resizeMode={FastImage.resizeMode.contain} />
          <Text style={[styles.text, styles.textUnderLink]}>4. Tap "Done" in the top right corner.</Text>
          <FastImage source={require('../assets/images/filestorage_4.png')} style={[GlobalStyles.image, styles.image]} resizeMode={FastImage.resizeMode.contain} />
          <Text style={[styles.text, styles.textUnderLink]}>5. You’re good to go! Follow the instructions in "Adding a new program" to finish importing. Make sure to select "In the Files app" when you add a program.</Text>
        </View>
      )
    }
  }

  renderOnYourPhone () {
    if (this.state.onYourPhone) {
      return (
        <View>
          {!aboveiOS11 ? null :
            <View>
              <Button 
                text='>> In a file storage app' 
                onPress={() => this.setState({fileStorageApp: !this.state.fileStorageApp})} 
                viewStyle={styles.link}
                color="#48C6EF" />
               {this.renderFileStorageApp()}
            </View>
          }
          <Button 
            text='>> Somewhere else' 
            onPress={() => this.setState({somewhereElse: !this.state.somewhereElse})} 
            viewStyle={styles.link}
            color="#48C6EF"/>
          {this.renderSomewhereElse()}
        </View>
      )
    }
  }

  renderHelpImporting () {
    if (this.state.helpImporting) {
      return (
        <View>
          <Text style={[styles.text, styles.textUnderLink]}>Where is your program music stored? {'\n\n'} Note: you need to have the actual music file (.aac, .mp3, .mp4, .wav, etc) and not stored on iTunes, Apple Music, Spotify, Tidal, or Pandora or Youtube.</Text>
          <Button 
            text='> On your phone' 
            onPress={() => this.setState({onYourPhone: !this.state.onYourPhone})} 
            viewStyle={styles.link}
            color="#ACABFF"/>
          {this.renderOnYourPhone()}
          <Button 
            text='> On your computer or CD' 
            onPress={() => this.setState({onAComputerOrCD: !this.state.onAComputerOrCD})} 
            viewStyle={styles.link}
            color="#ACABFF"/>
          <HText show={this.state.onAComputerOrCD} text={HelpText.onAComputerOrCD()} />
        </View>
      )
    }
  }

  renderEdit() {
    if (this.state.editingAProgram) {
      return (
        <View>
          <Text style={[styles.text, styles.textUnderLink]}>1. From the home menu, swipe left on the program you would like to edit.</Text>
          <Text style={[styles.text, styles.textUnderLink]}>2. Tap "Edit".</Text>
          <Text style={[styles.text, styles.textUnderLink]}>3. From this screen, you can edit the program type and music name.</Text>
          <FastImage source={require('../assets/images/edit_1.png')} style={[GlobalStyles.image, styles.image]} resizeMode={FastImage.resizeMode.contain} />
        </View>
      )
    }
  }

  renderDelete() {
    if (this.state.deletingAProgram) {
      return (
        <View>
          <Text style={[styles.text, styles.textUnderLink]}>Warning! This action cannot be undone.</Text>
          <Text style={[styles.text, styles.textUnderLink]}>1. From the home menu, swipe left on the program you would like to edit.</Text>
          <Text style={[styles.text, styles.textUnderLink]}>2. Tap "Delete".</Text>
          <Text style={[styles.text, styles.textUnderLink]}>3. Confirm you want to delete by tapping "Delete" again.</Text>
          <FastImage source={require('../assets/images/delete_1.png')} style={[GlobalStyles.image, styles.image]} resizeMode={FastImage.resizeMode.contain} />
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

            <Button color="#d68189" text='Help with importing music' viewStyle={[styles.link]} onPress={() => this.setState({helpImporting: !this.state.helpImporting})} />
            {this.renderHelpImporting()}

            <Button color="#c6a49a" text='Editing a program' viewStyle={[styles.link]} onPress={() => this.setState({editingAProgram: !this.state.editingAProgram})} />
            {this.renderEdit()}

            <Button color="#79bd9a" text='Deleting a program' viewStyle={[styles.link]} onPress={() => this.setState({deletingAProgram: !this.state.deletingAProgram})} />
            {this.renderDelete()}

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
    marginBottom: 20,
    color: '#878787',
    fontSize: 16,
    fontFamily: 'Circular-Book'
  },
  textUnderLink: {
    marginTop: 0
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
    height: 580
  }
})

module.exports = Help
