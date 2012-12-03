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
	describe('with scale of 2 and #FF0072 background and #404040 subtitle', function () {
		it('includes a scale of 2 has a #FF0072 background and a #404040 subtitle', function () {
			badge(500, { scale: 2, background: "#FF0072", subtitle: "#404040" }).should.equal(fixture("options.svg"));
		});
	});
});