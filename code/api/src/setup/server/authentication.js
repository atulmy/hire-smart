// Imports
import jwt from 'jsonwebtoken'

// App Imports
import { SECRET_KEY } from '../../setup/config/env'
import User from '../../modules/user/model'

// Authentication middleware
export default async function (request, response, next) {
  let authToken = request.headers.authorization

  if (authToken && authToken !== null) {
    try {
      const token = authToken.split(' ')
      const userToken = jwt.verify(token[1], SECRET_KEY)
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
