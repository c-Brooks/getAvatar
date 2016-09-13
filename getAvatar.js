
require('dotenv').config();
var request = require('request');
var fs = require('fs');

var auth_token = process.env.AUTH_TOKEN;

var userName;
var repoName;

const endPoint = 'https://api.github.com/';


if(!process.argv[2] || !process.argv[3]){
  userName = 'lighthouse-labs';
  repoName = 'laser_shark';
 } else {
  userName = process.argv[2];
  repoName = process.argv[3];
}

getRepoContributors(userName, repoName)

function getRepoContributors(repoOwner, repoName, cb) {

var requestOptions = {
  url: endPoint +'repos/' + userName + '/' + repoName + '/contributors',
  headers: {
  'User-Agent': 'request',
  },
  'auth':{
    'bearer': auth_token
  },
  json: true
  };


request.get( requestOptions, function(err, response, body){
    if(err){ throw err }

    fs.access('./avatars', function (err) {
    if(err) {
      console.log('Creating directory for avatars...');
      fs.mkdir('./avatars');
        }

    for(var i in body){
      dlImageByURL(body[i].avatar_url, './avatars/' + body[i].login + '.png')
      console.log('Got avatar from ' + body[i].login)
      }
    });
  });
}

function dlImageByURL(url, filePath, err) {
  if(err) throw err;
  request.get(url).pipe(fs.createWriteStream(filePath));
}
