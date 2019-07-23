//Admin Update Item Page for Ski World Rental Management Platform
// 7/23/19
//Post request is submitted to admin/updateItem and upon receipt parent/child item documents are updated.
import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Spinner, Table } from 'reactstrap';
import axios from 'axios';
import AdminNav from '../../../components/AdminNav/AdminNav';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleArrayChange = this.handleArrayChange.bind(this);
    this.state = {
      mainContentLMargin: "adminContent",
      isValid: Boolean,
      isLoading: false,
      response: "",
      formData: {
        parentId: this.props.location.state.returnedJSON,
        description: "",
        category: "Ski",
        price: "",
        brand: "",
        matrix: [{
          color: "",
          size: "",
          sku: "",
          altSku: "",
          qty: ""
        }]
      }
    };
  }

  handleInputChange(e){
    let formData = this.state.formData;
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    formData[name] = value;
    this.setState({
      formData: formData
    });
  }

//handleArrayChange accepts event, array, and index of array as params.
//Creates additional input field if last input field is used and deletes
//array element if text in input field is cleared.
  handleArrayChange(event, arrayName, index){
    let newArray = this.state.formData.matrix;
    let formData = this.state.formData;
    newArray[index][arrayName]=event.target.value;
    if(newArray[newArray.length-1].color !== "" || newArray[newArray.length-1].size !== ""){
      newArray.push({color:"", size:""});
    }
    else if(newArray[index].color === "" && newArray[index].size === ""){
      newArray.splice(index, 1);
    }
    formData.matrix = newArray;
    this.setState({
      formData: formData
    });
    console.log(formData);
  }
  validateUserInput(input){
    let formData = input;
    let str = "";
    const regex = /[^a-z0-9/-:|', .]/gi;//Match when string value is NOT of the following values a-z 0-9 / - : | ' , .
    const keys = Object.keys(input);//Create array of object keys. [description, category, price, brand, color, size]
    const values = Object.values(input);//Create array of object values. ex. [Burton Cruzer, Snowboard, 31.95, Burton, Red, 155]
    let isSpecChar = false;
    for(let i = 0; i < keys.length; i++){
      str = values[i];
      //If object key is equal to 'matrix' then validate matrix array(color or size must not match regex) and delete trailing empty object.
      if(keys[i] === "matrix"){
        let newArray = formData[keys[i]];
        for (var j=0; j<newArray.length; j++){
          if (newArray[j].color.match(regex) || newArray[j].size.match(regex)){
            this.setState({isValid: false, response: "Item information cannot contain special characters."});
            isSpecChar = true;
            break;
          }
          if (newArray[j].color === "" && newArray[j].size === ""){
            newArray.splice(j,1);
          }
        }
        formData[keys[i]] = newArray;
        if (isSpecChar === true ){break;}
      }
      else if (str.match(regex)){
        this.setState({isValid:false, response: "Item information cannot contain special characters."});
        break;
      }
      else if (!str.match(regex)){
        this.setState({isValid:true});
      }
    }
    return formData;
  }

//Call input validator that converts object to array.  If user input fields contain special characters, set isValid to false and display message to user.
  async handleSubmit(event) {
    event.preventDefault();
    const cloneData = JSON.parse(JSON.stringify(this.state.formData));  //Create deep copy of formData as to not mutate state on submit when empty array element is removed.
    const formData = await this.validateUserInput(cloneData);
    console.log(formData);
    if ((this.state.isValid === true) && formData.description !== "" && formData.category !== "" && formData.price !== "" && formData.brand !== ""){
      if(formData.matrix[0].color !== "" || formData.matrix[0].size !== ""){
        this.callApi(formData);
        this.setState({isLoading: true});
      }
      else{
        this.setState({isValid: false, response: "Error - Please Provide Item Color or Size"});
      }
    }
  }

  callApi = async (data) => {
    axios.post("/admin/inventory/updateitem", data, {
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response);
      if (response.status === 200){
        this.setState({isValid: true, isLoading: false, response: "Success - Item Created"})
        this.props.history.push("/admin/inventory/?search=" + encodeURIComponent(this.state.formData.description));
      }
    })
    .catch((error) => {
      if (error.response.status === 409){
        this.setState({isLoading: false, isValid: false, response: "System Error - Item Description Already Exists"});
      }
      else{
        console.log(error);
        this.setState({isLoading: false, isValid: false, response: "System Error - Item not created"});
      }
    });
    console.log(data);
  }

  isOpenCallback = (dataFromChild) => {
      if (dataFromChild){
        this.setState({mainContentLMargin: "adminContent"})
      }
      else if(!dataFromChild){
        this.setState({mainContentLMargin: " "})
      }
    }

  fetchItemData = (query) => {
    axios.post("/admin/inventory/getitems", JSON.stringify({parent:query}), {
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.data.length);
      let formData = JSON.parse(JSON.stringify(this.state.formData));
      console.log(response);
      for(let i = 0; i < response.data.length; i++){
        console.log(i);
        if(i === 0){
          let str = response.data[i].description;
          let match = response.data[i].color + " " + response.data[i].size;
          let filteredStr = str.replace(match, "");
          formData.description = filteredStr;
          formData.category = response.data[i].category;
          formData.price = response.data[i].price;
          formData.brand = response.data[i].brand?response.data[i].brand:"";  //NEED TO STORE BRAND ON CHILD SCHEMA
          formData.matrix = [];
        }
        formData.matrix.push({
          color: response.data[i].color,
          size: response.data[i].size,
          sku: response.data[i].sku,
          altSku: response.data[i].altSku?response.data[i].altSku:"",
          qty: response.data[i].qty
        });
      }
      this.setState({formData: formData});
    })
    .catch((error) => {
      if (error){
        this.setState({isLoading: false, isValid: false, response: "System Error - Item Description Already Exists"});
      }
      else{
        console.log(error);
        this.setState({isLoading: false, isValid: false, response: "System Error - Item not created"});
      }
    });
  }

  componentDidMount(){
    this.fetchItemData(this.state.formData.parentId);
  }
  render() {
    return (
      <div className="newItem" id="newItem">
      <AdminNav breadcrumb={<span className="mx-auto"><FontAwesomeIcon icon="boxes" size="sm"/> Inventory / Update Item</span>} isOpen={this.isOpenCallback}/>
      <div id="adminContent" className={this.state.mainContentLMargin}>
      <Container fluid>
      <Form className="text-left" onSubmit={e=>this.handleSubmit(e)}>
      <div className="d-flex">
        <Button className="d-flex" color="primary">Update Item Matrix</Button>
        {this.state.isLoading ? <Spinner type="grow" color="dark" /> : ""}
        {this.state.isValid ? <p className='text-success mx-3 my-auto'>{this.state.response}</p> : <p className='text-danger mx-3 my-auto'>{this.state.response}</p>}
      </div><hr/>
      <h4>Parent Item Information:</h4>
        <FormGroup row className="my-2">
          <Label for="description" sm={2}>Description</Label>
          <Col sm={10}>
            <Input type="text" required name="description" value={this.state.formData.description} onChange={this.handleInputChange} id="description" placeholder="Item Description" />
          </Col>
        </FormGroup>
        <FormGroup row className="my-2">
          <Label for="category" sm={2}>Category</Label>
          <Col sm={10}>
            <Input type="select" required name="category" value={this.state.formData.category} onChange={this.handleInputChange} id="category">
              <option value="Ski">Ski</option>
              <option value="Ski Boot">Ski Boot</option>
              <option value="Snowboard">Snowboard</option>
              <option value="Snowboard Boot">Snowboard Boot</option>
              <option value="Ski Pole">Ski Pole</option>
            </Input>
          </Col>
        </FormGroup>
        <Row>
        <Col sm={6}>
          <FormGroup row className="my-2">
            <Label for="price" sm={3}>Price</Label>
            <Col sm={9}>
              <Input type="text" required name="price" value={this.state.formData.price} onChange={this.handleInputChange} id="price" placeholder="$36.95"/>
            </Col>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup row className="my-2">
            <Label for="brand" sm={3}>Brand</Label>
            <Col sm={9}>
              <Input type="text" required name="brand" value={this.state.formData.brand} onChange={this.handleInputChange} id="brand" placeholder="Brand"/>
            </Col>
          </FormGroup>
        </Col>
        </Row> <hr/>
        <h4>Item Matrix Information:</h4>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Color</th>
              <th>Size</th>
              <th>Sku</th>
              <th>Alt Sku</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {(this.state.formData.matrix || []).map((item, index) => (
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                  <Input key={"color" + index} bsSize="sm" value={this.state.formData.matrix[index].color} name={"color" + index} onChange={(event)=>{this.handleArrayChange(event, "color", index)}} placeholder="Color"/>
                </td>
                <td>
                  <Input key={"size" + index} bsSize="sm" value={this.state.formData.matrix[index].size} name={"size" + index} onChange={(event)=>{this.handleArrayChange(event, "size", index)}} placeholder="Size"/>
                </td>
                <td><Input key={"color" + index} bsSize="sm" value={this.state.formData.matrix[index].sku} name={"sku" + index} onChange={(event)=>{this.handleArrayChange(event, "sku", index)}} placeholder="Sku"/></td>
                <td><Input key={"color" + index} bsSize="sm" value={this.state.formData.matrix[index].altSku} name={"altSku" + index} onChange={(event)=>{this.handleArrayChange(event, "altSku", index)}} placeholder="Alt Sku"/></td>
                <td><Input key={"color" + index} bsSize="sm" value={this.state.formData.matrix[index].qty} name={"qty" + index} onChange={(event)=>{this.handleArrayChange(event, "qty", index)}} placeholder="Qty"/></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Form>
      </Container>
      </div>
      </div>
    )
  }
}
