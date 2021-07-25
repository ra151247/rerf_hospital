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

// const doctor = [
//     { key: 'a', text: 'Rahul Maheshwari', value: 'Rahul'},
//     { key: 's', text: 'Siddhi', value: 'siddhi'},
//     { key: 'c', text: 'Riddhi', value: 'riddhi'},
//     { key: 'v', text: 'Anirban', value: 'anirban'},
// ]

//const doctor =[];
// const bed = [
//     { key: 'a', text: 'Single', value: 'single'},
//     { key: 's', text: 'Dual', value: 'dual'},
//     { key: 'c', text: 'ICU', value: 'icu'},
//     { key: 'v', text: 'General', value: 'general'},
// ]

export default class BookBed extends Component {
  constructor(props){
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDoctor = this.onChangeDoctor.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email:'',
      patientName:'',
      age: 0,
      gender: '',
      doctor: '',
      department: '',
      note: '',
      status: 'pending',
      doctors:[]
    }
  }

  componentDidMount(){
    if(localStorage.getItem("user")){
      const useremail  = JSON.parse(localStorage.getItem("user")).email;
      this.setState({email: useremail});
    }

  }


  handleChange = (e, { value }) => {
    console.log(e);
    this.setState({ value });}

  onChangeName(e){
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
    console.log(e);
    this.setState({
      note: e.target.value
    })
  }

  onChangeDoctor(e){
      this.setState({
          doctor: e.target.innerText
      })
  }

  onSubmit(e){
    e.preventDefault();
    //console.log(e);
    if(this.state.email === ''){
      window.location = "/login";
    }else{
      const doctor = {
        email: this.state.email,
        patientName: this.state.patientName,
        age: this.state.age,
        gender: this.state.gender,
        doctor: this.state.doctor,
        department: this.state.department,
        note: this.state.note,
        status: this.state.status,
      }
      console.log(doctor);
      axios.post('http://localhost:5000/doctorBook/add', doctor)
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
          <Form.Input onChange={this.onChangeName} fluid label='Name' placeholder='Name' />
          <Form.Input onChange={this.onChangeAge} type="number" fluid label='Age' placeholder='Age' />
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
        </Form.Group>
        <Form.TextArea onChange={this.onChangeNote} label='Note:' placeholder='Tell us more about you...' />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}
