/**
 * Created by mao on 13-12-3.
 */

exports.login = function (req, res) {
    res.render('login', {
        title: '用户登入',
        name: ''
    });
};

exports.doLogin = function (req, res) {
    req.session.user = req.body.username;
    res.render('login', {
        title: '登入成功',
        name: req.session.user
    });

};

exports.logout = function (req, res) {
    res.render('logout', {
        title: '已经登录',
        name: req.session.user == undefined ? '' : req.session.user
    });
};