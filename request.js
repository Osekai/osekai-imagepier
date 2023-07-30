const https = require('https');

module.exports = {
    httpsPost: function ({ body, ...options }) {
        return new Promise((resolve, reject) => {
            const req = https.request({
                method: 'POST',
                ...options,
            }, res => {
                var string = "";
                res.on('data', data => string = string + data)
                res.on('end', () => {
                    resolve(string)
                })
            })
            req.on('error', reject);
            if (body) {
                req.write(body);
            }
            req.end();
        })
    }
}