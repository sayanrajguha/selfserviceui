import React,{Component} from 'react';
// import logo from './logo.svg';
import './Navbar.css';

/*
props : siteTitle, logout
*/

class Navbar extends Component{
  
  componentDidMount() {
    console.log('Navbar component mounted. Running intialization scripts');
    
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="www.google.com">{this.props.siteTitle}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="www.google.com">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="www.google.com">Approved Requests</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="www.google.com">Rejected Requests</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <button className="btn btn-outline-light my-2 my-sm-0" type="button" onClick={this.props.logout}>Logout</button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Navbar;
