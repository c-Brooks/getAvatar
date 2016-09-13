
require('dotenv').config();
var request = require('request');
var fs = require('fs');
var getContribs = require('./getContribs.js');
const apiRoot = 'https://api.github.com';

var auth_token = process.env.AUTH_TOKEN;

var userName;
var repoName;

// If fields are missing, default to lighthouse-labs/laser_shark
if(!process.argv[2] || !process.argv[3]){
  userName = 'lighthouse-labs';
  repoName = 'laser_shark';
 } else {
  userName = process.argv[2];
  repoName = process.argv[3];
}

  var requestOptions = {
    url: apiRoot + '/repos/' + userName+ '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      },
    'auth':{
      'bearer': auth_token
      },
    json: true
    };


if(getContribs.validate(requestOptions)){
  console.log("Request is valid.  Extracting avatars from " + requestOptions.url.replace('/contributors', '') + "... ");
  if(getContribs.getRepoContributors(requestOptions)){
    console.log("Done.");
  } else {
    console.log("Unexpected error.")
  }
}

