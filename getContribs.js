// This file does the heavy lifting
// It contains the functions that interact with the web

var request = require('request');
var fs = require('fs');
const apiRoot = 'https://api.github.com';

var faveRepos = [];

module.exports =
{
// If there are no errors in accessing api, return true
  validate: function (options) {
    request.get(options, function (err, response, body) {
      if(err) {  console.log(err); return false; }

      if(body.message == 'Not Found') {
        console.log("ERROR: Could not find repo on GitHub\
        \nPlease double-check your repository's details."); process.exit(1);
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


  recommendRepos: function(options, findMax, setMax, outputTextFile) {
    var faves = []
    request.get(options, function (err, response, body) {
      if(err) { return false; }
      for(var i in body){
        options.url = 'https://api.github.com/users/' + body[i].login + '/starred';

        request.get(options, function (err, response, body)
        {
          var ws = fs.createWriteStream('./test.txt');
          for(var j in body){
            faves.push(body[j].full_name);
            }
          (findMax(faves, 5));
            fs.writeFile('./text/text.js', findMax(faves, 5));
            outputTextFile();
        }); // end request.get
      }
    });
  console.log(faveRepos);
  findMax(faves);
  return faves;
  }
};


