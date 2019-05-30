import React,{Component} from 'react';
import './ChatWidget.css';
// import config from './config/config';
import $ from 'jquery';

class ChatWidget extends Component {
    constructor(props) {
        super(props);

        this.closeChatHead = this.closeChatHead.bind(this);
    }
    
    componentDidMount() {
        console.log('ChatWidget component mounted. Running intialization scripts');
    }

    closeChatHead() {
        $('#qnimate').removeClass('popup-box-on');
    }

    render() {
        let currentDate = new Date();
        return (
            <div>
                <div className="popup-box chat-popup" id="qnimate">
                    <div className="popup-head">
                        <div className="popup-head-left pull-left"><img alt="" src="http://bootsnipp.com/img/avatars/bcf1c0d13e5500875fdd5a7e8ad9752ee16e7462.jpg" /> Jane Doe</div>
                            <div className="popup-head-right pull-right">
                                <div className="btn-group">
                                    <button className="chat-header-button" data-toggle="dropdown" type="button" aria-expanded="false">
                                    <i className="fa fa-cog"></i> </button>
                                    <ul role="menu" className="dropdown-menu pull-right" id="chatOptions">
                                        <li><a href="google.co.in">Media</a></li>
                                        <li><a href="google.co.in">Block</a></li>
                                        <li><a href="google.co.in">Clear Chat</a></li>
                                        <li><a href="google.co.in">Email Chat</a></li>
                                    </ul>
                                </div>
                                <div className="btn-group">
                                    <button data-widget="remove" onClick={this.closeChatHead} id="closeChatHead" className="chat-header-button pull-right" type="button"><i className="fa fa-power-off"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="popup-messages">
                            <div className="direct-chat-messages">
                                <div className="chat-box-single-line">
                                    <abbr className="timestamp">{currentDate.getDate() + " / " + (currentDate.getMonth() + 1) + " / " + currentDate.getFullYear()}</abbr>
                                </div>
                            </div>
                        </div>
                    <div className="popup-messages-footer">
                    <textarea id="status_message" placeholder="Type a message..." rows="10" cols="40" name="message"></textarea>
                    <div className="btn-footer">
                    <button className="bg_none"><i className="fa fa-film"></i> </button>
                    <button className="bg_none"><i className="fa fa-camera"></i> </button>
                    <button className="bg_none"><i className="fa fa-paperclip"></i> </button>
                    <button className="bg_none pull-right"><i className="fa fa-thumbs-up"></i> </button>
                    </div>
                    </div>
            </div>
            </div>
          );
    }
}

export default ChatWidget;
