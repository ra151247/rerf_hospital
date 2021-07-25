import React from 'react';
import '../../console/console.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PurchaseDetailsUser from './PurchaseDetails.user';
import Account from '../account';
import DocterAppointment from './docterappointment.user';
import FacilityUsed from './facility.user';
//import axios from 'axios';

export default class UserConsole extends React.Component{
    render(){
        return (
            <div>
                <Router>
                    <Nav/>
                    <Switch>
                        <Route path="/user/details" component={PurchaseDetailsUser}/>
                        <Route path="/user/account" component={Account} />
                        <Route path="/user/DocterAppointments" component={DocterAppointment} />
                        <Route path="/user/servicesUsed" component={FacilityUsed} />
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
        window.location = "/";
    }

    render(){
    return(
        <nav>
        <ul className="navv">
            <Link to={{
                pathname:"/user/details",
                data: "registration"
                }}>
                <li>Pharmacy Purchase</li>
            </Link>
            <Link to="/user/DocterAppointments">
                <li>Doctor Booking</li>
            </Link>
            <Link to="/user/servicesUsed">
                <li>Services Used</li>
            </Link>
            <li onClick={this.onLogout} style={{float: 'right'}}>Logout</li>
            <Link to="/user/account">
                <li style={{float: 'right'}}>Account</li>
            </Link>
            
            
        </ul>
    </nav>
    );
    }
}