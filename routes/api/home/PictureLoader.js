/**
 * Created by Garry King  on 13-12-12.
 */
var PicManager = require('../../../models/manager/PicManager');
var MAX_SIZE = 40;
exports.loadPictures = function (req, res) {
    var start = req.query.start;
    var size = req.query.size;
    if (start === undefined || start=="undefined" ||  start <= 0)
        start = 0;
    if (size === undefined || size=="undefined" || size <= 0 || size > MAX_SIZE)
        size = MAX_SIZE;
    PicManager.loadAllPictures(start, size, function (rs) {
        var result = "";
        if (rs != undefined && rs != null && rs.length > 0)
            result = JSON.stringify(rs);
        res.end(result);
    })
};