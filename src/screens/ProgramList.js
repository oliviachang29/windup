
import React, { Component } from 'react'
import { View } from 'react-native'

import Heading from '../components/Shared/Heading'
import Message from '../components/Shared/Message'
import CodePushComponent from '../components/Shared/CodePushComponent'
import ProgramListView from '../components/ProgramList/ProgramListView'
import ProgramSlidingUpPanel from '../components/ProgramList/ProgramSlidingUpPanel'
import GlobalStyles from '../GlobalStyles'

export default class ProgramList extends Component {
  constructor (props) {
    super(props)
    this.props.navigator.setStyle({
      navBarHidden: true
    })

    this.state = {
      canEdit: this.props.canEdit || false,
      visible: false
    }
  }

  renderHeading () {
    if (this.state.canEdit) {
      return (<Heading heading='Programs' onPressX={() => this.setState({canEdit: !this.state.canEdit})} />)
    } else {
      return (<Heading heading='Programs' onPressBurger={() => this.setState({ visible: !this.state.visible })} />)
    }
  }

  render () {
    return (
      <View style={GlobalStyles.container}>
        <CodePushComponent />
        <View style={GlobalStyles.innerContainer}>
          {this.renderHeading()}
          <Message message={this.props.message} type={this.props.messageType} />
          <ProgramListView
            programs={this.props.programs}
            navigator={this.props.navigator}
            canEdit={this.state.canEdit}
            toggleEdit={() => this.setState({ canEdit: true })} />
        </View>
        <ProgramSlidingUpPanel
          navigator={this.props.navigator}
          onChangeVisibility={(change) => this.setState({ visible: change })}
          visible={this.state.visible}
          toggleEdit={() => this.setState({ canEdit: true })}
        />
      </View>
    )
  }

  showNotification () {
    this.props.navigator.showInAppNotification({
      screen: 'app.Notification',
      passProps: {title: 'hi', text: 'goodbye'}
    })
  }
}

module.exports = ProgramList
