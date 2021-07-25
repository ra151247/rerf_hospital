import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import axios from 'axios';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const department = [
  { key: 'e', text: 'cardiologist', value: 'cardiologist' },
  { key: 'l', text: 'dentist', value: 'dentist' },
  { key: 'h', text: 'dermatologist', value: 'dermatologist' },
]


const bed = [
    { key: 'a', text: 'Single', value: 'single'},
    { key: 's', text: 'Dual', value: 'dual'},
    { key: 'c', text: 'ICU', value: 'icu'},
    { key: 'v', text: 'General', value: 'general'},
]

export default class BookFacility extends Component {
  constructor(props){
    super(props);

    this.onChangePatientName = this.onChangePatientName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeService = this.onChangeService.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDoctor = this.onChangeDoctor.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      patientName: '',
      gender: '',
      age: '',
      doctor: '',
      department: '',
      service: '',
      note: '',
      status: 'pending',
      //price: 0,      
      services: [],
      doctors: [],
    }
  }
  
  componentDidMount(){
    if(localStorage.getItem("user")){
      const useremail  = JSON.parse(localStorage.getItem("user")).email;
      this.setState({email: useremail});
    }


    axios.get('http://localhost:5000/services/')
      .then(res => {
        const service = [];
        for(let i = 0; i< res.data.length; i++){
          const ser = {key: res.data[i]._id, text: res.data[i].name, value: res.data[i].name}
          service.push(ser)
        }
        this.setState({services: service})
      })
      .catch(err => console.log("ERROR: " + err));
  }

  handleChange = (e, { value }) => {
    console.log(e);
    this.setState({ value });}

  onChangePatientName(e){
    this.setState({
      patientName: e.target.value
    })
  }

  onChangeAge(e){
    this.setState({
      age: e.target.value
    })
  }

  onChangeGender(e){
    console.log(e);
    this.setState({
      gender: e.target.innerText
    })
  }

  onChangeDepartment(e){
    this.setState({
      department: e.target.innerText
    })
    const x = e.target.innerText;
    console.log(x);
    
    axios.get('http://localhost:5000/doctors/')
      .then(res => {
        let doc = [];
        console.log(res.data);
        for(let i = 0; i<res.data.length; i++){
          if(res.data[i].speciality === x){
            let newdoc = {key: res.data[i]._id, text: res.data[i].name, value: res.data[i].name};
            console.log(newdoc);
            doc.push(newdoc);
          }
        };
        this.setState({doctors: doc});
      })
      .catch(err => console.log("ERROR: " + err));


  }

  onChangeNote(e){
    this.setState({
      note: e.target.value
    })
  }

  onChangeDoctor(e){
      this.setState({
          doctor: e.target.innerText
      })
  }

  onChangeService(e){
    console.log(e);
    //const pri = this.state.service
    this.setState({
      service: e.target.innerText
    })
  }

  onSubmit(e){
    e.preventDefault();
    //console.log(e);
    if(this.state.email===''){
      window.location ="/";
    }else{
      const stock = {
        email: this.state.email,
        patientName: this.state.patientName,
        age: this.state.age,
        gender: this.state.gender,
        doctor: this.state.doctor,
        department: this.state.department,
        service: this.state.service,
        status: this.state.status,
        note: this.state.note,
        //price: this.state.price
      }
      console.log(stock);
      axios.post('http://localhost:5000/serviceBook/add', stock)
        .then(res=> {
          console.log(res.data);
          console.log("Booked!");
          window.location = "/";
        })
        .catch(err => console.log("ERROR: " + err));
    }
    

  }

  render() {
    //const { value } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group widths='equal'>
          <Form.Input onChange={this.onChangePatientName} fluid label='Patient name' placeholder='Patient name' />
          <Form.Input onChange={this.onChangeAge} fluid type="number" label='Age' placeholder='Age' />
          <Form.Select
            onChange={this.onChangeGender}
            fluid
            label='Gender'
            options={options}
            placeholder='Gender'
          />
        </Form.Group>
        <Form.Group inline>
          <Form.Select
            onChange={this.onChangeDepartment}
            fluid
            label='Department'
            options={department}
            placeholder='Department'
          />
            <Form.Select
            onChange={this.onChangeDoctor}
            fluid
            label='Doctor'
            options={this.state.doctors}
            placeholder='Doctor'
          />
            <Form.Select
            onChange={this.onChangeService}
            fluid
            label='Service'
            options={this.state.services}
            placeholder='Service'
          />
        </Form.Group>
        <Form.TextArea onChange={this.onChangeNote} label='Note:' placeholder='Tell us more about you...' />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}
