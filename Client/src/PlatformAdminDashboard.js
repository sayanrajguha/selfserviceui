import React,{Component} from 'react';
import './PlatformAdminDashboard.css';
import Navbar from './Navbar';

class PlatformAdminDashboard extends Component {
    
    componentDidMount() {
        console.log('PlatformAdminDashboard component mounted. Running intialization scripts');
        
    }

    render() {
        return (
            <div>
                <Navbar siteTitle="PLATFORM ADMINISTRATOR DASHBOARD" logout={this.props.logout} />
                <div className="container mt-5">
                    <div className="row m-1">
                        <h1>Platform Admin Dashboard</h1>
                    </div>
                    <div className="row m-1">
                        <h2>Welcome {this.props.username}</h2>
                    </div>
                    <div className="row m-1">
                        <h3>Open Requests for Wrapper URL Creation</h3>
                    </div>
                    <div className="accordion" id="accordionExample">
                        <div className="card">
                        <div className="card-header" id="headingOne">
                            <div className="row">
                            <div className="col-5">
                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Wrapper 1
                                </button>
                            </div>
                            <div className="col-5">
                                <p disabled>&lt;&lt;Details&gt;&gt;</p>
                            </div>
                            <div className="col-2">
                                <div className="pull-right">
                                    <div className="btn-group" role="group" aria-label="Perform Action">
                                    <p className="mr-2" data-placement="top" data-toggle="tooltip" title="View All Details">
                                        <button className="btn btn-primary btn-xs">
                                            <i className="fa fa-eye"></i>
                                        </button>
                                    </p>
                                    <p className="mr-2" data-placement="top" data-toggle="tooltip" title="Upload URL">
                                        <button className="btn btn-primary btn-xs" data-toggle="modal" data-target="#urlModal">
                                        <i className="fa fa-file-upload"></i>
                                        </button>
                                    </p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    
                        <div id="collapseOne" className="collapse collapsed" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                            &lt;&lt;&lt; Dummy Content &gt;&gt;&gt;
                            </div>
                        </div>
                        </div>
                        <div className="card">
                        <div className="card-header" id="headingTwo">
                            <div className="row">
                                <div className="col-5">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Wrapper 2
                                </button>
                                </div>
                                <div className="col-5">
                                <p disabled>&lt;&lt;Details&gt;&gt;</p>
                                </div>
                                <div className="col-2">
                                    <div className="pull-right">
                                        <div className="btn-group" role="group" aria-label="Perform Action">
                                        <p className="mr-2" data-placement="top" data-toggle="tooltip" title="View All Details">
                                            <button className="btn btn-primary btn-xs">
                                                <i className="fa fa-eye"></i>
                                            </button>
                                        </p>
                                        <p className="mr-2" data-placement="top" data-toggle="tooltip" title="Upload URL">
                                            <button className="btn btn-primary btn-xs" data-toggle="modal" data-target="#urlModal">
                                            <i className="fa fa-file-upload"></i>
                                            </button>
                                        </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div className="card-body">
                                &lt;&lt;&lt; Dummy Content &gt;&gt;&gt;
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}

export default PlatformAdminDashboard;
