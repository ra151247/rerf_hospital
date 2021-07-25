import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
//import Faker from 'faker';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Pharmacy extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      pharmacy: [],
      cart: []
    }
    this.addToCart = this.addToCart.bind(this);
    this.pharmacyList = this.pharmacyList.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:5000/pharmacy/')
      .then(res => {
        console.log(res.data);
        this.setState({
          pharmacy: res.data
        })
      })
  }

  addToCart(item){
    console.log(item);
    this.setState((previousState) => {
      const newCart = JSON.parse(JSON.stringify(previousState.cart));
      newCart.push(item);
      return {
        ...previousState,
        cart: newCart
      }
    })
  }

  pharmacyList(){
    return this.state.pharmacy.map(currentPharmacy => {
      return < CardExampleImageCard pharmacy={currentPharmacy}  addtoCart={this.addToCart}/>
    })
  }
  
  render() {
    console.log(this.state.cart);
    return (
      <div style={{padding:'2%'}}>
        <h1>Buy Medicne</h1>
        <p> at really cheap price</p>
        <Link to={{
          pathname:"/pharmacy/cart",
          cart: this.state.cart
          }}>
        <Button icon labelPosition='left'>
          <Icon name='cart' />
          View items in the cart
        </Button>
        </Link>
        <Card.Group itemsPerRow={6}>
          {this.pharmacyList()}
        </Card.Group>
      </div>
    );
  }
}


class CardExampleImageCard extends React.Component {
  constructor(props){
    super(props);
    this.state ={

    }
  }



  componentWillUnmount(){
    localStorage.setItem("cart", JSON.stringify(this.state.cart))
  }

  render(){
    return (
      <Card>
      <Card.Content>
        <Card.Header>{this.props.pharmacy.name}</Card.Header>
        <Card.Meta>Price per unit: <br/>{this.props.pharmacy.pricePerUnit} INR</Card.Meta>
        <Card.Description>
          Mfg Date:{this.props.pharmacy.mfgDate} <br/> Exp Date: {this.props.pharmacy.expDate}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Button onClick={()=> this.props.addtoCart(this.props.pharmacy._id)}>
          <Icon name='cart' />
          Add to cart
          </Button>
      </Card.Content>
    </Card>
    );
  }
}

