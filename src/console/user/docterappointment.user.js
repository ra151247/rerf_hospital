import React from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

export default class DocterApponitment extends React.Component{

    constructor(props){
        super(props);
        this.detailsList = this.detailsList.bind(this);
        this.deleteAppointment = this.deleteAppointment.bind(this);

        this.state = {
            details: []
        }
    }

    componentDidMount(){
        const useremail = JSON.parse(localStorage.getItem("user")).email;
        axios.get(`http://localhost:5000/doctorBook/`)
        .then(res => {
            
            this.setState({details: res.data.filter(el => el.email == useremail)});
        console.log(res.data);
        });
    }


    detailsList(){
        return this.state.details.map(currentDetails => {
            return <Row details={currentDetails} deleteAppointment={this.deleteAppointment} key = {currentDetails._id}  />
        })
    }

    deleteAppointment(id){
        axios.delete('http://localhost:5000/doctorBook/'+id)
            .then(res => console.log("Appointment deleted" + id))
            .catch(err => console.log("EROOR: " + err));
        this.setState({
            details: this.state.details.filter(el => el._id !== id)
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
                <Table.HeaderCell>Note</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
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
        <Table.Cell>{props.details.note}</Table.Cell>
        <Table.Cell>{props.details.status}</Table.Cell>
        <Table.Cell><a href="#" onClick={() => props.deleteAppointment(props.details._id)}>Delete</a></Table.Cell>
      </Table.Row>
    );
}