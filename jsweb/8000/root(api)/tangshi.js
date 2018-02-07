'use strict';
module.exports = function (req, res) {
    var tangshi;
    if (req.query.author) {
        var author = req.query.author;
        var list = req.jw.idx_tangshi_author[author];
        if (!list) {
            res.status(404).end();
            return;
        }
        var i = Math.round(list.length * Math.random());
        tangshi = list[i];
        if (!tangshi) {
            res.status(404).end();
            return;
        }
    } else {
        var i = Math.round(req.jw.qts.length * Math.random());
        tangshi = req.jw.qts[i]
    }
    var format = req.query.format;
    if (format === 'json') {
        res.setHeader('Content-Type', 'application/json');
        tangshi = JSON.stringify(tangshi);
    } else {
        var lines = [];
        var width = 0;
        tangshi.lines.forEach(function (line) {
            if (line.length > width) {
                width = line.length;
            }
        });
        var line = tangshi.title;
        var len  = line.length / 2 + width / 2;
        while (line.length < len) { line = '  ' + line; };
        lines.push(line);
        var line = tangshi.author;
        var len  = line.length / 2 + width / 2;
        while (line.length < len) { line = '  ' + line; };
        lines.push(line);
        lines.push('');
        lines = lines.concat(tangshi.lines);
        tangshi = lines.join("\n");
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    }
    res.end(tangshi);
};
