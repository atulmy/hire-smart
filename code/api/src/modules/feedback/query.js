// App Imports
import params from '../../setup/config/params'
import validate from '../../setup/helpers/validation'
import Feedback from './model'

// Get by ID
export async function feedback({ params: { id } }) {
  // Validation rules
  const rules = [
    {
      data: { value: id },
      check: 'notEmpty',
      message: params.common.message.error.invalidData
    }
  ]

  // Validate
  try {
    validate(rules)
  } catch(error) {
    throw new Error(error.message)
  }

  try {
    const data = await Feedback.findOne({ _id: id })

    return {
      data
    }
  } catch(error) {
    throw new Error(params.common.message.error.server)
  }
}
