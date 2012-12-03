// module dependencies
var fs = require("fs")
	, path = require("path")
	, Template = require("./template");

// expose logo generator
module.exports = badge;

// expose source changing method
module.exports.changeSource = changeSource;

// cache the logo template
var logo;
changeSource(path.join(__dirname, "..", "resources", "logo-template.svg"));

// change the source
function changeSource(path) {
	logo = new Template(fs.readFileSync(path, "utf8").replace(/\r/g, ''));
}

// render a badge
function badge(count, scale) {
	scale = scale || 1;

	return logo.render({
			subtitle: count ? count + " available" : ""
		, scale: scale
		, width: 480 * scale
		, height: 120 * scale
		});
}