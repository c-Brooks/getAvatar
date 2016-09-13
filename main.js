//                         GET AVATAR
// Given a GitHub repository, download the avatars of all users
//    who collaborated on the project.
//
// Expects the username of the Repo owner and the name of the Repo
//    to be passed as arguments to the file.
//
// The user must also supply a .env file with a GitHub
//    authentication token
//
// The downloaded avatars will be saved as .png files in a folder
//    called avatars in the project directory



// -------------------------- SETUP -------------------------- //

require('dotenv').config();
var request = require('request');
var fs = require('fs');
var getContribs = require('./getContribs.js');
const apiRoot = 'https://api.github.com';

// ------------------------ MAIN CODE ------------------------ //

// Check the user set up the .env file and their request correctly.
var auth_token = getAuthToken();
var requestOptions = getRequestOptions(auth_token);

// Test the HTTP connection
getContribs.validate(requestOptions);

// Callback function used for printing asynchronously
getContribs.getContributorsAvatars(requestOptions, function (str) { console.log(str) });

// ------------------------ FUNCTIONS ------------------------ //

function getAuthToken () {
if(process.env.AUTH_TOKEN){
  return process.env.AUTH_TOKEN;
  } else {
  console.log("ERROR: Invalid environment. Please supply a .env file with the line AUTH_TOKEN='your token'.");
  console.log("To get a token, go to https://github.com/settings/tokens and click 'generate new token'.");
  process.exit(0);
  }
}

// RequestOptions is an object used by the request module to communicate through HTTP
function getRequestOptions(auth_token) {
  var userName, repoName;
  // If fields are missing, quit the program
  if(!process.argv[2] || !process.argv[3]){
    console.log("ERROR: Incorrect arguments.  This program expects:\
            \n\tnode main.js REPO_OWNER REPO_NAME");
    process.exit(0);
  } else {
    userName = process.argv[2];
    repoName = process.argv[3];
  }
  return {
    url: apiRoot + '/repos/' + userName+ '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      },
    'auth':{
      'bearer': auth_token
      },
    json: true
  };
}
