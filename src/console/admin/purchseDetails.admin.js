import React from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

export default class PurchaseDetailsAdmin extends React.Component{

    constructor(props){
        super(props);
        this.detailsList = this.detailsList.bind(this);
        this.state = {
            details: []
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/pharmacyBook/`)
        .then(res => {this.setState({
            details: res.data
        });
        console.log(res.data);
        });
    }


    detailsList(){
        return this.state.details.map(currentDetails => {
            return <Row details={currentDetails} key = {currentDetails._id} />
        })
    }

    render() {
        return (
            <div style={{padding: '2%'}}>
            <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>price/unit</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>total price</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
                {this.detailsList()}
          </Table>
          </div>
        );
    }
}

const Row = (props) => {
    return (
      <Table.Row>
        <Table.Cell>{props.details.name}</Table.Cell>
        <Table.Cell>{props.details.pricePerUnit}</Table.Cell>
        <Table.Cell>{props.details.quantity}</Table.Cell>
        <Table.Cell>{props.details.totalprice}</Table.Cell>
        <Table.Cell>{props.details.status}</Table.Cell>
      </Table.Row>
    );
}