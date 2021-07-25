import axios from 'axios';
import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
//import {Link} from 'react-router-dom';
import BookBed from './book.bed';
import Faker from 'faker';


export default class Beds extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            doctor: [],
            unit: 0
        }

        this.doctorsList = this.doctorsList.bind(this);

    }

    componentDidMount(){
      axios.get('http://localhost:5000/doctors/')
        .then(res => this.setState({
            doctor: res.data
        }))
    }
    
    doctorsList(){
      return this.state.doctor.map(currentDoctor => {
        return <CardExampleCard doctor={currentDoctor} key={currentDoctor._id} image={Faker.image.avatar()}/>
      })
    }

    render(){
        return(
            <div style={{ padding:'3%'}}>
                <h1>Information about Doctors</h1>
                <Card.Group itemsPerRow={8}>
                  {this.doctorsList()}
                </Card.Group>
                <br/><br/>
                <h1>Book an Appointment</h1>
                <BookBed/>
                
            </div>
        );
    }
}

const CardExampleCard = (props) => (
    <Card>
      <Image src={props.image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.doctor.name}</Card.Header>
        <Card.Meta>
          <span className='date' style={{fontWeight:'bold'}}>{props.doctor.experience} years of experience</span>
        </Card.Meta>
        <Card.Description>
          <b>Available Timing:</b> {props.doctor.availableTiming}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='bed' />
          {props.doctor.speciality}
        </a>
      </Card.Content>
    </Card>
  )
  