// Unused
import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import GlobalStyles from '../../GlobalStyles'

class FancyTextInput extends Component {
  render () {
    if (this.props.fileSelected) {
      return (
        <View>
          <Text allowFontScaling={false} style={[GlobalStyles.title, styles.selectedMusicText]}>Selected music:</Text>
          <Text allowFontScaling={false} style={[GlobalStyles.text, styles.fileNameText]}>{this.props.fileName}</Text>
          <TouchableOpacity
            style={[GlobalStyles.thinUnderline, styles.uploadDifferentMusicView]}
            onPress={() => this.props.uploadDifferentMusic()}>
            <Text allowFontScaling={false} style={[GlobalStyles.span, styles.uploadDifferentMusicText]}>Upload different music</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <TouchableOpacity style={styles.importMusicButtonContainer} onPress={() => this.props.openDocumentPicker()}>
          <Text allowFontScaling={false} style={GlobalStyles.title}>🎵 Import Music</Text>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  importMusicButtonContainer: {
    width: 317,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E6E6E6',
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    marginTop: 100
  },
  importMusicButton: {
    color: '#808080'
  },
  selectedMusicText: {
    marginTop: 43
  },
  fileNameText: {
    marginTop: 7
  },
  uploadDifferentMusicView: {
    width: 156
  },
  uploadDifferentMusicText: {
    borderBottomColor: '#95989A',
    borderBottomWidth: 1,
    color: '#808080',
    marginTop: 22,
    marginBottom: 5
  }
})

module.exports = FancyTextInput
