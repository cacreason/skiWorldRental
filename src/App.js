import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminLogin from './pages/Admin/Login/Login';
import AdminDashboard from './pages/Admin/Dashboard/Dashboard';
import AdminInv from './pages/Admin/Inventory/Inventory';
import AdminUsers from './pages/Admin/Users/Users';
import AdminReserv from './pages/Admin/Reservations/Reservations';
import AdminSettings from './pages/Admin/Settings/Settings';
import { Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faPlus, faFileImport, faPrint, faHome, faBoxes, faSkiing, faBook, faCogs, faSignOutAlt, faFileExport } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faPlus, faFileImport, faPrint, faHome, faBoxes, faSkiing, faBook, faCogs, faSignOutAlt, faFileExport)

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route exact path="/admin" component={AdminDashboard}/>
      <Route path="/admin/login" component={AdminLogin}/>
      <Route path="/admin/inventory" component={AdminInv}/>
      <Route path="/admin/users" component={AdminUsers}/>
      <Route path="/admin/reservations" component={AdminReserv}/>
      <Route path="/admin/settings" component={AdminSettings}/>
      </div>
    );
  }
}

export default App;
