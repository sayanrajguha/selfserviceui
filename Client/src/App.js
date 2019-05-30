import React,{Component} from 'react';
import $ from 'jquery';
// import logo from './logo.svg';
import './App.css';
import Login from './Login';
// import Navbar from './Navbar';
import Dashboard from './Dashboard';


/*
*   state :   isLoggedIn, username, role
*/
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn : false,
      username : null,
      role : null,
      org : null
    };

    this.displayErrorMessage = this.displayErrorMessage.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
  }

  displayErrorMessage(level, text) {
    $('.form-signin').css('max-height','400px');
    $('#error').html('<div class="alert alert-'+ level +' alert-dismissible fade show" role="alert" id="errorAlert"><strong id="errorMessage">' + text + '</strong></div>');
    $('#errorAlert').fadeTo(2000, 500).fadeOut(500, function(){
        $("#success-alert").fadeOut(500);
        $('.form-signin').css('max-height','330px');
    });
    } 

  authenticate() {
    // console.log('Clicked on Sign in. In authenticate() function...');
    let username = $('#username').val();
    let password = $('#password').val();
    let role = $('#role').val();
    if(username.trim() === '' || password.trim() === '' || role.trim() === '' ) {
        console.log('Incomplete data');
        this.displayErrorMessage('warning','Please fill in all the fields');
    } else {
        console.log('Calling login API with entered credentials...');
        //login api
        $.ajax({
            type: "POST",
            url: "http://localhost:6001/login",
            data: {username : username, password : password, role : role},
            dataType : 'json',
            success: (result) => {
                console.log('Login API response received.');
                // console.log(result);
                this.setState({
                  isLoggedIn : true,
                  username : result.username,
                  role : result.role,
                  org : result.org
                });
                console.log(this.state);
            },
            error : (result) => {
                console.log('Error in Login API');
                // console.log(result);
                if(result && result.status === 401) {
                    console.log('Invalid Credentials');
                    this.displayErrorMessage('danger',result.responseText);
                }  
            }
        });
    }
  }

  logout() {
    console.log('Logging out [' + this.state.username + '] ::  <' + this.state.role + '>');
    this.setState({
      isLoggedIn : false,
      username : null,
      role : null,
      org : null
    });
  }

  render() {
        if(this.state.isLoggedIn) {
          return (
            <Dashboard username={this.state.username} role={this.state.role} isLoggedIn={this.state.isLoggedIn} logout={this.logout} org={this.state.org}/>
          );
        } else {
          return (
            <Login authenticate={this.authenticate} displayErrorMessage={this.displayErrorMessage} />
          );
        }
      }
  }

export default App;
