/**
 * Created by mao on 13-11-6.
 */
var mq = require("mysql");

exports.save = function (user) {
    var mc = mq.createConnection({
        host: "42.121.31.110",
        user: "root",
        password: "73747521hzq"
    });
    mc.connect();
    mc.query("use phono");
    mc.query("insert user_info set nick='" + user.name + "',password='" + user.password + "'", function (err, rs, fields) {
        mc.end();
    });
};

exports.getUserByNick = function (username, callback) {
    var mc = mq.createConnection({
        host: "42.121.31.110",
        user: "root",
        password: "73747521hzq"
    });
    mc.connect();
    mc.query("use phono");
    mc.query("select * from user_info where nick='" + username + "'", function (err, rs, fields) {
        callback(err, rs);
        mc.end();
    });
};