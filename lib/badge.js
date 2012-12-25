// module dependencies
var fs = require("fs")
	, path = require("path")
	, Template = require("./template");

// expose logo generator
module.exports = badge;

// expose source loading method
module.exports.load = load;

// cache the logo template
var logo;
load(path.join(__dirname, "..", "resources", "logo-template.svg"));

// change the source
function load(path) {
	logo = new Template(fs.readFileSync(path, "utf8").replace(/\r/g, ''));
}

// render a badge
function badge(count, options) {
	var baseWidth = 480
		, baseHeight = 120
		, options = options || {};#
	
	options.subtitle = count ? count + " available" : "";

	if(options.subtitlePos == "right") {
		options.subtitleX = 470;
		options.subtitleY = 77.5;
		options.subtitleAnchor = "start";
		baseWidth = 700;
	}

	if(options.scale) {
		options.width = baseWidth * options.scale;
		options.height = baseHeight * options.scale;
	}

	return logo.render(options);
}