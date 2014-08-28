var prompt = require('prompt');
var github = require('./github');
var trello = require('./trello');
var config = require('./config');

module.exports = {
  start: function () {
    github.credentials(function () {
      trello.credentials(function () {
        github.askRepository(function (repo) {
          console.log('Repository: ' + repo);

          trello.askID(function (taskID) {
            trello.getCardInfo(taskID, function (taskId) {
              console.log('Task ID: ' + taskId);
            });
          });
        });
      });
    });
  },

  reset: function () {
    config.reset();
  }
};

