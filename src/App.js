import React from 'react';
import './App.css';
import './homepage.css';
import {Link} from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react'

//import Pharmacy from './sections/pharmacy/pharmacy';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      username:'',
      role:'',
      pageroute: 'login'
    }

  }

  componentDidMount(){
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if(user){
      this.setState({
        username: user.firstName,
        role: user.role,
        pageroute: user.role
      })
    }else{
      this.setState({
        username: "Login/Signup"
      })
    }
  } 



  

  render(){
    let header = this.state.username;
        return (
        <div className="App">
        <title>Website Project</title>
        <link rel="stylesheet" href="style.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet" />
        <section className="header"> 

          </section>
          <section className="appbody" style={{
            width:'80%',
            margin: 'auto',
            textAlign: 'center',
            paddingTop: '20px'}}>
            <h1>About Us</h1>
            <p>We are a group of students of Regent Education & Research Foundation of Batch 2021,
              who manages a chain of private hospitals and helps patients find relevant doctors and information
              about bed availability at the earliest and in a convenient way. </p>
            <CardExampleExtraContent  style={{
            width:'80%',
            margin: 'auto',}}/>
          </section>

        </div>
      );
    }
}

const description = [
  'Facing a serious health issue?  Unable to move out but need to seek a doctor? No worries, just click, book your appointment and we will provide you the best doctor at the earliest. ',
  'The hospital provides world class emergency services and at the top most speed. We care about our patients more than anything.'
];

const CardExampleExtraContent = () => (
  <Card.Group itemsPerRow={2}>
  <Card class="card">
    <Card.Content header='Book a Doctor' />
    <Card.Content description={description[0]} />
    <Card.Content extra href="/beds">
      <Icon name='doctor' /> click to book
    </Card.Content>
  </Card>

  <Card class="card">
    <Card.Content header='Emergency Services' />
    <Card.Content description={description[1]} />
    <Card.Content extra href="/services">
      <Icon name='emergency' /> click to view
    </Card.Content>
  </Card>
  </Card.Group>
)