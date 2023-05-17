const fs = require('fs');

module.exports = {
    templates: require("./templates/templates.js"),
    keys: [],
    initKeys: function() {
        function load(req) {
            module.exports.keys.push(require(req));
        }
        load("./keys/medals");
    },
    renderer: require("./renderer"),
    load: async function (template) {
        if(this.keys.length == 0) {
            this.initKeys();
        }

        var template = this.templates.templates[template];
        var data = fs.readFileSync("./templates/" + template.file, 'utf8');
        var keys = data.match(/\$\{(.*)\}/);
        for (var key of keys) {
            if (!key.startsWith("${")) {
                for(var _eKey of this.keys) {
                    if(typeof(_eKey.keys[key]) != "undefined") {
                        data = data.replace("${" + key + "}", _eKey.keys[key].grab())
                    }
                }
            }
        }

        var headers = "";
        if(template.render_type == "png") {
            headers = "image/png";
            data = await this.renderer.toPng(data, template.source_type);
        } 
        if(template.render_type == "svg") {
            headers = "image/svg+xml";
            data = await this.renderer.toSvg(data, template.source_type);
        }

        return {
            "text": data,
            "headers": headers
        };
    },
    render: function (template) {
        load(template);
    }
};