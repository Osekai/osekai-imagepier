const fs = require('fs');

module.exports = {
    templates: require("./templates/templates.js"),
    keys: {
        "date": {
            grab: function () {
                return "awesome";
            }
        }
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
        var template = this.templates.templates[template];
        var data = fs.readFileSync("./templates/" + template.file, 'utf8');
        var keys = data.match(/\$\{(.*)\}/);
        for (var key of keys) {
            if (!key.startsWith("${")) {
                console.log(key);
                data = data.replace("${" + key + "}", this.keys[key].grab())
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