import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './LoginSignup/login';
import Signup from './LoginSignup/signup';
import UserConsole from './console/user/user.console';
import Pharmacy from './sections/pharmacy/pharmacy';
import PharmacyCart from './sections/pharmacy/cart.pharmacy';
import Beds from './sections/Beds/beds';
import Facilities from './sections/ServicesFacilities/facility';
import Admin from './console/admin/admin.console';
import Nav from './nav';

export default class RoutePage extends React.Component {
    render(){
        return (
            <div>
                <Router>
                    <Nav />
                    <Switch>
                        <Route path="/" exact component={App}/>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/user" component={UserConsole} />
                        <Route path="/admin" component={Admin} />
                        <Route path="/pharmacy" exact component={Pharmacy} />
                        <Route path="/pharmacy/cart" component={PharmacyCart} />
                        <Route path="/beds" exact component={Beds} />
                        <Route path="/services" exact component={Facilities} />
                    </Switch>
                </Router>
            </div>
        );
    }
}