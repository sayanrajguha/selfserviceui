import React,{Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import $ from 'jquery';
// import logo from './logo.svg';
import './CommentModal.css';


class CommentModal extends Component{
  render() {
    return (
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="hidden" id="wrapperId" name="wrapperId" value={this.props.wrapperId ? this.props.wrapperId : ""} />
            <input type="hidden" id="actionTrigger" name="actionTrigger" value={this.props.actionTrigger ? this.props.actionTrigger : ""}   />
            <label htmlFor="modalInput">{this.props.inputLabel}</label>
            <input type="text" className="form-control" id="modalInput" name="modalInput" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              {this.props.closeBtnLabel}
            </Button>
            <Button variant="primary" onClick={e => {
              this.props.handleSave($('#wrapperId').val(), $('#actionTrigger').val(), $('#modalInput').val());
              this.props.handleClose();
              }}>
              {this.props.saveBtnLabel}
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default CommentModal;