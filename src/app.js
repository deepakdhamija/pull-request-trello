var prompt = require('prompt');
var github = require('./github');
var trello = require('./trello');
var config = require('./config');
var open   = require('open');

module.exports = {
  start: function () {
    github.credentials(function () {
      trello.credentials(function () {
        trello.askID(function (taskID) {
          trello.getCardInfo(taskID, function (card) {
            github.confirmPRDetails(card, function (pullRequest) {
              console.log('[Github]'.green + ': '.white + 'Opening Pull Request...'.warn);

              github.openPR(pullRequest, function (info) {
                console.log('##########################################################'.help);
                console.log('Pull Request Sent:' + info.url.green + ' shipit! :D'.silly)
                console.log('##########################################################'.help);

                open(info.url);
              });
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

