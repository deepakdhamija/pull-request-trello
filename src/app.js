var github = require('./github');
var trello = require('./trello');
var config = require('./config');

module.exports = {
  start: function () {
    github.credentials(function () {
      trello.credentials(function () {
        console.log('SHOW');
      });
    });
  },

  reset: function () {
    config.reset();
  }
};
