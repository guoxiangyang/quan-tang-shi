function get(s, d1, d2) {
    i = index(s, d1);
    j = index(s, d2);
    if (i == 0 || j == 0) { return ""; };
    result = substr(s, i + length(d1), j - i - length(d1));
    return result
}
BEGIN {
    title_line = 0;
    line = 0;
    vol = 0;
    ch  = 0;
    cnt = 0;
    title = "";
    author = "";
    print "[";
}
/^.*[0-9]_[0-9]/ {
    if (cnt == 0) {
        print "{"
    } else {
        print "]},{"
    }
    cnt++;
    title_line = NR;
    line = 0;
    vol = get($0, "卷", "_");
    ch  = get($0, "_", " 【");
    title  = get($0, "【", "】");
    author  = get($0, "】", "\r");
    gsub(/[ \t\n\r]/, "", title);
    gsub(/[ \t\r\n]/, "", author);
    print  "\"vol\":"""vol""",\"ch\":"""ch""",\"title\":\""""title"""\",\"author\":\""""author"""\",\n\"lines\":[\n"
}
/.*/ {
    if (cnt > 0 && NR != title_line) {
        s = $0
        if (line != 0) {
            print ","
        }
        gsub(/[ \t\r\n]/, "", s);
        print "\""""s"\""
        line++;
    }
}
END {
    print "]}]"
}
