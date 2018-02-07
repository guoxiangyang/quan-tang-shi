'use strict';
module.exports = function (jw, next) {
    jw.qts = require("../../../qts.json");
    jw.songci = require("../../../songci.json");
    console.log('Generate index ...');
    jw.idx_shici_author = {};
    jw.idx_tangshi_author = {};
    jw.idx_songci_author = {};
    var shici_author_cnt = 0;
    var tangshi_author_cnt = 0;
    var songci_author_cnt = 0;
    for (var i = 0; i < jw.qts.length; i++) {
        var tangshi = jw.qts[i];
        var author  = tangshi.author;
        if (!jw.idx_shici_author[author]) {
            jw.idx_shici_author[author] = [];
            shici_author_cnt++;
        }
        jw.idx_shici_author[author].push(tangshi);
        if (!jw.idx_tangshi_author[author]) {
            jw.idx_tangshi_author[author] = [];
            tangshi_author_cnt++
        }
        jw.idx_tangshi_author[author].push(tangshi);
    }
    for (var i = 0; i < jw.songci.length; i++) {
        var songci = jw.songci[i];
        var author  = songci.author;
        if (!jw.idx_shici_author[author]) {
            jw.idx_shici_author[author] = [];
            shici_author_cnt++;
        }
        jw.idx_shici_author[author].push(songci);
        if (!jw.idx_songci_author[author]) {
            jw.idx_songci_author[author] = [];
            songci_author_cnt++;
        }
        jw.idx_songci_author[author].push(songci);
    }
    
    console.log('Generate index done.');
    console.log("tangshi:", jw.qts.length);
    console.log("songci :", jw.songci.length);
    console.log("shici author index   :", shici_author_cnt);
    console.log("songci author index  :", songci_author_cnt);
    console.log("tangshi author index :", tangshi_author_cnt);
    next();
};
