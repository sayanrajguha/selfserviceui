import React,{Component} from 'react';
// import logo from './logo.svg';
import './ConfirmationModal.css';


class ConfirmationModal extends Component{
  render() {
    return (
      <div className="modal fade" id="confirmationModal" tabindex="-1" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmationModalLabel">{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.content}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" onClick={this.props.onConfirmAccept} >Yes</button>
              <button type="button" data-dismiss="modal" className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmationModal;
