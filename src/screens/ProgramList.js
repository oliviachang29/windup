
import React, { Component } from 'react'
import { 
  View, 
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native'
import uuid from 'uuid'
import Heading from '../components/Shared/Heading'
import ProgramListView from '../components/ProgramList/ProgramListView'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import realm from '../realm'
import AudioImport from '../components/Shared/AudioImport'
import ScrollViewTitle from '../components/Shared/ScrollViewTitle'
import CodePushComponent from '../components/Shared/CodePushComponent'

var RNFS = require('react-native-fs')

export default class ProgramList extends Component {
  static navigatorStyle = Utils.navStyle()

  constructor (props) {
    super(props)
    this.props.navigator.setStyle({
      navBarHidden: true
    })
    console.log(RNFS.DocumentDirectoryPath)
    this.state = {
      canEdit: this.props.canEdit || false,
      visible: false
    }
    Utils.createSession("app.ProgramList")
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

   onNavigatorEvent(event) {
    switch(event.id) {
      case 'didAppear':
        Utils.trackScreen("app.ProgramList")
       break;
    }
  }

  componentDidMount () {
    this.props.navigator.toggleNavBar({
      to: 'shown',
      animated: false
    });
  }

  renderHeading () {
    if (this.state.canEdit) {
      return (<Heading heading='Programs' onPressX={() => this.setState({canEdit: !this.state.canEdit})} />)
    } else {
      return (<Heading heading='Programs' onPressBurger={() => this.openMenu()} />)
    }
  }

  openMenu() {
    Utils.trackEvent("app.ProgramList", "opened menu")
    this.props.navigator.showLightBox({
      screen: 'app.Menu',
      style: {
        backgroundBlur: 'xlight', // 'dark' / 'light' / 'xlight' / 'none'
        backgroundColor: '#00000050', // I *think* this is what's causing the "cannot calculate efficiently" warning
        tapBackgroundToDismiss: true
      }
    });
  }

  render () {
    return (
      <ScrollViewTitle navigator={this.props.navigator} 
      items={
        <View style={[GlobalStyles.innerContainer, styles.innerContainer]}>
          <AudioImport navigator={this.props.navigator} />
          <CodePushComponent />
          {this.renderHeading()}
          <ProgramListView
            programs={this.props.programs}
            navigator={this.props.navigator}
            canEdit={this.state.canEdit}
            toggleEdit={() => this.setState({ canEdit: true })} />
        </View>
      }>
      </ScrollViewTitle>
    )
  }

}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: 0,
  }
})

module.exports = ProgramList
