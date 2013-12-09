/**
 * Created by mao on 13-12-3.
 */

var PicManager = require('../models/manager/PicManager');

exports.loadPictures = function (req, res) {
    PicManager.loadAllPictures(function (rs) {
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
