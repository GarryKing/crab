/*
 * GET home page.
 */

/**
 exports.index = function(req, res){
  res.render('index', { title: req.query.user , a: req.query.wo });//localhost:3000/?user=benben&wo=da
};

 exports.hello = function(req, res) {
  res.send('The time is ' + new Date().toString()); 
};

 exports.user = function (req, res) { 
  //res.send( req.params.username );
  res.render('index', { title: req.params.username+",,,,"+req.params.word });
}
 **/

var RegManager = require('../models/manager/RegManager');
var home = require('./home');
var register = require('./register');
var log = require('./log');

/**
 * ===================================
 *  api dependencies
 * ===================================
 */
var pictureLoader = require('./api/home/PictureLoader');
/*exports.index = function (req, res) {
 logger.error("aaaaa1111");
 throw new Error("hahaha,成功了！");
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
 };*/

module.exports = function (app) {
    app.get('/', home.index);
    app.get('/u/:user', home.user);
    app.post('/post', home.post);

    app.get('/reg', register.reg);

    app.post('/reg', checkNotLogin);
    app.post('/reg', register.doReg);

    app.get('/login', checkNotLogin);
    app.get('/login', log.login);

    app.post('/login', checkNotLogin);
    app.post('/login', log.doLogin);

    app.get('/logout', checkLogin);
    app.get('/logout', log.logout);


    //api mapping
    app.get('/api/home/loadPictures.crab', pictureLoader.loadPictures);

    return app.router;
};

function checkLogin(req, res, next) {
    if (!req.session.user) {
        //req.flash('error', '未登入');
        return  res.redirect('/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        //req.flash('error', '已登入');
        return res.redirect('/');
    }
    next();
}