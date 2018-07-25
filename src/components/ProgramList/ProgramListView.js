import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions
} from 'react-native'

import realm from '../../realm'
import ListViewItem from '../ProgramList/ListViewItem'
import EmptyState from './EmptyState'

const deviceHeight = Dimensions.get('window').height

class ProgramListView extends Component {
  constructor (props) {
    super(props)

    realm.write(() => {
      // realm.delete(realm.objects('Program')) // Deletes all programs
      // realm.create('Program', {id: 1, programType: 'Short', createdAt: new Date(), musicName: 'Jazz Suite No. 2', fileName: 'avatar.mp3', length: 130, delayAmount: 0, repeat: true, currentTime: 0, color: '#EE7785'})
      // realm.create('Program', {id: 2, programType: 'Long', createdAt: new Date(), musicName: 'Waving Through A Window', fileName: 'elcaminoreal.mp3', length: 103, delayAmount: 0, repeat: false, currentTime: 0, color: '#84B1ED'})
      // realm.create('Program', {id: 3, programType: 'Dramatic', createdAt: new Date(), musicName: 'Tree of Life: Wild Side', fileName: 'neverland.mp3', length: 103, delayAmount: 0, repeat: false, currentTime: 0, color: '#60c5ba'})
      // realm.create('Program', {id: 4, programType: 'Holiday Show', createdAt: new Date(), musicName: 'Leaving Hogwarts', fileName: 'elcaminoreal.mp3', length: 103, delayAmount: 0, repeat: false, currentTime: 0, color: '#9013FE'})
    })

    var src = realm.objects('Program')

    this.state = {
      src: src
    }

    realm.addListener('change', () => {
      this.setState({ src: realm.objects('Program') })
    })
  }

  render () {
    var height = this.state.src.length !== 0 ? {minHeight: deviceHeight*.5} : {}
    return (
      <View>
        <FlatList
          data={Array.from(this.state.src)}
          style={height}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            <ListViewItem program={item}
              navigator={this.props.navigator}
              canEdit={this.props.canEdit}
              toggleEdit={this.props.toggleEdit} />}
        />
        <EmptyState shouldRender={this.state.src.length === 0} navigator={this.props.navigator} />
      </View>
    )
  }
}

module.exports = ProgramListView
