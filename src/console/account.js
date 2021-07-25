import React from 'react'
import {
  Button,
  Form,
  Input,
  Select,
} from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

export default class Account extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            value: ""
        }
    }

  handleChange = (e, { value }) => {
      this.setState({ value });
      console.log(e);
    }

  render() {
    const { value } = this.state
    return (
      <Form style={{paddingLeft: '20%', paddingRight: '20%', paddingTop: 50}} >
          <h1>Update Account</h1>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='First name'
            placeholder='First name'
          />
          <Form.Field
            control={Input}
            label='Last name'
            placeholder='Last name'
          />
          <Form.Field
            control={Select}
            label='Gender'
            options={options}
            placeholder='Gender'
          />
        </Form.Group>
        <Form.Group>
            <Form.Field
                control={Input}
                label="Age"
                type='number'
                placeholder="age"
            />
            <Form.Field
                control={Input}
                label="Phone Number"
                placeholder="phone Number"
            />
        </Form.Group>
        <Form.Group>
            <Form.Field
                control={Input}
                label="Email"
                placeholder="enter email"
            />
            <Form.Field
                control={Input}
                type='password'
                label="New Password"
                placeholder="password"
            />
        </Form.Group>
        <Form.Field
                control={Input}
                type='password'
                label="Current Password"
                placeholder="password"
            />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    )
  }
}