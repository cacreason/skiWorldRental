//Inventory Table Component for Ski World Rental Management Platform
// 5/14/19

import React from 'react';
import { Table } from 'reactstrap';

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
    for(var y=minItems; y < returnedJSON.childItems.length; y++){
      if(y < maxItems){
        console.log(minItems, maxItems, currentPage);
        children = [];
        for(var x=0; x < 6; x++){
          if (x === 0){
            value = returnedJSON.childItems[y].description;
          }
          else if( x===1){
            value = returnedJSON.childItems[y].qty;
          }
          else if( x===2){
            value = returnedJSON.childItems[y].sku;
          }
          else if( x===3){
            value = returnedJSON.childItems[y].altSku;
          }
          else if( x===4){
            value = returnedJSON.price;
          }
          else if( x===5){
            value = returnedJSON.category;
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
              <th>Item</th>
              <th>Quantity</th>
              <th>SKU</th>
              <th>Alt SKU</th>
              <th>Price</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>{this.createTable(this.props.data, this.props.currentPage)}</tbody>
        </Table>

    )
  }
}
