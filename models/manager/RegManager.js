/**
 * Created by mao on 13-11-6.
 */

var UserDO = require('../dataobject/UserDO');
var UserDAO = require('../dao/UserDAO');

exports.register = function (nick, psd, psdRepeat, callback) {
    if (psd != psdRepeat) {
        callback(1);
        return;
    }
    UserDAO.getUserByNick(nick, function (err, rs) {
        if (rs != undefined && rs != null && rs.length > 0)
            callback(2);
        else {
            UserDAO.save(UserDO.createUser(nick, psd));
            callback(0);
        }
    })
}
