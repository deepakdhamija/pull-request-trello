var prompt      = require('prompt');
var config      = require('./config');
var credentials = config.readConfig();
var sh          = require('execSync');

var Github = {
  credentials: function (cb) {
    if (credentials.github.username && credentials.github.password) {
      return cb();
    }

    console.log('Setup your github account:'.warn);

    var properties = [
      {
        name: 'username',
        required: true
      },
      {
        name: 'password',
        hidden: true,
        required: true
      }
    ];

    prompt.start();

    prompt.get(properties, function (err, result) {
      credentials.github.username = result.username;
      credentials.github.password = result.password;

      config.saveData(credentials, function () {
        console.log('Github credentials saved!'.info);

        return cb();
      });
    });
  },

  askRepository: function (cb) {
    var tempRepo = config.readConfig().temp.repository;
    var tempRepoText = '[' + tempRepo + ']';

    prompt.message = 'What is the repository name?';
    prompt.start();

    prompt.get({
      properties: {
        taskId: {
          description: tempRepoText.magenta
        }
      }
    }, function (err, result) {
      return cb((!result.taskId) ? tempRepo : result.taskId);
    });
  },

  confirmPRDetails: function (card, cb) {
    var title       = '[#' + card.shortLink + '] ' + card.name;
    var description = card.shortUrl;
    var comment = '';

    prompt.message = '[Github]'.green;
    prompt.start();

    prompt.get({
      properties: {
        repository: {
          description: 'Enter the repository name: '.green + '['.magenta + Github.getRepository().magenta + ']'.magenta
        },
        title: {
          description: 'Enter the title or use this: '.green + title.magenta
        },
        description: {
          description: 'Enter the description or use this: '.green + description.magenta
        },
        comment: {
          description: 'Do you have any extra comments? Leave blank for nothing'.green
        },
        branch: {
          description: 'Enter the branch name of your task: '.green + '['.magenta + Github.getBranchName().magenta + ']'.magenta
        },
        mergeBranch: {
          description: 'This pull-request should be merge into: '.green + '[master]'.magenta
        }
      }
    }, function (err, result) {
      var pullRequest = {
        repository:  (result.repository) ? result.repository : Github.getRepository(),
        title:       (result.title) ? result.title : title,
        description: (result.description) ? result.description : description,
        comment:     (result.comment) ? result.comment : comment,
        branch:      (result.branch) ? result.branch : Github.getBranchName(),
        mergeBranch: (result.mergeBranch) ? result.mergeBranch : 'master'
      }

      cb(pullRequest);
    });
  },

  openPR: function (pullRequest, cb) {
    cb();
  },

  getBranchName: function () {
    var branch = sh.exec('git rev-parse --abbrev-ref HEAD');

    return branch.stdout.toString().trim();
  },

  getRepository: function () {
    var branch  = sh.exec('git remote -v');
    var regex   = new RegExp("github.com:(.*)\.git");
    var matches = regex.exec(branch.stdout);

    return matches[1];
  }
}

module.exports = Github;
