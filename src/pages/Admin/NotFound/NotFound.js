//Page Not Found Page for Ski World Rental Management Platform
// 5/29/19

import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import AdminNav from '../../../components/AdminNav/AdminNav';
import './styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class AdminSettings extends React.Component {
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
      <div className="settings" id="settings">
      <AdminNav breadcrumb={<span className="mx-auto"><FontAwesomeIcon icon="cogs" size="sm"/> Settings</span>} isOpen={this.isOpenCallback}/>
      <div id="adminContent" className={this.state.mainContentLMargin}>
      <Container fluid>
      <Row>
        <Col>
          <h1>Page Not Found</h1>
        </Col>
      </Row>
      </Container>
      </div>
      </div>
    )
  }
}
