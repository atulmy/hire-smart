// App Imports
import Organization from './model'

// Seeds
export default async function () {
  console.log('SEED - Organization..')

  await Organization.create({
    name: 'HireSmart Inc.',
    description: 'Streamline your hiring process, scheduling interviews and tracking candidates.',
    domain: 'hiresmart.app'
  })
}
