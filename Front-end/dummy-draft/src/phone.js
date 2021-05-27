import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {React, useState} from 'react'

function ReactPhone() {
const [value, setValue] = useState()
  return (
    <><PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}/>
      {value}
  </>)
}

export default ReactPhone;