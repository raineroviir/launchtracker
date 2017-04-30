import Realm from 'realm'

class Push extends Realm.Object {}
Push.schema = {
  name: 'Push',
  properties: {
    deviceToken: 'string',
    enabled: 'bool'
  }
}

export default new Realm({schema: [Push]})
