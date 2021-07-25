import axios from 'axios';
import React from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  Checkbox,
} from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

export default class Signup extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            //value: "",
            firstName: '',
            lastName: '',
            gender: '',
            age: 0,
            phoneNo: 0,
            email: '',
            password: '',
            role: 'user'
        }

        this.handleChange = this.handleChange.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
    }

    handleChange = (e, { value }) => {
      this.setState({ value });
      console.log(e);
    }

    onChangeFirstName(e){
      this.setState({
        firstName: e.target.value
      })
    }

    onChangeLastName(e){
      this.setState({
        lastName: e.target.value
      })
    }

    onChangeGender(e){
      //console.log(e)
      this.setState({
        gender: e.target.innerText
      })
    }

    onChangeAge(e){
      ///console.log(e)
      this.setState({
        age: e.target.value
      })
    }

    onChangePhoneNo(e){
      //console.log(e)
      this.setState({
        phoneNo: e.target.value
      })
    }

    onChangeEmail(e){
      this.setState({
        email: e.target.value
      })
    }

    onChangePassword(e){
      this.setState({
        password: e.target.value
      })
    }

    onSubmit(){
      let usersemail = false;
      axios.get('http://localhost:5000/users/')
        .then(res => {
          for(let i  =0; i<res.data.length; i++){
            if(res.data[i].email === this.state.email){
              usersemail = true;
            }
          }
          if(usersemail){
            alert("Email already exist");
          }else{
            console.log(this.state);
            const newUser = this.state
            axios.post('http://localhost:5000/users/add', newUser)
              .then(res => {console.log("useradded");
                    window.location = "/login";
              })
              .catch(err => console.log("ERROR: " + err));
          }
        })
        .catch(err => console.log("ERROR: " + err));


    }

  render() {
    const { value } = this.state
    return (
      <Form onSubmit={this.onSubmit} style={{paddingLeft: '20%', paddingRight: '20%', paddingTop: 50}} >
          <h1>Create an Account</h1>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            onChange={this.onChangeFirstName}
            label='First name'
            placeholder='First name'
          />
          <Form.Field
            control={Input}
            onChange={this.onChangeLastName}
            label='Last name'
            placeholder='Last name'
          />
          <Form.Field
            control={Select}
            onChange={this.onChangeGender}
            label='Gender'
            options={options}
            placeholder='Gender'
          />
        </Form.Group>
        <Form.Group>
            <Form.Field
                control={Input}
                onChange={this.onChangeAge}
                type="number"
                label="Age"
                placeholder="age"
            />
            <Form.Field
                control={Input}
                onChange={this.onChangePhoneNo}
                label="Phone Number"
                placeholder="phone Number"
            />
        </Form.Group>
        <Form.Group>
            <Form.Field
                control={Input}
                onChange={this.onChangeEmail}
                label="Email"
                placeholder="enter email"
            />
            <Form.Field
                control={Input}
                onChange={this.onChangePassword}
                type='password'
                label="Password"
                placeholder="password"
            />
        </Form.Group>
        <Form.Field
          control={Checkbox}
          label='I agree to the Terms and Conditions'
        />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    )
  }
}