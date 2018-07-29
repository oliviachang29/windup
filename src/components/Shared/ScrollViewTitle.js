import React, {Component} from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView
} from 'react-native'

import GlobalStyles from '../../GlobalStyles'
import Utils from '../../Utils'

class ScrollViewTitle extends Component {

  render () {
    return (
      <ScrollView 
        style={[GlobalStyles.container, styles.scrollView]} 
        showsVerticalScrollIndicator={false}
        onScroll={(event) => Utils.handleScroll(event, this.props.navigator)}
        scrollEventThrottle={16}>
        <View>{this.props.items}</View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
})

module.exports = ScrollViewTitle
