var express = require("express");
var path = require("path");
var server = require("./server/server.js");
var bodyParser = require('body-parser');

var api = express();

api.use(bodyParser.urlencoded({ extended: true }));

api.get('/api/issues', function (req, res) {
    let owner = req.query.owner;
    let repo = req.query.repo;
    if (req.query.link !== undefined) {
        let result = server.parseLink(req.query.link);
        owner = result.owner;
        repo = result.repo;
    }
    server.getIssues(owner, repo)
        .then(function (obj) {
            res.send(obj);
        });
});

api.listen(7778, function () {
    console.log("Started listening api on port", 7778);
});

// server.doRequest("/repos/facebook/react/issues", function (data) {
//     console.info(data);
// });