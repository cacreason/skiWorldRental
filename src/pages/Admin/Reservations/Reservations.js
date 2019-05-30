//Admin Reservations Page for Ski World Rental Management Platform
// 5/7/19

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import AdminNav from '../../../components/AdminNav/AdminNav';
import Calendar from '../../../components/Calendar/Calendar';
import './styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class AdminReservations extends React.Component {
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

  render() {
    return (
      <div className="reservations" id="reservations">
      <AdminNav breadcrumb={<span className="mx-auto"><FontAwesomeIcon icon="book" size="sm"/> Reservations</span>} isOpen={this.isOpenCallback}/>
      <div id="adminContent" className={this.state.mainContentLMargin}>
      <Container fluid>
      <Row>
      <Col>
        <Calendar/>
      </Col>
      </Row>
      </Container>
      </div>
      </div>
    )
  }
}
