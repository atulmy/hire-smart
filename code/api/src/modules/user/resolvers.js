// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import User from './model'
import config from '../../setup/config/server'
import params from '../../setup/config/params'

// Create
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, config.saltRounds)

    return await User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

export async function login(parentValue, { email, password }) {
  const user = await User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    const userDetails = user.get()
    const userDetailsToken = {
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      role: userDetails.role
    }

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, config.secret)
      }
    }
  }
}

// Get by ID
export async function getById(parentValue, { id }) {
  return await User.findOne({ where: { id } })
}

// Get all
export async function getAll() {
  return await User.findAll()
}

// Delete
export async function remove(parentValue, { id }) {
  return await User.destroy({ where: { id } })
}

// User genders
export async function getGenders() {
  return Object.values(params.user.gender)
}
