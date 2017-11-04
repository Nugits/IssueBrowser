function Server() {
    const https = require('https');

    function doRequest(url, callback) {
        let path = getPath(url);
        let body = [];
        https.get({
            host: "api.github.com",
            path: path,
            headers: {
                'User-Agent': 'request'
            }
        },
            function (res) {
                res.setEncoding('utf8');
                let strobj = '';
                res.on('data', function (chunk) {
                    strobj += chunk;
                }).on('end', function () {
                    callback(JSON.parse(strobj));
                });
            });
    }

    function getIssues(url) { }

    //url can be object then skip
    //url can contains host or not
    //EXAMPLES:
    //1. "https://api.github.com/repos/facebook/react/issues"
    //     '/repos/facebook/react/issues'
    //2. "/repos/facebook/react/issues"
    //     /repos/facebook/react/issues
    function getPath(url) {
    }

    return { doRequest: doRequest };
}
module.exports = Server();