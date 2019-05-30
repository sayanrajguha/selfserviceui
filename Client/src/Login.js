import React,{Component} from 'react';
import './Login.css';

/*
*       props : authenticate
*/

class Login extends Component {
    componentDidMount() {
        console.log('Login component mounted. Running intialization scripts');
        
    }
    
    render() {
        return (
            <div>
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal text-center">Log in to Self-Service system</h1>
                    <div id="error"></div>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input type="text" id="username" className="form-control" placeholder="username" required autoComplete="off" />
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" id="password" className="form-control" placeholder="password" required />
                    <label htmlFor="role" className="sr-only">Select User Group</label>
                    <select className="mb-3 custom-select" name="role" id="role" defaultValue="-1">
                        <option value="-1">Select User Group</option>
                        <option value="CLIENT_REP">Client Rep</option>
                        <option value="FORRESTER_CITATIONS">Forrester Citations Team</option>
                        <option value="FORRESTER_PDF">Forrester PDF Team</option>
                        <option value="PLATFORM_ADMIN">Platform Admin</option>
                    </select>
                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.props.authenticate}>Sign in</button>
                    <p className="mt-5 mb-3 text-muted text-center">&copy; Happiest Minds Technologies Pvt. Ltd. 2019</p>
                </form>
            </div>
          );
    }
}

export default Login;
