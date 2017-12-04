var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var url = 'mongodb://localhost:27500/github';

mongoose.connect(url, {
  useMongoClient: true
});

var repository_doc = {
  no_of_commits: Number,
  last_commit: String,
  repository_url: String,
}
var rep_schema = new mongoose.Schema(repository_doc);

var git_doc = {
  user: String,
  repositories:[rep_schema]
}

// repository_doc: rep_schema
var git_schema = new mongoose.Schema(git_doc)

var git_schema = new mongoose.Schema(git_doc);
var Gituser = mongoose.model('git_user', git_schema);

module.exports =