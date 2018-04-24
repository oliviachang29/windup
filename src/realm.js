'use strict'

const Realm = require('realm')

class Program extends Realm.Object {}
Program.schema = {
  name: 'Program',
  primaryKey: 'id',
  properties: {
    id: 'int',
    createdAt: 'date',
    programType: 'string',
    musicName: 'string',
    fileName: 'string',
    delayAmount: 'int',
    repeat: 'bool',
    currentTime: 'double',
    color: 'string'
  }
}

export default new Realm({
  schema: [Program],
  schemaVersion: 22
})
