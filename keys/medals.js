const https = require('https');
const request = require("../request")
module.exports = {
    data: null,
    loadData: async function () {
        if (this.data == null) {
            var response = await request.httpsPost({
                hostname: 'osekai.net',
                path: `/medals/api/medals.php`,
                body: "strSearch=",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
            })
            this.data = JSON.parse(response);
        }
    },
    getMedalFromId: function (id) {
        for (const [key, value] of Object.entries(this.data)) {
                if (value.MedalID == id) {
                    return value;
                }
            
        }
    },
    keys: {
        "medalName": {
            grab: async function (id) {
                await module.exports.loadData();
                return module.exports.getMedalFromId(id).Name;
            }
        },
        "medalDescription": {
            grab: async function (id) {
                await module.exports.loadData();
                return module.exports.getMedalFromId(id).Description;
            }
        },
        "medalHint": {
            grab: async function (id) {
                await module.exports.loadData();
                return module.exports.getMedalFromId(id).Instructions;
            }
        },
        "medalSolution": {
            grab: async function (id) {
                await module.exports.loadData();
                return module.exports.getMedalFromId(id).Solution;
            }
        }
    }
};