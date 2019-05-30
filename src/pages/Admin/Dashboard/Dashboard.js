//Admin Dashboard Page for Ski World Rental Management Platform
// 5/2/19

import React from 'react';
import { Container, Row, Col, Table, Button, Badge } from 'reactstrap';
import AdminNav from '../../../components/AdminNav/AdminNav';
import './styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
var LineChart = require("react-chartjs").Line;



export default class ADashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainContentLMargin: "adminContent"
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
  chartData(){
    var data = {
    	labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    	datasets: [
    		{
    			label: "Setups",
    			fillColor: "rgba(70,190,189,0.2)",
    			strokeColor: "rgba(70,190,189,1)",
    			pointColor: "rgba(70,190,189,1)",
    			pointStrokeColor: "#fff",
    			pointHighlightFill: "#fff",
    			pointHighlightStroke: "rgba(220,220,220,1)",
    			data: [65, 59, 80, 81, 56, 55, 40]
    		},
    		{
    			label: "Returns",
    			fillColor: "rgba(253,180,92,0.2)",
    			strokeColor: "rgba(253,180,92,1)",
    			pointColor: "rgba(253,180,92,1)",
    			pointStrokeColor: "#fff",
    			pointHighlightFill: "#fff",
    			pointHighlightStroke: "rgba(151,187,205,1)",
    			data: [28, 48, 40, 19, 86, 27, 90]
    		},
        {
    			label: "Late Returns",
    			fillColor: "rgba(219,52,69,0.2)",
    			strokeColor: "rgba(219,52,69,1)",
    			pointColor: "rgba(219,52,69,1)",
    			pointStrokeColor: "#fff",
    			pointHighlightFill: "#fff",
    			pointHighlightStroke: "rgba(151,187,205,1)",
    			data: [6, 8, 1, 4, 0, 0, 3]
    		}
    	]
    };
    return data;
  }
  chartOptions(){
    var options = {

    	///Boolean - Whether grid lines are shown across the chart
    	scaleShowGridLines : true,

    	//String - Colour of the grid lines
    	scaleGridLineColor : "rgba(0,0,0,.05)",

    	//Number - Width of the grid lines
    	scaleGridLineWidth : 1,

    	//Boolean - Whether to show horizontal lines (except X axis)
    	scaleShowHorizontalLines: true,

    	//Boolean - Whether to show vertical lines (except Y axis)
    	scaleShowVerticalLines: true,

    	//Boolean - Whether the line is curved between points
    	bezierCurve : false,

    	//Number - Tension of the bezier curve between points
    	bezierCurveTension : 0.4,

    	//Boolean - Whether to show a dot for each point
    	pointDot : true,

    	//Number - Radius of each point dot in pixels
    	pointDotRadius : 4,

    	//Number - Pixel width of point dot stroke
    	pointDotStrokeWidth : 1,

    	//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    	pointHitDetectionRadius : 20,

    	//Boolean - Whether to show a stroke for datasets
    	datasetStroke : true,

    	//Number - Pixel width of dataset stroke
    	datasetStrokeWidth : 2,

    	//Boolean - Whether to fill the dataset with a colour
    	datasetFill : true,

    	//String - A legend template
    	legendTemplate : `"<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>"`,


    	//Boolean - Whether to horizontally center the label and point dot inside the grid
    	offsetGridLines : false
    };
    return options;
  }
  render() {
    return (
      <div className="dashboard" id="dashboard">
      <AdminNav breadcrumb={<span className="mx-auto"><FontAwesomeIcon icon="home" size="sm"/> Home</span>} isOpen={this.isOpenCallback}/>
      <div id="adminContent" className={this.state.mainContentLMargin}>
      <Container fluid>
      <Row>
      <Col>
        <h3>Saturday May 4, 2019</h3>
        <h5>What's happening today:</h5>
        <Button className="mx-3 returnsLegend">
          Returns - <Badge color="secondary">90</Badge>
        </Button>
        <Button className="mx-3" color="danger">
          Late Returns - <Badge color="secondary">6</Badge>
        </Button>
        <Button className="mx-3 setupsLegend">
          Setups - <Badge color="secondary">40</Badge>
        </Button>
        <hr/>
      </Col>
      </Row>
      <Row>
        <Col>
          <LineChart data={this.chartData()}  options={this.chartOptions()} width="1000" height="300"/>
        </Col>
      </Row>
      </Container>
      <Container fluid className="returns py-2">
        <h3>Upcoming Returns - Today</h3>
        <Table striped hover bordered size="sm">
         <thead>
           <tr>
             <th>#</th>
             <th>First Name</th>
             <th>Last Name</th>
             <th>Phone</th>
             <th>Equipment</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <th scope="row">1</th>
             <td>Mark</td>
             <td>Brown</td>
             <td>(757)143-5497</td>
             <td>Snowboard w/ Boots</td>
           </tr>
           <tr>
             <th scope="row">2</th>
             <td>Jacob</td>
             <td>Thornton</td>
             <td>(757)555-1873</td>
             <td>Snowboard w/ Boots</td>
           </tr>
           <tr>
             <th scope="row">3</th>
             <td>Larry</td>
             <td>Richards</td>
             <td>(757)818-2473</td>
             <td>Skis w/ Boots & Poles</td>
           </tr>
           <tr>
             <th scope="row">4</th>
             <td>Mark</td>
             <td>Brown</td>
             <td>(757)143-5497</td>
             <td>Snowboard w/ Boots</td>
           </tr>
           <tr>
             <th scope="row">5</th>
             <td>Jacob</td>
             <td>Thornton</td>
             <td>(757)555-1873</td>
             <td>Snowboard w/ Boots</td>
           </tr>
           <tr>
             <th scope="row">6</th>
             <td>Larry</td>
             <td>Richards</td>
             <td>(757)818-2473</td>
             <td>Skis w/ Boots & Poles</td>
           </tr>
         </tbody>
         </Table>
      </Container><hr/>

      <Container fluid className="lateReturns py-2">
        <h3>Late Returns</h3>
        <Table striped hover bordered size="sm">
         <thead>
           <tr>
             <th>#</th>
             <th>First Name</th>
             <th>Last Name</th>
             <th>Phone</th>
             <th>Equipment</th>
             <th>Date Due Back</th>
           </tr>
         </thead>
         <tbody className="text-danger">
           <tr>
             <th scope="row">1</th>
             <td>Mark</td>
             <td>Otto</td>
             <td>(757)123-5432</td>
             <td>Snowboard w/ Boots</td>
             <td>5/3/19</td>
           </tr>
           <tr>
             <th scope="row">2</th>
             <td>Jacob</td>
             <td>Thornton</td>
             <td>(757)123-5432</td>
             <td>Snowboard w/ Boots</td>
             <td>5/3/19</td>
           </tr>
           <tr>
             <th scope="row">3</th>
             <td>Larry</td>
             <td>the Bird</td>
             <td>(757)123-5432</td>
             <td>Skis w/ Boots & Poles</td>
             <td>5/3/19</td>
           </tr>
         </tbody>
         </Table>
      </Container>
      </div>
      </div>
    )
  }
}
