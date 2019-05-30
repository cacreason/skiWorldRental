import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminLogin from './pages/Admin/Login/Login';
import AdminDashboard from './pages/Admin/Dashboard/Dashboard';
import AdminInv from './pages/Admin/Inventory/Inventory';
import AdminUsers from './pages/Admin/Users/Users';
import AdminReserv from './pages/Admin/Reservations/Reservations';
import AdminSettings from './pages/Admin/Settings/Settings';
import AdminNotFound from './pages/Admin/NotFound/NotFound';
import { Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faPlus, faFileImport, faPrint, faHome, faBoxes, faSkiing, faBook, faCogs, faSignOutAlt, faFileExport } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faPlus, faFileImport, faPrint, faHome, faBoxes, faSkiing, faBook, faCogs, faSignOutAlt, faFileExport)

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path="/admin" component={AdminDashboard}/>
        <Route exact path="/admin/login" component={AdminLogin}/>
        <Route exact path="/admin/inventory" component={AdminInv}/>
        <Route exact path="/admin/users" component={AdminUsers}/>
        <Route exact path="/admin/reservations" component={AdminReserv}/>
        <Route exact path="/admin/settings" component={AdminSettings}/>
        <Route path="/admin/" component={AdminNotFound}/>
      </Switch>
      </div>
    );
  }
}

export default App;
