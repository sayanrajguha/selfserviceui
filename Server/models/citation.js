const mongoose = require('mongoose');
const config = require('../config/config');
const Schema = mongoose.Schema;

const CitationSchema = new Schema({
  wrapper_id : {
    type : String,
    unique : true,
    required : true
  },
  created_date : {
    type : String,
    required : true
  },
  created_by : {
    type : String,
    required : true
  },
  approve_date : {
    type : String
  },
  approved_by : {
    type : String
  },
  chatTranscript : []
});

const Citation = module.exports = mongoose.model('Citation',CitationSchema);

module.exports.createCitation = (newCitation, callback) => {
  newCitation.save(callback);
}

module.exports.updateCitation = (citationId,newCitation,callback) => {
  Citation.getCitation(citationId, (err,citation) => {
    if(err) throw err;
    if(!citation) {
      callback(null,false);
    }
    console.log('citation with id : ' + citationId + ' found');
    /* Set all the fields of wrapper
    *   equal to all the fields of newWrapper
    */

    citation.save(callback);
  });
}

module.exports.deleteCitation = (citationId,callback) => {
  Citation.remove({ _id: citationId },callback);
}

module.exports.getCitation = (citationId, callback) => {
  Citation.findOne({_id : citationId}, callback);
}

module.exports.getAllCitations = (callback) => {
  Citation.find({}, callback);
}

module.exports.getCitationByWrapperId = (wrapperId,callback) => {
  Citation.findOne({wrapper_id : wrapperId}, callback);
}

module.exports.createNewCitation = (wrapperId, createdDate, createdBy) => {
  return new Promise((resolve,reject) => {
    let newCitationObj = new Citation({
      wrapper_id : wrapperId,
      created_date : createdDate,
      created_by : createdBy,
      approve_date : null,
      approved_by : null,
      chatTranscript : []
    });
    Citation.createCitation(newCitationObj, (err,citation) => {
      if(err) {
        return reject(err);
      } else {
        return resolve(citation);
      }
    });
  });
}

module.exports.approveCitation = (wrapperId,approvedBy,chatTranscriptObj) => {
  return new Promise((resolve,reject) => {
    Citation.getCitationByWrapperId(wrapperId, (err,citation) => {
      if(err) {
        console.log('Error while fetching citation');
        return reject(err);
      } else {
        console.log('Fetched citation for wrapper with id : '+wrapperId);
        citation.approve_date = Date.now();
        citation.approved_by = approvedBy;
        if(chatTranscriptObj && !(Object.keys(chatTranscriptObj).length === 0 && chatTranscriptObj.constructor === Object)) {
          citation.chatTranscript.push(chatTranscriptObj);
        }
        citation.save((err) => {
          if(err) {
            return reject(err);
          } else {
            return resolve();
          }
        });
      }
    });
  });
}