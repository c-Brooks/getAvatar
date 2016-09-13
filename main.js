
require('dotenv').config();
var request = require('request');
var fs = require('fs');
var getContribs = require('./getContribs.js');

var auth_token = process.env.AUTH_TOKEN;

var userName;
var repoName;

if(!process.argv[2] || !process.argv[3]){
  userName = 'lighthouse-labs';
  repoName = 'laser_shark';
 } else {
  userName = process.argv[2];
  repoName = process.argv[3];
}

getContribs.getRepoContributors(userName, repoName);