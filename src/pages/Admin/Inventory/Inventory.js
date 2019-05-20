//Admin Inventory Page for Ski World Rental Management Platform
// 5/7/19

import React from 'react';
import { Container, Row, Col, Table, Button, ButtonGroup, Badge, Form, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import AdminNav from '../../../components/AdminNav/AdminNav';
import InventoryTable from '../../../components/InventoryTable/InventoryTable';
import Pagination from '../../../components/Pagination/Pagination';
import './styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class AdminInventory extends React.Component {
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
    let returnedJSON = {
      "sysID": "123456789012", "brand": "Burton", "description": "LTR", "category": "Snowboard", "price": "20",
      "childItems": [
        {"color": "Blue", "size": "145", "soleLength": "NA", "qty": "5", "sku": "", "altSku": "", "description": "Burton LTR 145"},
        {"color": "Red", "size": "155", "soleLength": "NA", "qty": "6", "sku": "", "altSku": "", "description": "Burton LTR 155"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Blue", "size": "145", "soleLength": "NA", "qty": "5", "sku": "", "altSku": "", "description": "Burton LTR 145"},
        {"color": "Red", "size": "155", "soleLength": "NA", "qty": "6", "sku": "", "altSku": "", "description": "Burton LTR 155"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
        {"color": "Purple", "size": "155w", "soleLength": "NA", "qty": "7", "sku": "", "altSku": "", "description": "Burton LTR 155w"},
      ]
    }
    return returnedJSON;
  }

  render() {
    return (
      <div className="inventory" id="inventory">
      <AdminNav breadcrumb={<span className="mx-auto"><FontAwesomeIcon icon="boxes" size="sm"/> Inventory</span>} isOpen={this.isOpenCallback}/>
      <div id="adminContent" className={this.state.mainContentLMargin}>
      <Container fluid>
      <Row>
      <Col className="py-3">
      <Form>
        <InputGroup className="search">
          <InputGroupAddon addonType="prepend" className="input-group-text"><FontAwesomeIcon icon="search" size="1x" className="my-auto mx-1"/></InputGroupAddon>
          <Input placeholder="Item Description" size="30"/>
          <InputGroupAddon addonType="append">
          <Button outline color="primary" size="sm" className="px-2">Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
      </Col>
      <Col className="my-auto d-flex justify-content-end">
        <Link to="/">
          <Button outline color="success" size="" className="mx-1"><span className="mx-auto"><FontAwesomeIcon icon="plus" size="lg"/></span> New Item</Button>
        </Link>
      </Col>
      </Row>
      <Row>
      <Col className="d-flex justify-content-start">
        <Pagination updatePage={this.updateTable} currentPage={this.state.currentPage} totItems={this.state.data.childItems.length} itemsPerPage={this.state.itemsPerPage}/>
      </Col>
      <Col className="d-flex justify-content-end">
      <ButtonGroup size="sm">
        <Link to="/">
          <Button outline color="primary" size="sm" className="m-1"><span className="mx-auto"><FontAwesomeIcon icon="file-import" size="lg"/></span> Import Items</Button>
        </Link>
        <Link to="/">
          <Button outline color="primary" size="sm" className="m-1"><span className="mx-auto"><FontAwesomeIcon icon="print" size="lg"/></span> Print</Button>
        </Link>
      </ButtonGroup>
      </Col>
      </Row>
      <Row>
        <InventoryTable currentPage={this.state.currentPage} data={this.state.data}/>
      </Row>
      <Row>
        <Col className="d-flex justify-content-start">
          <Pagination updatePage={this.updateTable} currentPage={this.state.currentPage} totItems={this.state.data.childItems.length} itemsPerPage={this.state.itemsPerPage}/>
        </Col>
      </Row>
      </Container>
      </div>
      </div>
    )
  }
}