//Customer Table Component for Ski World Rental Management Platform
// 5/17/19

import React from 'react';
import { Container, Row, Col, Table, Button, ButtonGroup, Badge, Form, InputGroup, InputGroupAddon, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class ReturnSetupTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  createTable = (data) => {
    //Fetch Inventory from database here.  A JSON Object Should be returned
    //which resembles the returnedJSON variable below.  This object will be used
    //to propagate the table and pagination.
    let returnedJSON = data;
    let table = [];
    let children = [];
    let key = 0;
    let value = "";
    for(var y=0; y < returnedJSON.length; y++){
        children = [];
        for(var x=0; x < 4; x++){
          if (x === 0){
            value = returnedJSON[y].fName;
          }
          else if( x===1){
            value = returnedJSON[y].lName;
          }
          else if( x===2){
            value = returnedJSON[y].homePhone;
          }
          else if( x===3){
            value = returnedJSON[y].activity[0].items.type;
          }
          children.push(<td key={key.toString()}>{value}</td>);
          key++
      table.push(<tr key={key.toString()}>{children}</tr>)
    }
    }
    console.log(this.props.currentPage);
    return table;
  }

  render() {
    return (
        <Table striped bordered>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Home #</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>{this.createTable(this.props.data)}</tbody>
        </Table>

    )
  }
}
