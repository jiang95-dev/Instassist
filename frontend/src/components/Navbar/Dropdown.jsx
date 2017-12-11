import React from 'react'
import { Dropdown, Image } from 'semantic-ui-react'

const trigger = (
  <span>
    <Image avatar src={"https://freeiconshop.com/wp-content/uploads/edd/person-flat.png"} />
  </span>
)

const options = [
  { key: 'user', text: 'Account', icon: 'user' },
  { key: 'settings', text: 'Settings', icon: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
]

const DropdownImageTriggerExample = () => (
  <Dropdown trigger={trigger} options={options} pointing='top left' icon={null} />
)

export default DropdownImage