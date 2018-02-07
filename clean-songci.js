var src = require("./songci-src.json");

var dst = [];
for (var key in src) {
	dst = dst.concat(src[key]);
}
console.log(JSON.stringify(dst, null, 4));
