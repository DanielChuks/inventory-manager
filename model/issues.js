'use strict';

const mongoose = require('mongoose');
const IssueSchema = mongoose.Schema;

const issueSchema = new IssueSchema({
    nature: String,
    reporter: String,
    date: String,
    reporterComment: String,
    adminComment: String,
    resolved: Boolean,
    admin: String,
    serial : Number
  });

// create the model for users and expose it to our app

module.exports = mongoose.model('Issue', issueSchema);

