// This file does the heavy lifting
// Given a repo, it extracts the location of each avatar
// Then downloads an image from the appropriate url

var auth_token = process.env.AUTH_TOKEN;
var request = require('request');
var fs = require('fs');
var main = require('./main')
const apiRoot = 'https://api.github.com';


module.exports = {

// If there are no errors in accessing api, return true
  validate: function(requestOptions) {
    if( request.get(requestOptions, function (err, response, body) {
      if(err) { console.log(err); return false; }
      else { return true; }
    }) )
      return true;
      else return false;
  },

  getRepoContributors: function(options, cb) {
   var success = request.get(options, function(err, response, body){
      if(err) { return false; }
      // If folder named avatars does not exist, create it
      fs.access('./avatars', function (err) {
      if(err) {
        console.log('Creating directory for avatars...');
        fs.mkdir('./avatars');
      }
      for(var i in body){
        request.get(body[i].avatar_url).pipe(fs.createWriteStream('./avatars/' + body[i].login + '.png'));
        console.log('\tGot avatar from ' + body[i].login)
        }
      });
    });
  return true;
  },
};
