import React from 'react';
import {Label, Menu, Table, Form, Input } from 'semantic-ui-react'
import axios from 'axios';


export default class PharmacyCart extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            cart: [],
            grandTotal: 0,
            email: '',
        }
        this.cartList = this.cartList.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    componentDidMount(){
      if(localStorage.getItem("user")){
        const useremail  = JSON.parse(localStorage.getItem("user")).email;
        this.setState({email: useremail});
      }
  

        console.log(this.props.location.cart);
        const cart = this.props.location.cart;
        axios.get('http://localhost:5000/pharmacy/')
          .then(res => {
            let temp = [];
            for(let i=0; i< cart.length; i++){
              temp.push(res.data.filter(el => el._id === cart[i])[0]);
            }
            console.log(temp)
            this.setState({
              cart: temp
            })
          })
          .catch(err => console.log("ERROR: " + err));

    }

    cartList(){
      return (this.state.cart.map(currentCart => {
        return <TableContent cartItem={currentCart} key={currentCart._id}/>
      }))
    }

    onSubmit(){
        if(this.state.email===''){
          window.location = "login";
        }else{
          console.log(this.state.cart);
          for(let i = 0; i< this.state.cart.length; i++){
            const newPurchase = {
              email: this.state.email,
              name: this.state.cart[i].name,
              pricePerUnit: this.state.cart[i].pricePerUnit,
              quantity: 1,
              totalprice: this.state.cart[i].pricePerUnit,
              status: "delivery pending"
            }
  
            axios.post('http://localhost:5000/pharmacyBook/add', newPurchase)
              .then(res => console.log(res.data))
              .catch(err => console.log("EROOR: " + err));
          }
          window.location = "/";
        }
       
    }

    onBack(){
      window.location = "/pharmacy";
    }
    

    render(){
      let grandTotal = 0;
      for(let i = 0; i< this.state.cart.length; i++){
        grandTotal += this.state.cart[i].pricePerUnit;
      }
        return(
            <div style={{padding:'2%'}}>
            <h1>Product Cart</h1>
            <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>price/unit</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>total price</Table.HeaderCell>

              </Table.Row>
            </Table.Header>
              {this.cartList()}
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='4'>
                <Label>
                Grand Total
                <Label.Detail>{grandTotal}</Label.Detail>
                </Label>
                  <Menu floated='right' pagination>
                    <Menu.Item as='a' onClick={this.onSubmit}>Check out</Menu.Item>
                    <Menu.Item as='a' onClick={this.onBack}>Go Back</Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
          </div>
        );
    }
}

const TableContent =(props) => {
  return (
  <Table.Body>
  <Table.Row>
    <Table.Cell>{props.cartItem.name}</Table.Cell>
    <Table.Cell>{props.cartItem.pricePerUnit}</Table.Cell>
    <Table.Cell>
      <Input
        type="number"
        value="1"
      />
    </Table.Cell>
    <Table.Cell>{Number(props.cartItem.pricePerUnit)}</Table.Cell>
  </Table.Row>
</Table.Body>
  );
}