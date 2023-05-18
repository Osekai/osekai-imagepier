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
    load: async function (template, id) {
        if(this.keys.length == 0) {
            this.initKeys();
        }

        var template = this.templates.templates[template];
        var data = fs.readFileSync("./templates/" + template.file, 'utf8');
        var keys = data.matchAll(/\$\{(.*)\}/g);
        for (var key of keys) {
            key = key[1];
            console.log(key);
            if (!key.startsWith("${")) {
                console.log(key);
                for(var _eKey of this.keys) {
                    if(typeof(_eKey.keys[key]) != "undefined") {
                        console.log("running " + key)
                        data = data.replace("${" + key + "}", await _eKey.keys[key].grab(id))
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