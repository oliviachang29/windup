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
              <Text allowFontScaling={false} style={[GlobalStyles.title, styles.topTitle]}>No programs yet. 😢</Text>
              <Text allowFontScaling={false} style={[GlobalStyles.span, styles.topText]}>Create a program to play music.</Text>
            </View>
          </View>
          <Button
            color="#FF7A72"
            viewStyle={[styles.newProgramButtonView, {borderBottomColor: 'black'}]}
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
  emptyStateContainer: {
    marginTop: 50
  },
  topView: {
    alignItems: 'center'
  },
  topText: {
    marginTop: 10
  },
  newProgramButtonView: {
    alignSelf: 'center',
    marginTop: 50
  },
  newProgramButton: {
    borderBottomWidth: 2,
    paddingBottom: 6
  },
  newProgramText: {
    alignSelf: 'center'
  }
})

module.exports = EmptyState
