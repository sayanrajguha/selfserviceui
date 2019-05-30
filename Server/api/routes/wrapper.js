const express = require('express');
const loop = require('node-async-loop');
const config = require('../../config/config');
const WrapperModel = require('../../models/wrapper');
const CitationModel = require('../../models/citation');

module.exports.submitNewWrapper = (req,res,next) => {
    console.log('/submitWrapper route invoked!...');
    // console.log(req.body);
    let contentJSON = req.body.content;
    let clientName = req.body.org;
    let createdBy = req.body.user;
    let isDraft = req.body.isDraft;
    if(typeof isDraft === 'string') {
        if(isDraft === 'true')
            isDraft = true;
        else 
            isDraft = false;
    }
    
    console.log('Wrapper of ' + clientName + ' to be created by [' + createdBy + '] as ' + (isDraft ? 'DRAFT' : 'SUBMITTED') + '...');
    WrapperModel.submitNewWrapper(contentJSON,clientName,createdBy,isDraft)
    .then((wrapperObj) => {
        //wrapper created successfully
        CitationModel.createNewCitation(wrapperObj.wrapper_id,Date.now().toString(),createdBy)
        .then((citation) => {
            //Citation created successfully
            return res.status(200).json({
                status : 200,
                msg : 'Wrapper Created Successfully'});
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send('Wrapper Created but Citation creation failed.');
        });
    })
    .catch((err) => {
        //wrapper creation failed
        console.log(err);
        return res.status(500).send(err);
    });
}

module.exports.getAllWrappersSubmitted = (req,res,next) => {
    console.log('/getAllWrappersSubmitted route invoked!...');

    WrapperModel.getAllWrappersByStatus(config.WRAPPER_STATUS_SUBMITTED, (err,wrappers) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            res.status(200).json(wrappers);
        }
    });
}


module.exports.getAllWrappersApproved = (req,res,next) => {
    console.log('/getAllWrappersApproved route invoked!...');

    WrapperModel.getAllWrappersByStatus(config.WRAPPER_STATUS_APPROVED, (err,wrappers) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            let responseList = [];
            loop(wrappers, (wrapper,next) => {
                console.log('Processing wrapper with id : '+wrapper.wrapper_id);
                
                let responseObj = {};
                CitationModel.getCitationByWrapperId(wrapper.wrapper_id, (err,citation) => {
                    console.log('Fetched citation with wrapper Id : '+wrapper.wrapper_id);
                    console.log(citation);
                    if(err) {
                        console.log(err);
                        next();
                    } else {
                        console.log('updating wrapper');
                        responseObj._id = wrapper._id;
                        responseObj.wrapper_id = wrapper.wrapper_id;
                        responseObj.status = wrapper.status;
                        responseObj.client_name = wrapper.client_name;
                        responseObj.pdf_status = wrapper.pdf_status;
                        responseObj.created_by = wrapper.created_by;
                        responseObj.created_date = wrapper.created_date;
                        responseObj.approve_date = citation.approve_date;
                        responseObj.approved_by = citation.approved_by;
                        responseObj.last_updated = wrapper.last_updated;
                        responseObj.content_json = wrapper.content_json;
                        
                        responseList.push(responseObj);
                        next();
                    }
                });
            }, (loopErr) => {
                if(err) {
                    console.log(loopErr);
                }
                console.log('Completed iteration of approved wrappers and updated citation details.');
                return res.status(200).json(responseList);
            });
        }
    });
}

module.exports.approveCitation = (req,res,next) => {
    console.log('/approveCitation route invoked!...');

    let wrapperId = req.body.wrapperId;
    let user = req.body.user;
    let chatTranscript = req.body.chatTranscript;

    if(!wrapperId || wrapperId.trim() === '' || !user || user.trim() === '') {
        return res.status(400).send('Incomplete/Invalid parameters');
    }

    CitationModel.approveCitation(wrapperId,user,chatTranscript)
    .then(() => {
        //citation approved successfully
        console.log('Citation approved for wrapperId : '+wrapperId+'. Updating status of wrapper...');
        let wrapperUpdates = {
            status : config.WRAPPER_STATUS_APPROVED,
            last_updated : Date.now()
        };
        WrapperModel.updateWrapper(wrapperId,wrapperUpdates,(err,updatedWrapper) => {
            if(err) {
                console.log(err);
                res.status(500).send('Citation approved but Wrapper Status update failed!ERROR : ', err);
            } else {
                console.log('Wrapper status updated to : ' + (updatedWrapper ? updatedWrapper.status : null));
                return res.status(200).json({
                    status : 200,
                    msg : 'Citation Approved Successfully'
                });             
            }
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
}

module.exports.uploadPDF = (req,res,next) => {
    console.log('/uploadPDF route invoked!...');

    let wrapperId = req.body.wrapperId;
    let pdfUrl = req.body.pdfUrl;
    let pdfCreatedBy = req.body.user;

    if(!wrapperId || wrapperId.trim() === '' || !pdfUrl || pdfUrl.trim() === '' || !pdfCreatedBy || pdfCreatedBy.trim() === '') {
        return res.status(400).send('Incomplete/Invalid parameters');
    }
    WrapperModel.pdfUploadedForWrapper(wrapperId,pdfUrl,pdfCreatedBy)
    .then((updatedWrapper) => {
        console.log('PDF upload status updated for wrapper with id : '+wrapperId);
        return res.status(200).json({
            status : 200,
            msg : 'PDF uploaded successfully'
        });
    })
    .catch((err) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            return res.status(400).send('Incomplete/Invalid parameters');
        }
    });
}