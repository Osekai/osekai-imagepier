const { convert } = require('convert-svg-to-png');
const nodeHtmlToImage = require('node-html-to-image')
var wkhtmltoimage = require('wkhtmltoimage');

module.exports = {
    toPng: async function (data, source) {
        if (source == "svg") {
            return await convert(data);
        }
        if (source == "html_old") {
            const image = await nodeHtmlToImage({
                html: data
            });
            return image;
        }
        if (source == "html") {
            // ! DOES NOT WORK
            wkhtmltoimage.generate(data, function (code, signal) {
                console.log(code);
                console.log(signal);
                return signal;
            });
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