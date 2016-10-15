// This file does the heavy lifting
// It contains the functions that interact with the web

const request = require('request');
const fs = require('fs');
const apiRoot = 'https://api.github.com';

var faveRepos = [];

module.exports =
{

  validate: function (options) {
    request.get(options, function (err, response, body) {
      if(err) {  console.log(err); return false; }

      if(body.message == 'Not Found') {
        console.log("ERROR: Could not find repo on GitHub\
        \nPlease double-check your repository's details.");
        process.exit(1);
      }
    });
  },

  getContributorsAvatars: function (options, cb) {
   request.get(options, function (err, response, body) {
    if(err) { return false; }
      // If folder named avatars does not exist, create it
    fs.access('./avatars', function (err) {
      if(err) {
        console.log('Creating directory for avatars...');
        fs.mkdir('./avatars');
      }
      console.log("Extracting from " + options.url + "...")
      for(var i in body) {
        request.get(body[i].avatar_url).pipe(fs.createWriteStream('./avatars/' + body[i].login + '.png'));
        console.log('\tGot avatar from ' + body[i].login);
        }
        cb("Done!");
      });
    });
  },
};
