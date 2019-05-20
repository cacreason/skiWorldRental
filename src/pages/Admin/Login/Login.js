//Admin Login Page for Ski World Rental Management Platform
// 5/2/19

import React from 'react';
import { Container, Card, CardHeader, CardFooter, CardBody, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import SWLogo from '../../../images/swLogo.png';
import './styles.css';

export default class ALogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit(event) {
    var formData = {
      username: this.state.email,
      password: this.state.password
    }
    event.preventDefault();
    this.callApi(formData)
    .then(res => this.setState({ response: res.express }))
    .catch(err => console.log(err));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  callApi = async (data) => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
      body: JSON.stringify(data)
    });
    console.log(data);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="about" id="about">
      <Container fluid>
      <Col xs={{size: 10, offset: 1}} sm={{size: 6, offset: 3}} lg={{size: 4, offset: 4}} >
      <div className="my-5">
      <Card className="text-left">
        <CardHeader>Ski World Rental Admin</CardHeader>
        <CardBody>
          <img className="img-fluid w-75 mx-auto d-block" src={SWLogo} alt="Ski World Logo"/>
          <Form method="post" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required/>
          </FormGroup>
          <Link to='/admin'><Button className="w-100" color="success">Submit</Button></Link>
          </Form>
        </CardBody>
        <CardFooter>Not an Employee? <Link to="/">Customer Login</Link></CardFooter>
      </Card>
      </div>
      </Col>
      </Container>
      </div>
    )
  }
}
