//Customer Table Component for Ski World Rental Management Platform
// 5/17/19

import React from 'react';
import { Container, Row, Col, Table, Button, ButtonGroup, Badge, Form, InputGroup, InputGroupAddon, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class InventoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 25
    };
  }

  createTable = (data, currentPage) => {
    //Fetch Inventory from database here.  A JSON Object Should be returned
    //which resembles the returnedJSON variable below.  This object will be used
    //to propagate the table and pagination.
    let returnedJSON = data;
    let table = [];
    let children = [];
    let key = 0;
    let value = "";
    let isFirstPage;
    if(currentPage >= 1){
      isFirstPage = 1;
    }
    else {
      isFirstPage = 0;
    }
    let minItems = this.state.itemsPerPage * (currentPage - isFirstPage);
    let maxItems = this.state.itemsPerPage * currentPage;
    for(var y=minItems; y < returnedJSON.length; y++){
      if(y < maxItems){
        console.log(minItems, maxItems, currentPage);
        children = [];
        for(var x=0; x < 6; x++){
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
            value = returnedJSON[y].cell;
          }
          else if( x===4){
            value = returnedJSON[y].birthdate;
          }
          else if( x===5){
            value = returnedJSON[y].email;
          }
          children.push(<td key={key.toString()}>{value}</td>);
          key++
        }
      table.push(<tr key={key.toString()}>{children}</tr>)
    }
    }
    console.log(this.props.currentPage);
    return table;
  }

  render() {
    return (
        <Table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Home #</th>
              <th>Cell #</th>
              <th>Birthdate</th>
              <th>E-Mail</th>
            </tr>
          </thead>
          <tbody>{this.createTable(this.props.data, this.props.currentPage)}</tbody>
        </Table>

    )
  }
}
