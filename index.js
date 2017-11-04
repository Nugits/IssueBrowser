var express = require("express");
var path = require("path");
var server = require("./server/server.js");

// var app = express();
// app.use(express.static(path.join(__dirname, "dist")));
// app.listen(7777, function () {
//     console.log("Started listening application on port", 7777);
// });

server.doRequest("/repos/facebook/react/issues", function (data) {
    console.info(data);
});