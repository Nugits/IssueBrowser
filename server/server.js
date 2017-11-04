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
        if(typeof url == "object"){
            if(url.path != undefined){
                return url.path;
            } else {
                console.error("url.path is undefined\n");
                return;
            }
        } else if(typeof url == "string") {
            var index = url.indexOf("https://api.github.com");
            if(index == -1){
                return url;
            } else {
                var output = url.substring(index + 22);
                return output;
            }
        }
    }

    return { doRequest: doRequest, getPath: getPath };
}
module.exports = Server();