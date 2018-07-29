import {Navigation} from 'react-native-navigation'

import ProgramList from './ProgramList'
import Menu from './Menu'
import MusicDialog from './MusicDialog'
import PlayProgram from './PlayProgram'
import NewProgram from './NewProgram'
import EditProgram from './EditProgram'
import Notification from './Notification'
import Help from './Help'

export default function () {
  Navigation.registerComponent('app.ProgramList', () => ProgramList)
  Navigation.registerComponent('app.Menu', () => Menu)
  Navigation.registerComponent('app.MusicDialog', () => MusicDialog)
  Navigation.registerComponent('app.PlayProgram', () => PlayProgram)
  Navigation.registerComponent('app.NewProgram', () => NewProgram)
  Navigation.registerComponent('app.EditProgram', () => EditProgram)
  Navigation.registerComponent('app.Notification', () => Notification)
  Navigation.registerComponent('app.Help', () => Help)
}
