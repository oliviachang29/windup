import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'
import FancyTextInput from '../Shared/FancyTextInput'

class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount () {
    this.setState({
      newValue: ''
    })
  }

  onChange (title) {
    this.setState({ newValue: title })
    var src = this.props.data.filter((item) => (item.programType + ' ' + item.musicName).match(new RegExp('.*' + title + '.*', 'gi')))
    console.log(src)
    if (title.length === 0) {
      this.props.resetSrc()
    } else {
      this.props.updateSrc(src)
    }
    // if (src.length === 0 || !title.replace(/\s/g, '').length) {
    //   this.props.resetSrc()
    // } else {

    // }
  }

  renderNoProgramsFound (length) {
    if (length === 0) {
      return (
        <Text style={styles.noProgramsFoundText}>No programs found.</Text>
      )
    }
  }

  render () {
    return (
      <View>
        <FancyTextInput style={styles.textInput}
          clearButtonMode='always'
          onChangeText={(text) => this.onChange(text)}
          placeholder='Search for a program'
          returnKeyType='search'
          value={this.state.newValue}
          viewStyle={styles.searchBar} />
        {this.renderNoProgramsFound(this.props.data.length)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 0,
    marginBottom: 20
  },
  noProgramsFoundText: {
    alignSelf: 'center',
    marginTop: 30
  }
})

module.exports = SearchBox
