var prompt = require('prompt');
var github = require('./github');
var trello = require('./trello');
var config = require('./config');

module.exports = {
  start: function () {
    github.credentials(function () {
      trello.credentials(function () {
        trello.askID(function (taskID) {
          trello.getCardInfo(taskID, function (taskId) {
            console.log(taskId);
          });
        });
      });
    });
  },

  reset: function () {
    config.reset();
  }
};

