var fs         = require('fs');
var file       = __dirname + '/../prtrello.json';
var BLANK_DATA = {
  appKey: "31bf1b83dbdaeb38fe6a7b29ef9132de",
  github: {
    username: false,
    password :false
  },

  trello:{
    token :false
  },

  temp: {
    repository: 'wobotinc/hpb',
    taskId: '123456'
  }
};

module.exports = {
  readConfig: function() {
    var content = fs.readFileSync(file, 'utf8');
    return JSON.parse(content);
  },

  saveData: function (data, cb) {
    fs.writeFileSync(file, JSON.stringify(data));
    cb();
  },

  reset: function () {
    fs.writeFileSync(file, JSON.stringify(BLANK_DATA));
  }
}
