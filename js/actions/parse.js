// import Parse from 'parse/react-native'
// import { InteractionManager } from 'react-native'
// import type { ThunkAction } from './types'
//
// const Notification = Parse.Object.extend('Notification');
//
// function loadParseQuery(type: string, query: Parse.Query): ThunkAction {
//   console.log('LoadingParseQuery')
//   return (dispatch) => {
//     return query.find({
//       success: (list) => {
//         // We don't want data loading to interfere with smooth animations
//         InteractionManager.runAfterInteractions(() => {
//           // Flow can't guarantee {type, list} is a valid action
//           dispatch(({type, list}: any))
//         })
//       },
//       error: logError,
//     })
//   }
// }

// module.exports = {
//   loadNotifications: (): ThunkAction => {
//     loadParseQuery('LOADED_NOTIFICATIONS', new Parse.Query(Notification))
//   }
// }
// const type = "LOADED_NOTIFICATIONS"
//
// module.exports = {
//   loadNotifications: (): ThunkAction => {
//     query = new Parse.Query(Notification)
//     console.log(query)
//     return (dispatch) => {
//       return query.find({
//         success: (list) => {
//           InteractionManager.runAfterInteractions(() => {
//             dispatch(({type, list}))
//           })
//         },
//         error: console.log('error')
//       })
//     }
//   }
// }
