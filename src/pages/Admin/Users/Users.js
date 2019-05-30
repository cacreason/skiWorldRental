//Admin Customer Page for Ski World Rental Management Platform
// 5/17/19

import React from 'react';
import { Container, Row, Col, Button, ButtonGroup, Form, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import AdminNav from '../../../components/AdminNav/AdminNav';
import CustomerTable from '../../../components/CustomerTable/CustomerTable';
import Pagination from '../../../components/Pagination/Pagination';
import './styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class AdminUsers extends React.Component {
  constructor(props) {
    super(props);
    this.updateTable = this.updateTable.bind(this);
    this.fetchItemData = this.fetchItemData.bind(this);
    this.state = {
      mainContentLMargin: "adminContent",
      currentPage: 1,
      itemsPerPage: 25,
      totItems: 1,
      data: this.fetchItemData()
    };
  }
  isOpenCallback = (dataFromChild) => {
      if (dataFromChild){
        this.setState({mainContentLMargin: "adminContent"})
      }
      else if(!dataFromChild){
        this.setState({mainContentLMargin: " "})
      }
    }

  updateTable = (page) => {
    page = parseInt(page);
    this.setState({currentPage: page})
    console.log('page' + page);
  }
  fetchItemData(){
    let returnedJSON = [{
      "sysId":"123456789012", "fName": "John", "lName": "Doe", "type": "customer", "streetAdd":  "1234 Mona Ave", "aptNum": "",
      "city": "Norfolk", "state": "VA", "zipCode": "23518", "homePhone": "7575555555", "cell": "", "email": "john@johndoe.com",
      "altEmail": "", "birthdate": "04/12/1994", "activity":[
        {"items":{
          "ski": "Rossi EXP 160", "boot": "rossi 25.5", "poles": "54in", "insurance": "true"
        }, "dateOut": "02/15/2019", "dateIn:": "02/20/2019", "actDateIn": "02/20/2019", "weight": "180lb", "height": "5ft8in", "skierType": "2", "status": "returned", "skierCode": "K", "setting":"6.0", "tecnician":"Chris Creason"}
      ]
    },
    {
      "sysId":"123456789012", "fName": "John", "lName": "Doe", "type": "customer", "streetAdd":  "1234 Mona Ave", "aptNum": "",
      "city": "Norfolk", "state": "VA", "zipCode": "23518", "homePhone": "7575555555", "cell": "", "email": "john@johndoe.com",
      "altEmail": "", "birthdate": "04/12/1994", "activity":[
        {"items":{
          "ski": "Rossi EXP 160", "boot": "rossi 25.5", "poles": "54in", "insurance": "true"
        }, "dateOut": "02/15/2019", "dateIn:": "02/20/2019", "actDateIn": "02/20/2019", "weight": "180lb", "height": "5ft8in", "skierType": "2", "status": "returned", "skierCode": "K", "setting":"6.0", "tecnician":"Chris Creason"}
      ]
    },
    {
      "sysId":"123456789012", "fName": "John", "lName": "Doe", "type": "customer", "streetAdd":  "1234 Mona Ave", "aptNum": "",
      "city": "Norfolk", "state": "VA", "zipCode": "23518", "homePhone": "7575555555", "cell": "", "email": "john@johndoe.com",
      "altEmail": "", "birthdate": "04/12/1994", "activity":[
        {"items":{
          "ski": "Rossi EXP 160", "skiSerial":"SW1234", "boot": "rossi 25.5", "bootSerial":"SW2234", "poles": "54in", "poleSerial": "3234", "insurance": "true"
        }, "dateOut": "02/15/2019", "dateIn:": "02/20/2019", "actDateIn": "02/20/2019", "weight": "180lb", "height": "5ft8in", "skierType": "2", "status": "returned", "skierCode": "K", "setting":"6.0", "tecnician":"Chris Creason"}
      ]
    }];
    return returnedJSON;
  }

  render() {
    return (
      <div className="customers" id="customers">
      <AdminNav breadcrumb={<span className="mx-auto"><FontAwesomeIcon icon="skiing" size="sm"/> Users</span>} isOpen={this.isOpenCallback}/>
      <div id="adminContent" className={this.state.mainContentLMargin}>
      <Container fluid>
      <Row>
      <Col className="py-3">
      <Form>
        <InputGroup className="search">
          <InputGroupAddon addonType="prepend" className="input-group-text"><FontAwesomeIcon icon="search" size="1x" className="my-auto mx-1"/></InputGroupAddon>
          <Input placeholder="Customer Name" size="30"/>
          <InputGroupAddon addonType="append">
          <Button outline color="primary" size="sm" className="px-2">Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
      </Col>
      <Col className="my-auto d-flex justify-content-end">
        <Link to="/">
          <Button outline color="success" size="" className="mx-1"><span className="mx-auto"><FontAwesomeIcon icon="plus" size="lg"/></span> New Customer</Button>
        </Link>
      </Col>
      </Row>
      <Row>
      <Col className="d-flex justify-content-start">
        <Pagination updatePage={this.updateTable} currentPage={this.state.currentPage} totItems={this.state.data.length} itemsPerPage={this.state.itemsPerPage}/>
      </Col>
      <Col className="d-flex justify-content-end">
      <ButtonGroup size="sm">
        <Link to="/">
          <Button outline color="primary" size="sm" className="m-1"><span className="mx-auto"><FontAwesomeIcon icon="file-export" size="lg"/></span> Export</Button>
        </Link>
        <Link to="/">
          <Button outline color="primary" size="sm" className="m-1"><span className="mx-auto"><FontAwesomeIcon icon="print" size="lg"/></span> Print</Button>
        </Link>
      </ButtonGroup>
      </Col>
      </Row>
      <Row>
        <CustomerTable currentPage={this.state.currentPage} data={this.state.data}/>
      </Row>
      <Row>
        <Col className="d-flex justify-content-start">
          <Pagination updatePage={this.updateTable} currentPage={this.state.currentPage} totItems={this.state.data.length} itemsPerPage={this.state.itemsPerPage}/>
        </Col>
      </Row>
      </Container>
      </div>
      </div>
    )
  }
}
