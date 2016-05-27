var qts = require("./qts.json");
for (var i = 0; i < qts.length; i++) {
    var pome = qts[i];
    var lines = pome.lines
    for (var j = 0; j < lines.length; j++) {
        if (lines[j] === "") {
            lines.splice(j, lines.length - j);
            break;
        }
    }
}
console.log(JSON.stringify(qts, null, 4));
