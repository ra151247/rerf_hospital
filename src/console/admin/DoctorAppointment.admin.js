import React from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

export default class DocterApponitmentAdmin extends React.Component{

    constructor(props){
        super(props);
        this.detailsList = this.detailsList.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.statusArrpove = this.statusArrpove.bind(this);
        this.statusReject = this.statusReject.bind(this);

        this.state = {
            details: []
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/doctorBook/`)
        .then(res => {this.setState({
            details: res.data
        });
        console.log(res.data);
        });
    }

    updateStatus(status, id){
        if(status === 'pending'){
            return <StatusUpdate aid={id} approveStatus={this.statusArrpove} rejectStatus={this.statusReject}/>
        }else {
            return status;
        }
    }

    statusArrpove(id){
        console.log("inside approve " + id);
        const newStatus = {status: "approved"}
        axios.put('http://localhost:5000/doctorBook/update/status/'+ id, newStatus )
            .then(res => {
                console.log("status updated!");
                axios.get('http://localhost:5000/doctorBook/')
                    .then(res => this.setState({details: res.data}))
                    .catch(err => console.log("ERROR: " + err));
            })
            .catch(err => console.log("ERRROR:" + err));
    }

    statusReject(id){
        console.log("inside reject " + id);
        const newStatus = {status: "rejected"}
        axios.put('http://localhost:5000/doctorBook/update/status/'+ id, newStatus )
            .then(res => {
                console.log("status updated!");
                axios.get('http://localhost:5000/doctorBook/')
                    .then(res => this.setState({details: res.data}))
                    .catch(err => console.log("ERROR: " + err));
            })
            .catch(err => console.log("ERRROR:" + err));
    }


    detailsList(){
        return this.state.details.map(currentDetails => {
            return <Row details={currentDetails} statusUpdate={this.updateStatus(currentDetails.status, currentDetails._id)} key = {currentDetails._id} />
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
                <Table.HeaderCell>total price</Table.HeaderCell>
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

const StatusUpdate = (props) => {
    console.log(props);
    return (<div>
        <a herf="#" onClick={() => props.approveStatus(props.aid)}>Approve</a> | <a herf="#" onClick={() => props.rejectStatus(props.aid)}>Decline</a>
    </div>);
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
        <Table.Cell>{props.statusUpdate}</Table.Cell>
        <Table.Cell><a href="#" onClick={() => props.deleteAppointment(props.details._id)}>Delete</a></Table.Cell>
      </Table.Row>
    );
}