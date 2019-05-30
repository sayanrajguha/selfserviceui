const mongoose = require('mongoose');
const config = require('../config/config');
const uuid = require('uuid/v1');
const Schema = mongoose.Schema;

const WrapperSchema = new Schema({
  wrapper_id : {
    type : String,
    unique : true,
    required : true
  },
  content_json : {
      type : Schema.Types.Mixed,
      default : {}
  },
  status : {
    type : String,
    required : true
  },
  client_name : {
    type : String,
    required : true
  },
  pdf_status : {
    type : Boolean,
    required : true
  },
  pdf_url : {
    type : String
  },
  pdf_created_by : {
    type : String
  },
  created_date : {
    type : Date,
    default : Date.now
  },
  created_by : {
    type : String,
    required : true
  },
  last_updated : {
    type : Date,
    default : Date.now
  }
},{minimize : false});

var Wrapper = module.exports = mongoose.model('Wrapper',WrapperSchema);

module.exports.createWrapper = function(newWrapper, callback) {
  newWrapper.save(callback);
}

module.exports.updateWrapper = function(wrapper_id,changedObj,callback) {
  Wrapper.findOneAndUpdate({wrapper_id : wrapper_id},changedObj,{new:true}, callback);
}
module.exports.getWrapper = function(wrapper_id,callback) {
    Wrapper.findOne({wrapper_id : wrapper_id}, callback);    
}

module.exports.getAllWrappers = function(callback) {
    Wrapper.find({}, callback);    
}

module.exports.getAllWrappersByStatus = function(status,callback) {
    Wrapper.find({status : status}, callback);    
}

module.exports.deleteWrapper = function(wrapper_id,callback) {
  Wrapper.remove({ wrapper_id: wrapper_id },callback);
  
}

module.exports.submitNewWrapper = (contentJSON,clientName,createdBy,isDraft) => {
    return new Promise((resolve,reject) => {    
        let status = "";
        if(isDraft) {
            status = config.WRAPPER_STATUS_DRAFT;
        } else {
            status = config.WRAPPER_STATUS_SUBMITTED;
        }
        // console.log(contentJSON);
        let newWrapperObj = new Wrapper({
            wrapper_id : uuid(),
            content_json : contentJSON,
            status : status,
            client_name : clientName,
            pdf_status : false,
            pdf_url : null,
            pdf_created_by : null,
            created_by : createdBy
        });
        // console.log(newWrapperObj);
        Wrapper.createWrapper(newWrapperObj, (err,wrapper) => {
            if(err) {
                return reject(err);
            } else {
                return resolve(wrapper);
            }
        });
    });
}

module.exports.pdfUploadedForWrapper = (wrapperId, pdfUrl, pdfCreatedBy) => {
  return new Promise((resolve,reject) => {    
      if(pdfUrl && pdfUrl.trim() !== '' && pdfCreatedBy && pdfCreatedBy.trim() !== '') {
          let changedObj = {
            pdf_status : true,
            status : config.WRAPPER_STATUS_PDF_UPLOADED,
            pdf_url : pdfUrl,
            pdf_created_by : pdfCreatedBy,
            last_updated : Date.now()
          };
          Wrapper.updateWrapper(wrapperId,changedObj, (err,wrapper) => {
            if(err) {
              return reject(err);
            } else {
              return resolve(wrapper);
            }
          });
      } else {
        return reject();
      }
      
  });
}