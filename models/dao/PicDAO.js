/**
 * Created by mao on 13-11-6.
 */
var mq = require("mysql");

exports.queryAllPictures = function (callback) {
    var mc = mq.createConnection({
        host: "42.121.31.110",
        user: "root",
        password: "73747521hzq"
    });
    mc.connect();
    mc.query("use phono");
    mc.query("select * from picture_0000", function (err, rs, fields) {
        callback(err, rs);
        mc.end();
    });
};