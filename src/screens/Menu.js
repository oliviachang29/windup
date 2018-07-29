import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'
import Button from '../components/Shared/Button'
import ShareWindup from '../components/Shared/ShareWindup'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import store from 'react-native-simple-store'
import realm from '../realm'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canAddNewProgram: true
    }
  }

  componentDidMount () {
     store.get('user') 
      .then(result => { 
        var canAddNewProgram = result.hasSharedApp || realm.objects('Program').length === 0 
        this.setState({canAddNewProgram: canAddNewProgram}) 
      }) 
      .catch(error => { 
        console.log(error) 
        store 
          .update('user', { 
            hasSharedApp: false 
          }) 
        this.setState({canAddNewProgram: realm.objects('Program').length === 0}) 
      }) 
  }

  gotoMusicDialog () {
    this.props.navigator.dismissLightBox()
    this.props.navigator.showModal({
      screen: 'app.MusicDialog',
      title: 'New Program'
    })
  }

  gotoHelp () {
    this.props.navigator.dismissLightBox()
    this.props.navigator.showModal({
      screen: 'app.Help',
      title: 'Help'
    })
  }

  render () {
    return (
      <View style={GlobalStyles.menu}>
        <View style={styles.addNewProgramView}>
          <Button
            color="#FF7A72"
            disabled={!this.state.canAddNewProgram}
            viewStyle={GlobalStyles.buttonView}
            onPress={() => this.gotoMusicDialog()}
            text='New program' />
          <ShareWindup
            show={!this.state.canAddNewProgram}
            canAddNewProgram={() => this.setState({canAddNewProgram: true})} />
        </View>
        <Button
          color="#ACABFF"
          viewStyle={GlobalStyles.buttonView}
          onPress={() => Utils.shareApp()}
          text='Tell a friend' />
        <Button
          color="#48C6EF"
          viewStyle={GlobalStyles.buttonView}
          onPress={() => this.gotoHelp()}
          text='Help' />
        <Button
          color="#566270"
          viewStyle={GlobalStyles.buttonView}
          onPress={() => this.props.navigator.dismissLightBox()}
          text='Close' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addNewProgramView: {
    flexDirection: 'column'
  },
})

module.exports = Menu
