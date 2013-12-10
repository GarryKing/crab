/**
 * Created by mao on 13-11-6.
 */

var PicDO = require('../dataobject/PicDO');
var PicDAO = require('../dao/PicDAO');

exports.loadAllPictures = function (start, size, callback) {
    PicDAO.queryAllPictures(start, size, function (err, rs) {
        if (rs != undefined && rs != null && rs.length > 0) {
            var result = new Array();
            for (var i = 0; i < rs.length; i++) {
                var data = rs[i];
                var tmp = PicDO.createPic(data.pic_id, data.source_url, data.descrption, data.gmt_create, data.gmt_modify);
                result.push(tmp);
            }
        }
        callback(result);
    })
}
