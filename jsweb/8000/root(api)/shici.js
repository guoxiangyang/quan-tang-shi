'use strict';
module.exports = function (req, res) {
    var result, i, type;
    if (Math.random() > 0.5) {
        type='songci';
        i = Math.round(req.jw.songci.length * Math.random());
        result = req.jw.songci[i];
    } else {
        type='tangshi';
        i = Math.round(req.jw.qts.length * Math.random());
        result = req.jw.qts[i]
    }
    var format = req.query.format;
    if (format && format === 'json') {
        res.setHeader('Content-Type', 'application/json');
        result = JSON.stringify(result);
    } else if (type == 'songci') {
        result.content = result.content.replace(/　/g, '');
        result.lines = result.content.split("。");
        var lines = [];
        var width = 0;
        result.lines.forEach(function (line) {
            if (line.length > width) {
                width = line.length;
            }
        });
        var line = result.title;
        var len  = line.length / 2 + width / 2;
        while (line.length < len) { line = '  ' + line; };
        lines.push(line);
        var line = result.author;
        var len  = line.length / 2 + width / 2;
        while (line.length < len) { line = '  ' + line; };
        lines.push(line);
        lines.push('');
        lines = lines.concat(result.lines);
        result = lines.join("\n\n");
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    } else if (type == 'tangshi') {
        var lines = [];
        var width = 0;
        result.lines.forEach(function (line) {
            if (line.length > width) {
                width = line.length;
            }
        });
        var line = result.title;
        var len  = line.length / 2 + width / 2;
        while (line.length < len) { line = '  ' + line; };
        lines.push(line);
        var line = result.author;
        var len  = line.length / 2 + width / 2;
        while (line.length < len) { line = '  ' + line; };
        lines.push(line);
        lines.push('');
        lines = lines.concat(result.lines);
        result = lines.join("\n");
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    }
    res.end(result);
};
