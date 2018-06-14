export default ({ invitedTo, invitedBy }) =>
`<div>
  <p>Hi ${ invitedTo },</p>
  <p>${ invitedBy } has sent you an invitation to join the organization.</p>
  <a href="http://hiresmart.app"><h3>Accept Invitation</h3></a>
</div>`
