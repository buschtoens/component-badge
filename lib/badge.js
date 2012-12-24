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
		, baseHeight = 120;

	options = options || {};
	options.scale = options.scale || 1;
	options.background = options.background || "none";
	options.subtitle = options.subtitle || "#939393";
	options.title = options.title || "#000000";
	options.circle = options.circle || "#353535";
	options.leftAnnulus = options.leftAnnulus || "#353535";
	options.rightAnnulus = options.rightAnnulus || "#939393";

	switch(options.subtitlePos) {
		case "right":
			console.log("lol")
			options.subtitleX = 470;
			options.subtitleY = 77.5;
			options.subtitleAnchor = "start";
			options.subtitleAnchor = "start";
			baseWidth = 700;
			break;
		case "bottom":
		default:
			options.subtitleX = 460;
			options.subtitleY = 115;
			options.subtitleAnchor = "end";
			break;
	}

	return logo.render({
			subtitle: count ? count + " available" : ""
		, scale: options.scale
		, width: baseWidth * options.scale
		, height: baseHeight * options.scale
		, backgroundFill: options.background
		, subtitleFill: options.subtitle
		, titleFill: options.title
		, circleFill: options.circle
		, leftAnnulusFill: options.leftAnnulus
		, rightAnnulusFill: options.rightAnnulus
		, subtitleX: options.subtitleX
		, subtitleY: options.subtitleY
		, subtitleAnchor: options.subtitleAnchor
		});
}