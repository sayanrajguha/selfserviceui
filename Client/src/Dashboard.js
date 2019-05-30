import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
// import logo from './logo.svg';
import './Dashboard.css';
import CitationsDashboard from './CitationsDashboard';
import PdfDashboard from './PdfDashboard';
import PlatformAdminDashboard from './PlatformAdminDashboard';
import ClientDashboard from './ClientDashboard';
// import Navbar from './Navbar';
// import Login from './Login';

class Dashboard extends Component{
  render() {
    console.log('in dashboard render');
      if(!this.props.isLoggedIn || !this.props.username || !this.props.role) {
        console.log('In unwanted block');
        return null;
      } else {
        console.log(this.props.role);
          switch(this.props.role) {
            case "CLIENT_REP" : return (<ClientDashboard username={this.props.username} org={this.props.org} logout={this.props.logout} />);
            case "FORRESTER_CITATIONS" :  return (<CitationsDashboard username={this.props.username} org={this.props.org} logout={this.props.logout} />);
            case "FORRESTER_PDF" :  return (<PdfDashboard username={this.props.username} org={this.props.org} logout={this.props.logout} />);
            case "PLATFORM_ADMIN" : return (<PlatformAdminDashboard username={this.props.username} org={this.props.org} logout={this.props.logout} />);
            default:  return (<Redirect to="/" />); 
          }
      }
  }
}

export default Dashboard;
