/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
// var db = Promise.promisifyAll('./');
var promiseConstructor = require('./promiseConstructor');
var promisification = require('./promisification');
var methods = Promise.promisifyAll([promiseConstructor, promisification]);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO

  var writeToFile = (data) => {
    return new Promise(function(resolve, reject) {
      fs.writeFile(writeFilePath, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  var errorHandler = (err) => {
    if (err) {
      throw new Error(err);
    }
  };

  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then(promisification.getGitHubProfileAsync)
    .then(writeToFile)
    .catch(errorHandler);

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
