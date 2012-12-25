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
		, match = template.match(/([^]*?)\$\{(\w+)(?:\:([^\}]+))?\}([^]*)/im); // Lorem ${myVar:default} ipsum...

	if(match) {
		// variable found, push variable and string
		strings.push(match[1]);
		variables.push({ name: match[2], def: match[3] });

		if(match[4]) {
			// there's stuff left, parse it too
			var parsed = parse(match[4]);
			strings = strings.concat(parsed.strings);
			variables = variables.concat(parsed.variables);
		}
	} else {
		// no variables left, push the residue to the strings
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
		if(this.variables[index]) rendered += variables[this.variables[index].name] || this.variables[index].def || "";
	}, this);

	return rendered;
};

// This doesn't work, when the template starts with a variable.