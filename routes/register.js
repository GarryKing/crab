/**
 * Created by mao on 13-12-3.
 */

var RegManager = require('../models/manager/RegManager');

exports.index = function (req, res) {
    res.render('index', { title: 'Express', layout: 'layout' });
};

exports.user = function (req, res) {
};

exports.post = function (req, res) {
};

exports.reg = function (req, res) {
    res.render('reg', {
        title: '用户注册',
        error: "",
        success: ""
    });
};

exports.doReg = function (req, res) {
    console.log(req.body);
    RegManager.register(req.body.username, req.body.password, req.body.passwordrepeat, function (rs) {
        var errorInfo = "";
        var successInfo = "注册成功";
        if (rs == 1) {
            errorInfo = "输入的两次密码不一样！";
            successInfo = "";
        } else if (rs == 2) {
            errorInfo = "用户名已存在！";
            successInfo = "";
        }
        res.render('reg', {
            title: '用户注册',
            error: errorInfo,
            success: successInfo
        });
    });
};

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