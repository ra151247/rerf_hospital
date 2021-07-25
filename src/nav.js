import React from 'react';
import {Link } from 'react-router-dom';

export default class Nav extends React.Component {
    constructor(props){
        super(props);
    
        this.state ={
          username:'',
          role:'',
          pageroute: 'login'
        }
    
      }
    
      componentDidMount(){
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        if(user){
          this.setState({
            username: user.firstName,
            role: user.role,
            pageroute: user.role
          })
        }else{
          this.setState({
            username: "Login/Signup"
          })
        }
      }

    render(){
        let header = this.state.username;

        return (
            <div className = "App">
        <link rel="stylesheet" href="style.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet" />
            <nav>
            <a href="index.html"> </a>
            <div className="nav-links">
              <ul >
                <Link to="/">
                <li style={{color:'white'}}>OVERVIEW</li>
                </Link>
                <Link to="/pharmacy">
                <li style={{color:'white'}}>PHARMACY</li>
                </Link>
                <Link to="/beds">
                <li style={{color:'white'}}>DOCTORS</li>
                </Link>
                <Link to="/services">
                <li style={{color:'white'}}>SERVICES/FACILITIES</li>
                </Link>
                <Link to={{
                  pathname:`/${this.state.pageroute}`,
                  }} >
                <li style={{color:'white', float:'right'}}>{header}</li>
                </Link>
              </ul>
            </div>
          </nav>
          </div>
        );
    }
}