import React,{Component} from 'react';
import './PdfDashboard.css';
import Navbar from './Navbar';
import $ from 'jquery';
import config from './config/config';
import CommentModal from './CommentModal';

class PdfDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wrapperList : [],
            showCommentModal : false,
            wrapperId : null
        };

        this.displayMessage = this.displayMessage.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.openCommentDialog = this.openCommentDialog.bind(this);
        this.closeCommentDialog = this.closeCommentDialog.bind(this);
        this.userConfirmation = this.userConfirmation.bind(this);
        this.uploadPDF = this.uploadPDF.bind(this);
    }
    
    
    componentDidMount() {
        console.log('PdfDashboard component mounted. Running intialization scripts');
        this.refreshList();   
    }

    uploadPDF(wrapperId,pdf_url) {
        $.ajax({
            type: "POST",
            url: config.API_DOMAIN+"://" + config.API_HOST +":" + config.API_PORT + "/pdf/upload",
            data : {
                "wrapperId" : wrapperId,
                "pdfUrl" : pdf_url,
                "user" : this.props.username 
            },
            dataType : 'json',
            success: (result) => {
                console.log('pdf/upload response received.');
                console.log(result);
                this.displayMessage('success','PDF UPLOADED successfully..!');
                this.refreshList();
            },
            error : (error) => {
                console.log('Error in pdf/upload API');
                console.log(error);
                if(error && error.status === 401) {
                    console.log('User is not authorized to perform the action');
                    // this.displayErrorMessage('danger',result.responseText);
                }
                this.displayMessage('danger',error.responseText);                
            }
        });
    }

    userConfirmation(wrapperId, actionTrigger, url) {
        console.log('In userConfirmation');
        console.log(wrapperId);
        console.log(actionTrigger);
        console.log(url);
        this.uploadPDF(wrapperId,url);
    }

    openCommentDialog(wrapper_id) {
        this.setState({
            showCommentModal : true,
            wrapperId : wrapper_id
        });
    }

    closeCommentDialog() {
        this.setState({
            showCommentModal : false,
            wrapperId : null
        });
    }

    refreshList() {
        $.ajax({
            type: "GET",
            url: config.API_DOMAIN+"://" + config.API_HOST +":" + config.API_PORT + "/citations/getAllApproved",
            dataType : 'json',
            success: (result) => {
                console.log('citations/getAllApproved response received.');
                console.log(result);
                this.setState({
                    wrapperList : result
                });
            },
            error : (error) => {
                console.log('Error in citations/getAllApproved API');
                console.log(error);
                  
            }
        });
    }

    displayMessage(level, text) {
        console.log('in displayMessage function of PDFDashboard..');
        $('#msg').html('<div class="alert alert-'+ level +' alert-dismissible fade show" role="alert" id="errorAlert"><strong id="errorMessage">' + text + '</strong></div>');
        $('#errorAlert').fadeTo(2000, 500).fadeOut(500, function(){
            $("#success-alert").fadeOut(500);
        });
    }

    render() {
        let approvedWrappers = null;
        if(this.state && this.state.wrapperList) {
            approvedWrappers = this.state.wrapperList.map((item,i) => (
                <div className="card" key={item._id}>
                    <div className="card-header" id={"heading"+i}>
                        <div className="row">
                        <div className="col-5">
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse"+i} aria-expanded="true" aria-controls={"collapse"+i}>
                                {item.wrapper_id}
                            </button>
                        </div>
                        <div className="col-5">
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
                            <div className="row">
                                <div className="col-3"><strong className="badge badge-pill badge-light">Approved By</strong></div>
                                <div className="col-9 accordianVals">{item.approved_by}</div>
                            </div>
                            <div className="row">
                                <div className="col-3"><strong className="badge badge-pill badge-light">Approved On</strong></div>
                                <div className="col-9 accordianVals">{item.approve_date}</div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="pull-right">
                                <div className="btn-group" role="group" aria-label="Perform Action">
                                <p className="mr-2" data-placement="top" data-toggle="tooltip" title="Generate PDF">
                                    <button className="btn btn-primary btn-xs">
                                        <i className="fa fa-file-pdf"></i>
                                    </button>
                                </p>
                                <p className="mr-2" data-placement="top" data-toggle="tooltip" title="Upload PDF">
                                    <button className="btn btn-primary btn-xs" onClick={e => {this.openCommentDialog(item.wrapper_id)}}>
                                        <i className="fa fa-file-upload"></i>
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
                                {JSON.stringify(item.content_json, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            ));
        }

        return (
            <div>
                <Navbar siteTitle="FORRESTER PDF DASHBOARD" logout={this.props.logout} />
                <div className="container">
                    <div className="row m-1">
                        <h2>Welcome {this.props.username}</h2>
                    </div>
                    <div className="row m-1">
                    <h3>Open Requests for PDF Creation</h3>
                    </div>
                    <div id="msg"></div>
                    <div className="accordion" id="accordionExample">
                        {approvedWrappers}
                    </div>
                </div>
                <CommentModal title="PDF Workflow" show={this.state.showCommentModal} wrapperId={this.state.wrapperId} inputLabel={"Please enter URL for the PDF file :"} saveBtnLabel="Submit" closeBtnLabel="Cancel" handleClose={this.closeCommentDialog} handleSave={this.userConfirmation} />
            </div>
          );
    }
}

export default PdfDashboard;
