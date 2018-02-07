'use strict';
module.exports = function (req, res) {
    var songci;
    if (req.query.author) {
        var author = req.query.author;
        var list = req.jw.idx_songci_author[author];
        if (!list) {
            res.status(404).end();
            return;
        }
        var i = Math.round(list.length * Math.random());
        songci = list[i];
        if (!songci) {
            res.status(404).end();
            return;
        }
    } else {
        var i = Math.round(req.jw.songci.length * Math.random());
        songci = req.jw.songci[i];
    };
    var format = req.query.format;
    if (format && format === 'json') {
        res.setHeader('Content-Type', 'application/json');
        songci = JSON.stringify(songci);
    } else {
        songci.content = songci.content.replace(/　/g, '');
        songci.lines = songci.content.split("。");
        var lines = [];
        var width = 0;
        songci.lines.forEach(function (line) {
            if (line.length > width) {
                width = line.length;
            }
        });
        var line = songci.title;
        var len  = line.length / 2 + width / 2;
        while (line.length < len) { line = '  ' + line; };
        lines.push(line);
        var line = songci.author;
        var len  = line.length / 2 + width / 2;
        while (line.length < len) { line = '  ' + line; };
        lines.push(line);
        lines.push('');
        lines = lines.concat(songci.lines);
        songci = lines.join("\n\n");
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    }
    res.end(songci);
};
