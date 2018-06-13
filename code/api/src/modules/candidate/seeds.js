// App Imports
import params from '../../setup/config/params'
import Organization from '../organization/model'
import User from '../user/model'
import Client from '../client/model'
import Panel from '../panel/model'
import Interview from '../interview/model'
import Kanban from '../kanban/model'
import Candidate from './model'

// Seeds
export default async function () {
  console.log('SEED - Candidate..')
  console.log('SEED - Interview..')
  console.log('SEED - Kanban..')

  const user = await User.findOne({ email: 'user@hiresmart.app' })
  const organization = await Organization.findOne()
  const client = await Client.findOne()
  const panel = await Panel.findOne()

  for (let i of [1, 2, 3, 4, 5]) {
    const candidate = await Candidate.create({
      organizationId: organization._id,
      clientId: client._id,
      userId: user._id,
      name: `Candidate ${ i }`,
      email: `candidate.${ i }@${ organization.domain }`,
      mobile: '9876543210',
      experience: '5.5',
      resume: 'resume.pdf',
      salaryCurrent: '10 LPA',
      salaryExpected: '15 LPA'
    })

    await Interview.create({
      organizationId: organization._id,
      clientId: client._id,
      candidateId: candidate._id,
      panelId: panel._id,
      userId: user._id,
      dateTime: '2018-06-01T00:00:00+05:30',
      mode: ''
    })

    await Kanban.create({
      organizationId: organization._id,
      clientId: client._id,
      candidateId: candidate._id,
      userId: user.id,
      status: params.kanban.columns[0].key,
      highlight: false
    })
  }
}
