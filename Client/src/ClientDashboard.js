import React,{Component} from 'react';
import './ClientDashboard.css';
import Navbar from './Navbar';
import template from './templates/template.json';
import templateDemo from './templates/template-demo.json';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Marker from '@editorjs/marker';
import Embed from '@editorjs/embed';
import Delimiter from '@editorjs/delimiter';
import Paragraph from '@editorjs/paragraph';
import $ from 'jquery';
import config from './config/config';

class ClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.editor = null;

        this.state = {
            enableEditMode : false
        };

        this.submitWrapper = this.submitWrapper.bind(this);
        this.initializeEditor = this.initializeEditor.bind(this);
        this.deactivateEditor = this.deactivateEditor.bind(this);
        this.newWrapper = this.newWrapper.bind(this);
        this.loadFromDraft = this.loadFromDraft.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
    }

    newWrapper() {
        this.setState({
            enableEditMode : true
        });
        this.initializeEditor(templateDemo);
    }

    loadFromDraft() {
        this.setState({
            enableEditMode : true
        });
        this.initializeEditor(template);
    }

    submitWrapper() {
        console.log('In SubmitWrapper function...');
        this.editor.save()
        .then((jsonData) => {
            console.log('Generated json from editor');
            console.log(jsonData);
            $.ajax({
                method : "POST",
                url: config.API_DOMAIN+"://" + config.API_HOST +":" + config.API_PORT + "/citations/createWrapper",
                data: {user : this.props.username, org : this.props.org, isDraft : false, content : jsonData},
                dataType : 'json',
                success : (result) => {
                    console.log('/citations/createWrapper API response received.');
                    // console.log(result);
                    this.displayMessage('success','Wrapper created successfully..');
                    this.deactivateEditor();
                },
                error : (err) => {
                    console.log('Error in /citations/createWrapper API');
                    console.log(err);
                    if(err && err.status === 401) {
                        console.log('User is not authorized to perform the action');
                        // this.displayErrorMessage('danger',result.responseText);
                    }
                    this.displayMessage('danger',err.responseText); 
                }
            });
        })
        .catch((err) => {
            console.log('Error in editor. Failed to generate JSON');
            console.log(err);
        });
    }

    displayMessage(level, text) {
        console.log('in displayMessage function of ClientDashboard..');
        $('#msg').html('<div class="alert alert-'+ level +' alert-dismissible fade show" role="alert" id="errorAlert"><strong id="errorMessage">' + text + '</strong></div>');
        $('#errorAlert').fadeTo(2000, 500).fadeOut(500, function(){
            $("#success-alert").fadeOut(500);
        });
    } 

    componentDidMount() {
        console.log('ClientDashboard component mounted. Running intialization scripts');
    }

    deactivateEditor() {
        this.editor.destroy();
        this.setState({
            enableEditMode : false
        });
    }

    initializeEditor(editorTemplate) {
        this.editor = new EditorJS({
            holder : 'editorjs',

            tools : {
                header : {
                    class : Header,
                    inlineToolbar : ['link'],
                    config : {
                        placeholder : 'Start typing a Header... Click on [...] to change level to (h1,h2,h3...)'
                    }
                },
                paragraph : {
                    class : Paragraph,
                    inlineToolbar : true
                },
                image : Image,
                list : {
                    class : List,
                    inlineToolbar : true
                },
                checklist : {
                    class : Checklist,
                    inlineToolbar : true
                },
                marker : Marker,
                embed : Embed,
                delimiter : Delimiter
            },

            onReady : () => {
                console.log('Editor is ready.');
                
            },

            onChange : () => {
                console.log('Editor content modified.');
                
            },
            data : editorTemplate
        });
    }

    render() {
        let initBox = (
            <div className="row initBox">
                <div className="col-4" title="New Wrapper Request">
                    <button className="btn-circle" onClick={this.newWrapper}>
                        <i className="fa fa-plus-circle"></i>
                    </button>
                </div>
                <div className="col-4" title="Last Saved Draft">
                    <button className="btn-circle" onClick={this.loadFromDraft}>
                        <i className="fa fa-cloud-download-alt"></i>
                    </button>
                </div>
                <div className="col-4" title="View All Wrappers">
                    <button className="btn-circle">
                        <i className="fa fa-list-alt"></i>
                    </button>
                </div>
            </div>
        );
        let editor = (
            <div>
                <div id="editorjs"></div>
                <footer className="fixed-bottom">
                    <div className="container">
                        <div className="btn-toolbar button-panel" role="toolbar">
                            <div className="btn-group mr-2" role="group">
                                <button type="button" className="btn btn-danger" onClick={this.deactivateEditor}>Back</button>
                            </div>
                            <div className= "btn-group mr-2" role="group">
                                <button type="button" className="btn btn-primary">Preview</button>
                            </div>
                            <div className= "btn-group mr-2" role="group">
                                <button type="button" className="btn btn-success" onClick={this.submitWrapper}>Submit for Approval</button>
                            </div>
                            <div className="btn-group mr-2" role="group">
                                <button type="button" className="btn btn-warning">Save as Draft</button>    
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
        let mainDash = null;
        if(this.state.enableEditMode)
            mainDash = editor;
        else 
            mainDash = initBox;

        return (
            <div>
                <Navbar siteTitle="CLIENT DASHBOARD" logout={this.props.logout} />
                <div className="container">
                    <div className="row m-1">
                        <h2>Welcome {this.props.username}</h2>
                    </div>
                    <div id="msg"></div>
                    {mainDash}
                </div>
            </div>
          );
    }
}

export default ClientDashboard;
