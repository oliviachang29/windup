
import React, { Component } from 'react'
import { 
  View, 
  ScrollView,
  StyleSheet,
  Text
} from 'react-native'

import Heading from '../components/Shared/Heading'
import ProgramListView from '../components/ProgramList/ProgramListView'
import GlobalStyles from '../GlobalStyles'
import realm from '../realm'
import {Navigation} from 'react-native-navigation'

var RNFS = require('react-native-fs')

export default class ProgramList extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarTextColor: "#00000000",
    navBarTransparent: true,
  };

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
    this.handleScroll = this.handleScroll.bind(this)
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
    this.props.navigator.showLightBox({
      screen: 'app.Menu', // unique ID registered with Navigation.registerScreen
      passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
      style: {
        backgroundBlur: 'xlight', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: '#00000050', // tint color for the background, you can specify alpha here (optional)
        tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
      }
    });
  }

  handleScroll (event) {
   var offset = event.nativeEvent.contentOffset.y
   if (offset > 50) {
    // show
    this.props.navigator.setStyle({
      navBarTextColor: "#000000",
      navBarTransparent: false,
    })
  } else if (offset > 1) {
    // opacity transition
    this.props.navigator.setStyle({
      navBarTextColor: "#000000" + Math.round((event.nativeEvent.contentOffset.y / 50)*100),
      navBarTransparent: true,
    })
  } else {
    // hide
    this.props.navigator.setStyle({
      navBarTextColor: "#00000000",
      navBarTransparent: true,
    })
   }
  }

  render () {
    return (
      <ScrollView 
        style={[GlobalStyles.container, styles.scrollView]} 
        showsVerticalScrollIndicator={false}
        onScroll={this.handleScroll}
        scrollEventThrottle={16}>
        <View style={[GlobalStyles.innerContainer, styles.innerContainer]}>
          {this.renderHeading()}
          <ProgramListView
            programs={this.props.programs}
            navigator={this.props.navigator}
            canEdit={this.state.canEdit}
            toggleEdit={() => this.setState({ canEdit: true })} />
        </View>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: -7,
  }
})

module.exports = ProgramList
