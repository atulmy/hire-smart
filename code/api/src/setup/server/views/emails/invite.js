export default ({ invitedTo, invitedBy, organizationName }) =>
`<div>
  <p>Hi ${ invitedTo },</p>
  
  <p>I'm inviting you to join ${ organizationName } on HIRESMART, an application to streamline your hiring process, scheduling interviews and tracking candidates.</p>
  
  <a href="http://hiresmart.app">Accept Invitation</a>
  
  <br/>
  <br/>
  
  <p>
    Thanks, <br/>
    ${ invitedBy }
  </p>
</div>`
