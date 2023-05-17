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
    toPng: function (data, source) {
        if(source == "svg") {
            // TODO: render svg to png
        }
        if(source == "html") {
            // TODO: render html to png
        }
    },
    toSvg: function (data, source) {
        if(source == "svg") {
            return data;
        } else if(source == "html") {
            // * render HTML to svg??
        }
    },
    load: function (template) {
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
            this.toPng(data, template.source_type);
        } 
        if(template.render_type == "svg") {
            headers = "image/svg+xml";
            this.toSvg(data, template.source_type);
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