import React,{Component} from 'react';
import './CitationsDashboard.css';
import Navbar from './Navbar';
import config from './config/config';
import ChatWidget from './ChatWidget';
import $ from 'jquery';
import CommentModal from './CommentModal';

class CitationsDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            citationsList : [],
            showCommentModal : false,
            actionTrigger : null,
            wrapperId : null
        };

        this.refreshList = this.refreshList.bind(this);
        this.approveCitation = this.approveCitation.bind(this);
        this.rejectCitation = this.rejectCitation.bind(this);
        this.queryUser = this.queryUser.bind(this);
        this.openChatHead = this.openChatHead.bind(this);
        this.userConfirmation = this.userConfirmation.bind(this);
        this.openCommentDialog = this.openCommentDialog.bind(this);
        this.closeCommentDialog = this.closeCommentDialog.bind(this);
    }

    refreshList() {
        $.ajax({
            type: "GET",
            url: config.API_DOMAIN+"://" + config.API_HOST +":" + config.API_PORT + "/citations/getAllSubmitted",
            dataType : 'json',
            success: (result) => {
                console.log('citations/getAllSubmitted response received.');
                console.log(result);
                this.setState({
                    citationsList : result
                });
            },
            error : (error) => {
                console.log('Error in citations/getAllSubmitted API');
                console.log(error);
                  
            }
        });
    }
    
    componentDidMount() {
        console.log('CitationsDashboard component mounted. Running intialization scripts');
        this.refreshList();
    }

    openChatHead() {
        console.log('in openchathead function');      
        $('#qnimate').addClass('popup-box-on');
    }

    userConfirmation(wrapperId, actionTrigger, comment) {
        console.log('Inside userConfirmation');
        // console.log(wrapperId);
        // console.log(actionTrigger);
        // console.log(comment);
        switch(actionTrigger) {
            case "approve" : 
                this.approveCitation(wrapperId, actionTrigger, comment);
                break;
            case "reject" : 
                this.rejectCitation(wrapperId, actionTrigger, comment);
                break;
            default : console.log('Invalid actionTrigger... : '+actionTrigger);
        }
    }

    openCommentDialog(wrapper_id, actionTrigger) {
        console.log(actionTrigger);
        this.setState({
            showCommentModal : true,
            actionTrigger : actionTrigger,
            wrapperId : wrapper_id
        });
    }

    closeCommentDialog() {
        this.setState({
            showCommentModal : false,
            actionTrigger : null,
            wrapperId : null
        });
    }

    approveCitation(wrapperId,actionTrigger,comment) {
        console.log('Citation with id ' + wrapperId + ' to be approved by ' + this.props.username);
        $.ajax({
            method : "POST",
            url: config.API_DOMAIN+"://" + config.API_HOST +":" + config.API_PORT + "/citations/approveCitation",
            data: {user : this.props.username, wrapperId : wrapperId, chatTranscript : {
                "status" : actionTrigger,
                "comment" : comment
            }},
            dataType : 'json',
            success : (result) => {
                console.log('/citations/approveCitation API response received.');
                // console.log(result);
                this.displayMessage('success','Wrapper APPROVED successfully..!');
                this.refreshList();
            },
            error : (err) => {
                console.log('Error in /citations/approveCitation API');
                console.log(err);
                if(err && err.status === 401) {
                    console.log('User is not authorized to perform the action');
                    // this.displayErrorMessage('danger',result.responseText);
                }
                this.displayMessage('danger',err.responseText); 
            }
        });
    }

    rejectCitation(wrapperId, actionTrigger, comment) {
        console.log('Citation with id %s to be rejected with comments : %s',wrapperId,comment);
    }

    queryUser(wrapperId) {
        console.log('Citation with id ' + wrapperId + ' to be queried! ');
    }

    displayMessage(level, text) {
        console.log('in displayMessage function of CitationsDashboard..');
        $('#msg').html('<div class="alert alert-'+ level +' alert-dismissible fade show" role="alert" id="errorAlert"><strong id="errorMessage">' + text + '</strong></div>');
        $('#errorAlert').fadeTo(2000, 500).fadeOut(500, function(){
            $("#success-alert").fadeOut(500);
        });
    } 

    render() {
        let citations = null;
        if(this.state && this.state.citationsList) {
            citations = this.state.citationsList.map((item,i) => (
                <div className="card" key={item._id}>
                    <div className="card-header" id={"heading"+i}>
                        <div className="row">
                        <div className="col-5">
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse"+i} aria-expanded="true" aria-controls={"collapse"+i}>
                                {item.wrapper_id}
                            </button>
                        </div>
                        <div className="col-5">
                            {/* <p disabled>&lt;&lt;Details&gt;&gt;</p> */}
                            <div className="row">
                                <div className="col-3"><strong className="badge badge-pill badge-light">Client Name</strong></div>
                                <div className="col-9 accordianVals">{item.client_name}</div>
                            </div>
                            <div className="row">
                                <div className="col-3"><strong className="badge badge-pill badge-light">Created By</strong></div>
                                <div className="col-9 accordianVals">{item.created_by}</div>
                            </div>
                            <div className="row">
                                <div className="col-3"><strong className="badge badge-pill badge-light">Created on</strong></div>
                                <div className="col-9 accordianVals">{item.created_date}</div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="pull-right">
                                <div className="btn-group" role="group" aria-label="Perform Action">
                                <p className="mr-2" data-placement="top" data-toggle="tooltip" title="Approve">
                                    <button className="btn btn-primary btn-xs" id={item.wrapper_id} onClick={e => this.openCommentDialog(item.wrapper_id, 'approve')}>
                                        <i className="fa fa-check"></i>
                                    </button>
                                </p>
                                <p className="mr-2" data-placement="top" data-toggle="tooltip" title="Reject">
                                    <button className="btn btn-primary btn-xs" id={item.wrapper_id} onClick={e => this.openCommentDialog(item.wrapper_id, 'reject')}>
                                        <i className="fa fa-times"></i>
                                    </button>
                                </p>
                                <p className="mr-2" data-placement="top" data-toggle="tooltip" title="Query">
                                    <button className="btn btn-primary btn-xs openChatHead" id="openChatHead" onClick={this.openChatHead}>
                                        <i className="fa fa-comment-dots"></i>
                                    </button>
                                </p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
            
                    <div id={"collapse"+i} className="collapse collapsed" aria-labelledby={"heading"+i} data-parent="#accordionExample">
                        <div className="card-body">
                            <pre>
                                {JSON.stringify(item.content_json,null,2)}
                            </pre>
                        </div>
                    </div>
                </div>
            ));
        } else {
            citations = (
                <p><i>No records found</i></p>
            );
        }
        
        return (
            <div>
                <Navbar siteTitle="FORRESTER CITATIONS DASHBOARD" logout={this.props.logout} />
                <div className="container">
                    <div className="row m-1">
                        <h2>Welcome {this.props.username}</h2>
                    </div>
                    <div className="row m-1">
                        <h3>Pending Requests for Approval</h3>
                    </div>
                    <div id="msg"></div>
                    <div className="accordion" id="accordionExample">
                        {citations}
                    </div>
                </div>
                <ChatWidget username={this.props.username} />
                <CommentModal title="Approval Workflow" wrapperId={this.state.wrapperId} actionTrigger={this.state.actionTrigger} show={this.state.showCommentModal} inputLabel={"Please enter comment to " + this.state.actionTrigger + " wrapper request :"} saveBtnLabel="Submit" closeBtnLabel="Cancel" handleClose={this.closeCommentDialog} handleSave={this.userConfirmation} />
            </div>
          );
    }
}

export default CitationsDashboard;
