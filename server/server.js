function Server() {
    const https = require('https');

    function doRequest(path, callback) {
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

    return { doRequest: doRequest };
}
module.exports = Server();