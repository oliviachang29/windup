import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native'

import realm from '../../realm'
import ListViewItem from '../ProgramList/ListViewItem'
import EmptyState from './EmptyState'

class ProgramListView extends Component {
  constructor (props) {
    super(props)

    realm.write(() => {
      realm.delete(realm.objects('Program')) // Deletes all programs
      // realm.create('Program', {id: 1, programType: '1', createdAt: new Date(), musicName: 'Avatar', fileName: 'avatar.mp3', length: 130, delayAmount: 0, repeat: true, currentTime: 0, color: '#F4A04F'})
      // realm.create('Program', {id: 2, programType: '2', createdAt: new Date(), musicName: 'Neverland', fileName: 'neverland.mp3', length: 103, delayAmount: 0, repeat: false, currentTime: 0, color: '#5EBCD0'})
      // realm.create('Program', {id: 3, programType: '3', createdAt: new Date(), musicName: 'Avatar', fileName: 'avatar.mp3', length: 130, delayAmount: 0, repeat: true, currentTime: 0, color: '#F4A04F'})
      // realm.create('Program', {id: 4, programType: '4', createdAt: new Date(), musicName: 'Neverland', fileName: 'neverland.mp3', length: 103, delayAmount: 0, repeat: false, currentTime: 0, color: '#5EBCD0'})
      // realm.create('Program', {id: 5, programType: '1', createdAt: new Date(), musicName: 'Avatar', fileName: 'avatar.mp3', length: 130, delayAmount: 0, repeat: true, currentTime: 0, color: '#F4A04F'})
      // realm.create('Program', {id: 6, programType: '2', createdAt: new Date(), musicName: 'Neverland', fileName: 'neverland.mp3', length: 103, delayAmount: 0, repeat: false, currentTime: 0, color: '#5EBCD0'})
      // realm.create('Program', {id: 7, programType: '3', createdAt: new Date(), musicName: 'Avatar', fileName: 'avatar.mp3', length: 130, delayAmount: 0, repeat: true, currentTime: 0, color: '#F4A04F'})
      // realm.create('Program', {id: 8, programType: '4', createdAt: new Date(), musicName: 'Neverland', fileName: 'neverland.mp3', length: 103, delayAmount: 0, repeat: false, currentTime: 0, color: '#5EBCD0'})
    })

    var src = realm.objects('Program').sorted('createdAt')

    this.state = {
      src: src,
      initialSrc: src
    }

    realm.addListener('change', () => {
      var src = realm.objects('Program').sorted('createdAt')
      this.setState({ src: src, initialSrc: src })
    })
  }

  render () {
    return (
      <View>
        <FlatList
          data={Array.from(this.state.src)}
          style={styles.flatList}
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

const styles = StyleSheet.create({
  flatList: {
    marginBottom: 100
  }
})

module.exports = ProgramListView
