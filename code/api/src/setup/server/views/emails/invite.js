export default ({ invitedTo, invitedBy }) => (
`<div>
  <p><strong>Hey ${ invitedTo }</strong></p>
  <p>${ invitedBy } has sent you an invitation to join the organization.</p>
  <a href="http://hiresmart.app">Accept Invitation</a>
</div>`
)
