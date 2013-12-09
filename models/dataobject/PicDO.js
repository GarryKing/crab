/**
 * Created by mao on 13-11-6.
 */

exports.createPic = function (picId, sourceUrl, description, gmtCreate, gmtModify) {
    var obj = new Object();
    obj.picId = picId;
    obj.sourceUrl = sourceUrl;
    obj.description = description;
    obj.gmtCreate = gmtCreate;
    obj.gmtModify = gmtModify;
    return obj;
};
