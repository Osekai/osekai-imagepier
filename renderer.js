const { convert } = require('convert-svg-to-png');

module.exports = {
    toPng: async function (data, source) {
        if (source == "svg") {
            return await convert(data);
            // TODO: render svg to png
        }
        if (source == "html") {
            // TODO: render html to png
        }
    },
    toSvg: async function (data, source) {
        if (source == "svg") {
            return data;
        } else if (source == "html") {
            // * render HTML to svg??
        }
    }
}