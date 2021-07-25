import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import axios from 'axios';


export default class Login extends Component {
    constructor(props){
        super(props);

        this.state ={
            email: '',
            password: ''
        }
        console.log(props);

        this.handleChange = this.handleChange.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

  handleChange = (e, { value }) => this.setState({ value })

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

  onFormSubmit(e){
    e.preventDefault();
    axios.get('http://localhost:5000/users')
        .then(res => {
            //console.log(res.data);
            for(let i = 0; i < res.data.length; i++){
                if((this.state.email === res.data[i].email) && (this.state.password === res.data[i].password)){
                    //this.props.location.name([res.data[i].name, res.data[i].role]);
                    localStorage.setItem("user", JSON.stringify(res.data[i]));
                    window.location = "/";
                    return;
                }
            }
            alert("Email or password is wrong");
        })
  }

  render() {
    const { value } = this.state
    return (
      <Form onSubmit={this.onFormSubmit} style={{paddingLeft:'30%', paddingRight:'30%', paddingTop:'6%'}}>
          <h1>Login Page</h1>
          <Form.Input fluid label='Email' onChange={this.onChangeEmail} type="email"placeholder='Enter Email' />
          <Form.Input fluid label='Password' onChange={this.onChangePassword} type="password" placeholder='Enter Password' />
        <Form.Button>Submit</Form.Button>
        <Link to="/signup">
            <h3>Create an account</h3>
        </Link>
      </Form>
    )
  }
}