import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import Button from '../Shared/Button'
import GlobalStyles from '../../GlobalStyles'

class EmptyState extends Component {
  render () {
    if (this.props.shouldRender) {
      return (
        <View>
          <View style={styles.emptyStateContainer}>
            <View style={styles.topView}>
              <Text style={[GlobalStyles.title, styles.topTitle]}>No programs yet. 😢</Text>
              <Text style={[GlobalStyles.span, styles.topText]}>Create a program to play a routine.</Text>
            </View>
          </View>
          <Button
            viewStyle={[GlobalStyles.thickUnderline, styles.newProgramButtonView, {borderBottomColor: 'black'}]}
            textStyle={styles.newProgramText}
            text='Create a program'
            onPress={() => this.gotoNewProgram()} />
        </View>
      )
    } else {
      return (<View />)
    }
  }

  gotoNewProgram () {
    this.props.navigator.showModal({
      screen: 'app.NewProgram'
    })
  }
}

const styles = StyleSheet.create({
  topView: {
    alignItems: 'center'
  },
  topText: {
    marginTop: 10
  },
  newProgramButtonView: {
    alignSelf: 'center',
    marginTop: 150
  },
  newProgramButton: {
    borderBottomWidth: 2,
    paddingBottom: 6
  },
  newProgramText: {
    color: 'black'
  }
})

module.exports = EmptyState
