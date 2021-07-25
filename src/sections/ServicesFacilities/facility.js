import React from 'react';
import { Card, Icon } from 'semantic-ui-react'
import BookFacility from './book.facility';
import axios from 'axios';


export default class Facilities extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            services: [],
            unit: 0
        }
    }

    componentDidMount(){
      axios.get('http://localhost:5000/services/')
        .then(res => {
          this.setState({
            services: res.data
          })
        })
    }
    
    serviceList(){
      return this.state.services.map(currentService =>{
        return <CardExampleCard service={currentService} />
      })
    }

    render(){
        return(
            <div style={{ padding:'3%'}}>
                <h1>Services We Offer</h1>
                <Card.Group itemsPerRow={8}>
                  {this.serviceList()}
                </Card.Group>
                <br/><br/>
                <h1>Book a Service</h1>
                <BookFacility/>
            </div>
        );
    }
}

const CardExampleCard = (props) => (
    <Card>
      <Card.Content>
        <Card.Header>{props.service.name}</Card.Header>
        <Card.Meta>
          <span className='date'>Price Per Unit: {props.service.pricePerUnit}</span>
        </Card.Meta>
        <Card.Description>
          Total Units: {props.service.totalUnits}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='bed' />
          {props.service.totalUnitsAvailable} available
        </a>
      </Card.Content>
    </Card>
  )