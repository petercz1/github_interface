var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var url = 'mongodb://localhost:27500/github';

mongoose.connect(url, {
  useMongoClient: true
});

var repository_doc = {
  no_of_commits: Number,
  last_commit: String
}
var git_doc = {
  user: String,
  repository_url: String,
  
}

var 

var git_schema = new mongoose.Schema(git_doc);
var Gituser = mongoose.model('git_user', git_schema);

module.exports =