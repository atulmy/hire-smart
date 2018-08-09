// Imports
import jwt from 'jsonwebtoken'
import serverConfig from '../config/server.json'

// App Imports
import User from '../../modules/user/model'

// Authentication middleware
export default async function (request, response, next) {
  let authToken = request.headers.authorization

  if (authToken && authToken !== null) {
    try {
      const token = authToken.split(' ')
      const userToken = jwt.verify(token[1], serverConfig.secret)
      let user = await User.findOne({ _id: userToken.id })

      if(user) {
        user.eventId = userToken.eventId
        request.user = user
      }
    } catch (e) {
      console.warn('Invalid token detected.')
    }
  } else {
    request.user = {}
  }

  next()
}
