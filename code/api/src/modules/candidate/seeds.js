// App Imports
import params from '../../setup/config/params'
import Organization from '../organization/model'
import User from '../user/model'
import Project from '../project/model'
import Job from '../job/model'
import Interviewer from '../interviewer/model'
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
  const project = await Project.findOne()
  const job = await Job.findOne()
  const interviewer = await Interviewer.findOne()

  const candidates = [
    { name: 'Arun Kumar', email: 'arun@hiresmart.app' },
    { name: 'Rajesh Kumar', email: 'rajesh@hiresmart.app' }
  ]

  for (let i of [0, 1]) {
    const candidate = await Candidate.create({
      organizationId: organization._id,
      projectId: project._id,
      jobId: job._id,
      userId: user._id,
      name: candidates[i].name,
      email: candidates[i].email,
      mobile: '9876543210',
      experience: '5.5',
      resume: 'resume.pdf',
      salaryCurrent: '10 LPA',
      salaryExpected: '15 LPA'
    })

    const interview = await Interview.create({
      organizationId: organization._id,
      projectId: project._id,
      candidateId: candidate._id,
      interviewerId: interviewer._id,
      userId: user._id,
      dateTime: '2018-06-01T00:00:00+05:30',
      mode: params.interview.modes[0].key
    })

    await Kanban.create({
      organizationId: organization._id,
      projectId: project._id,
      candidateId: candidate._id,
      interviews: [interview._id],
      userId: user.id,
      status: params.kanban.columns[0].key,
      highlight: false
    })
  }
}
