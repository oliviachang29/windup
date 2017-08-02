import {Navigation} from 'react-native-navigation'

import ProgramList from './ProgramList'
import PlayProgram from './PlayProgram'
import Settings from './Settings'
import NewProgram from './NewProgram'
import EditProgram from './EditProgram'
import Notification from './Notification'

export default function () {
  Navigation.registerComponent('app.ProgramList', () => ProgramList)
  Navigation.registerComponent('app.PlayProgram', () => PlayProgram)
  Navigation.registerComponent('app.Settings', () => Settings)
  Navigation.registerComponent('app.NewProgram', () => NewProgram)
  Navigation.registerComponent('app.EditProgram', () => EditProgram)
  Navigation.registerComponent('app.Notification', () => Notification)
}
