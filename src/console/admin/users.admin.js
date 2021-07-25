import React from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

export default class Users extends React.Component{

    constructor(props){
        super(props);
        this.usersList = this.usersList.bind(this);
        this.userDelete = this.userDelete.bind(this);
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/')
        .then(res => {this.setState({
            users: res.data
        });
        console.log(res.data);
        });
    }


    usersList(){
        return this.state.users.map(currentDetails => {
            return <Row users={currentDetails} deleteUser={this.userDelete} key = {currentDetails._id} />
        })
    }

    userDelete(id){
        axios.delete('http://localhost:5000/users/'+ id)
            .then(res => console.log("User deleted" + id))
            .catch(err => console.log("ERROR: "+ err));
        
        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    render() {
        return (
            <div style={{padding: '2%'}}>
            <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>User's Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Phone Number</Table.HeaderCell>
                <Table.HeaderCell>Gender</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.HeaderCell>Role</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
                {this.usersList()}
          </Table>
          </div>
        );
    }
}

const Row = (props) => {
    return (
        <Table.Row>
        <Table.Cell>{props.users.firstName} {props.users.lastName}</Table.Cell>
        <Table.Cell>{props.users.email}</Table.Cell>
        <Table.Cell>{props.users.phoneNo}</Table.Cell>
        <Table.Cell>{props.users.gender}</Table.Cell>
        <Table.Cell>{props.users.age}</Table.Cell>
        <Table.Cell>{props.users.role}</Table.Cell>
        <Table.Cell><a href="#" onClick={() => props.deleteUser(props.users._id)}>Delete</a></Table.Cell>
      </Table.Row>
    );
}