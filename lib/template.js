// expose methods
module.exports = exports = Template;

// Template object
function Template(rawTemplate) {
	if(!(this instanceof Template)) return new Template(rawTemplate);

	this.parse(rawTemplate);
}

// pre-parse the template for faster variable replacement
function parse(template) {
	var strings = []
		, variables = []
		, match = template.match(/([^]*?)\$\{(\w+)\}([^]*)/im); // Lorem ${myVar} ipsum...

	if(match && match.length >= 3) {
		strings.push(match[1]);
		variables.push(match[2]);

		if(match[3]) {
			var parsed = parse(match[3]);
			strings = strings.concat(parsed.strings);
			variables = variables.concat(parsed.variables);
		}
	} else {
		strings.push(template);
	}

	return { strings: strings, variables: variables };
}
Template.prototype.parse = function(rawTemplate) {
	var parsed = parse(rawTemplate);
	this.strings = parsed.strings;
	this.variables = parsed.variables;
};

// render a template object with the given variables
Template.prototype.render = function render(variables) {
	var rendered = "";

	this.strings.forEach(function(string, index) {
		rendered += string;
		if(variables[this.variables[index]]) rendered += variables[this.variables[index]];
	}, this);

	return rendered;
};

// This doesn't work, when the template starts with a variable.