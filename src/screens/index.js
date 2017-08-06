import {Navigation} from 'react-native-navigation'

import ProgramList from './ProgramList'
import PlayProgram from './PlayProgram'
import NewProgram from './NewProgram'
import EditProgram from './EditProgram'
import Help from './Help'

export default function () {
  Navigation.registerComponent('app.ProgramList', () => ProgramList)
  Navigation.registerComponent('app.PlayProgram', () => PlayProgram)
  Navigation.registerComponent('app.NewProgram', () => NewProgram)
  Navigation.registerComponent('app.EditProgram', () => EditProgram)
  Navigation.registerComponent('app.Help', () => Help)
}
