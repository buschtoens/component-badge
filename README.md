# component badge [![Build Status](https://secure.travis-ci.org/silvinci/component-badge.png?branch=master)](https://travis-ci.org/silvinci/component-badge)

Based on @timoxley's idea and made for @ForbesLindesay's website

`npm install component-badge`

---

`badge([count, [options]])` returns a String representing a SVG image.  
`count` is the number shown under the logo ("1337 available"). If left out the subline comletely vanishes.  
`options` is an object that takes these params including their default values.
- `scale: 1`
- `background: "none"`
- `subtitle: "#939393"`
- `title: "#000000"`
- `circle: "#353535"`
- `leftAnnulus: "#353535"`
- `rightAnnulus: "#939393"`

`badge.load(path)` loads a new template.  
`path` is the path to the template to be loaded.

```javascript
var badge = require("component-badge");

console.log(badge(1337, 1.5)); // <svg width="720px" height="180px">...

badge.load("./myNewLogo.svg");
```

---

Fun Fact: The vector graphic was [generated by JavaScript](http://jsfiddle.net/silvinci/TDW89/).
