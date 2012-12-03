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
	options = options || {};
	options.scale = options.scale || 1;
	options.background = options.background || "none";
	options.subtitle = options.subtitle || "#939393";

	return logo.render({
			subtitle: count ? count + " available" : ""
		, scale: options.scale
		, width: 480 * options.scale
		, height: 120 * options.scale
		, backgroundFill: options.background
		, subtitleFill: options.subtitle
		});
}

console.log(badge(1337));