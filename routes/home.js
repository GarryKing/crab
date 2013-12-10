/**
 * Created by mao on 13-12-3.
 */

var PicManager = require('../models/manager/PicManager');

exports.loadPictures = function (req, res) {
    var start = req.query.start;
    var size = req.query.size;
    //TODO 校验两个入参
    PicManager.loadAllPictures(start, size, function (rs) {
        var result = "";
        if (rs != undefined && rs != null && rs.length > 0)
            result = JSON.stringify(rs);
        res.end(result);
    })
};

exports.index = function (req, res) {
    res.render('index');
};

exports.user = function (req, res) {
};

exports.post = function (req, res) {
};
