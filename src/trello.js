var prompt      = require('prompt');
var config      = require('./config');
var credentials = config.readConfig();

module.exports = {
  credentials: function (cb) {
    if (credentials.trello.token) { return cb(); }

    console.log(' To setup your trello credentials you need to generate a TOKEN.'.warn);
    console.log('   1. Go to https://trello.com/1/authorize?key=' + credentials.app_key + '&name=prtrello&expiration=never&response_type=token'.warn);

    prompt.start();

    prompt.get(['token'], function (err, result) {
      credentials = config.readConfig();
      credentials.trello.token = result.token;
      config.saveData(credentials, function () {
        console.log('Trello credentials saved!'.info);
        console.log('##########################################'.green);
        console.log('Now, run prtrello again to start using this tool'.green);
        console.log('##########################################'.green);

        return cb();
      });
    });
  }
};
