//Admin Navigation Component for Ski World Rental Management
// 5/2/19
//
//
//

import React from 'react';
import { Container, Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import SWLogo from '../../images/swLogo.png';
import './styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class AdminNav extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    }
  }
  componentDidMount() {
    this.props.isOpen(this.state.isOpen);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    this.props.isOpen(!this.state.isOpen);
  }
  render() {
    return (
      <div className="AdminNav" id="AdminNav">
      <Navbar color="light" light fixed="top">
          <NavbarToggler onClick={this.toggle} />
          <h5 className="px-3">{this.props.breadcrumb} /</h5>
      </Navbar>
          <Collapse className="bg-light  position-fixed" isOpen={this.state.isOpen} exit={false} navbar>
          <Nav className="mr-auto flex-column" navbar>
            <NavbarBrand className="m-0 p-0">
              <img className="img-fluid w-75 mx-auto d-block" src={SWLogo} alt="Ski World Logo"/>
            </NavbarBrand>
            <NavItem><hr/>
              <NavLink to="/Admin">
                <span className="mx-auto d-block"><FontAwesomeIcon icon="home" size="lg"/> Home
                </span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Admin/Inventory">
                <span className="mx-auto d-block"><FontAwesomeIcon icon="boxes" size="lg"/> Inventory
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Admin/Users">
                <span className="mx-auto d-block"><FontAwesomeIcon icon="skiing" size="lg"/> Users
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Admin/Reservations">
                <span className="mx-auto d-block"><FontAwesomeIcon icon="book" size="lg"/> Reservations
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Admin/Settings">
                <span className="mx-auto d-block"><FontAwesomeIcon icon="cogs" size="lg"/> Settings
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="Admin/Logout">
                <span className="mx-auto d-block"><FontAwesomeIcon icon="sign-out-alt" size="lg"/> Sign Out
                </span>
              </NavLink>
            </NavItem>
          </Nav>
          </Collapse>
      </div>
    )
  }
}
