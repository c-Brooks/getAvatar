// This file does the heavy lifting
// Given a repo, it extracts the location of each avatar
// Then downloads an image from the appropriate url

var auth_token = process.env.AUTH_TOKEN;
var request = require('request');
var fs = require('fs');
var main = require('./main')
const apiRoot = 'https://api.github.com';


module.exports = {

  getRepoContributors: function(repoOwner, repoName, cb) {

var requestOptions = {
    url: apiRoot + '/repos/' + repoOwner+ '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      },
    'auth':{
      'bearer': auth_token
      },
    json: true
    };

    request.get(requestOptions, function(err, response, body){
      if(err) { throw err; }

      fs.access('./avatars', function (err) {
      if(err) {
        console.log('Creating directory for avatars...');
        fs.mkdir('./avatars');
      }
      for(var i in body){
        request.get(body[i].avatar_url).pipe(fs.createWriteStream('./avatars/' + body[i].login + '.png'));
        console.log('Got avatar from ' + body[i].login)
        }
      });
    });
  }
};
