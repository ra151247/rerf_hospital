import React from 'react';
import '../../console/console.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PurchaseDetailsAdmin from './purchseDetails.admin';
import Account from '../account';
import DocterApponitmentAdmin from './DoctorAppointment.admin';
import FacilityUsedAdmin from './facility.admin';
import Users from './users.admin';
//import axios from 'axios';

export default class Admin extends React.Component{
    render(){
        return (
            <div>
                <Router>
                    <Nav/>
                    <Switch>
                        <Route path="/admin/Details" component={PurchaseDetailsAdmin}/>
                        <Route path="/admin/account" component={Account} />
                        <Route path="/admin/DocterAppointments" component={DocterApponitmentAdmin} />
                        <Route path="/admin/servicesUsed" component={FacilityUsedAdmin} />
                        <Route path="/admin/users" component={Users} />
                    </Switch>          
                </Router>

            </div>
        );
    }
}

class Nav extends React.Component {
    constructor(props){
        super(props);
        //this.bedData = this.bedData.bind(this);
        this.state ={};
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(){
        localStorage.removeItem("user");
        window.location = "/"
    }
    render(){
    return(
        <nav>
        <ul className="navv">
            <Link to={{
                pathname:"/admin/Details",
                data: "registration"
                }}>
                <li>Pharmacy Purchase</li>
            </Link>
            <Link to="/admin/DocterAppointments">
                <li>Doctor Appointment</li>
            </Link>
            <Link to="/admin/servicesUsed">
                <li>Services Used</li>
            </Link>
            <Link to="/admin/users">
                <li>Users</li>
            </Link>

            <li onClick={this.onLogout}style={{float: 'right'}}>Logout</li>
            <Link to="/admin/account">
                <li style={{float: 'right'}}>Account</li>
            </Link>
            
        </ul>
    </nav>
    );
    }
}