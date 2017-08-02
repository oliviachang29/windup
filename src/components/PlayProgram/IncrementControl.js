// IncrementControl.js
// Used in PlayProgram.js
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

class IncrementControl extends Component {
  constructor (props) {
    super(props)
    this.state = {
      amount: this.props.amount
    }
    this.onPress = this.onPress.bind(this)
    this.onLongPress = this.onLongPress.bind(this)
  }

  onPress () {
    if (this.state.amount >= this.props.max) {
      this.setState({ amount: 0 })
    } else {
      this.setState({ amount: this.state.amount + this.props.increment })
    }
    this.props.onPress()
  }

  onLongPress () {
    this.setState({ amount: 0 })
    this.props.onLongPress()
  }

  render () {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={() => this.onPress()}
        onLongPress={() => this.onLongPress()}>
        <View>
          <Text style={styles.amount}>{this.state.amount}{this.props.unit}</Text>
          <Text style={styles.caption}>{this.props.caption}</Text>
        </View>
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  amount: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily: 'Circular-Medium'
  },
  caption: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal',
    alignSelf: 'center',
    fontFamily: 'Circular-Book'
  }
})

module.exports = IncrementControl
