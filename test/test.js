var assert = require('should');
var badge = require('../');
var fs = require('fs');
var path = require('path');

function fixture(name) {
	return fs.readFileSync(path.join(__dirname, "fixtures", name), "utf8").replace(/\r/g, '');
}

describe('rendering a badge', function () {
	describe('with 0 as the number of components', function () {
		it('omits the tag line', function () {
			badge(0).should.equal(fixture("0-components.svg"));
		});
	});
	describe('with 500 as the number of components', function () {
		it('includes a tag line', function () {
			badge(500).should.equal(fixture("500-components.svg"));
		});
	});
	describe('with scale of 2', function () {
		it('includes a scale of 2', function () {
			badge(500, { scale: 2 }).should.equal(fixture("scale-2.svg"));
		});
	});
	describe('with scale of 2 and custom colors', function () {
		it('includes a scale of 2 and has custom colors', function () {
			badge(500, 
				{ scale: 2
				, backgroundFill: "#FF0072"
				, subtitleFill: "#404040"
				, titleFill: "#FF0000"
				, circleFill: "#00FF00"
				, leftAnnulusFill: "#0000FF"
				, rightAnnulusFill: "#FFFF00"
				}
			).should.equal(fixture("options.svg"));
		});
	});
	describe('with custom positioning', function () {
		it('alters the position', function () {
			badge(500, { subtitlePos: "right" }).should.equal(fixture("positioning.svg"));
		});
	});
});