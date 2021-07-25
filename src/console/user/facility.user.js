import React from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

export default class FacilityUsed extends React.Component{

    constructor(props){
        super(props);
        this.detailsList = this.detailsList.bind(this);
        this.state = {
            details: []
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/serviceBook/`)
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
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Patient Name</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.HeaderCell>Gender</Table.HeaderCell>
                <Table.HeaderCell>Docter</Table.HeaderCell>
                <Table.HeaderCell>Department</Table.HeaderCell>
                <Table.HeaderCell>Service</Table.HeaderCell>
                <Table.HeaderCell>Note</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
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
        <Table.Cell>{props.details.updatedAt}</Table.Cell>
        <Table.Cell>{props.details.patientName}</Table.Cell>
        <Table.Cell>{props.details.age}</Table.Cell>
        <Table.Cell>{props.details.gender}</Table.Cell>
        <Table.Cell>{props.details.doctor}</Table.Cell>
        <Table.Cell>{props.details.department}</Table.Cell>
        <Table.Cell>{props.details.service}</Table.Cell>
        <Table.Cell>{props.details.note}</Table.Cell>
        <Table.Cell>{props.details.status}</Table.Cell>
        <Table.Cell>Delete</Table.Cell>
      </Table.Row>
    );
}