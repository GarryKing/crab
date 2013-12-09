/**
 * ===================================
 * Module dependencies
 * ===================================
 */
var partials = require('express-partials');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');

/**
 * ===================================
 *  logs
 * ===================================
 */
var accessLogfile = fs.createWriteStream('logs/access/access.log', {flags: 'a'});
var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' }, //控制台输出
        {
            type: 'file', //文件输出
            filename: 'logs/error/error.log',
            maxLogSize: 1024,
            backups:3,
            category: 'normal'
        }
    ]
});
logger = log4js.getLogger('normal');
logger.setLevel('INFO');

/**
 * ===================================
 *  all environments
 * ===================================
 */
var app = express();
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views'); //视图文件的目录，存放模板文件
app.set('view engine', 'ejs');          //视图模板引擎
app.use(express.bodyParser());          //解析客户端请求，通常是通过 POST 发送的内容
app.use(express.methodOverride());      //用于支持定制的 HTTP 方法
app.use(partials());                    //express的3.*版本不支持layout.ejs，用这个模块可以支持layout.ejs.
app.use(express.favicon(path.join(__dirname, 'public/img/favicon.ico')));
app.use(express.cookieParser());        //Cookie解析的中间件
app.use(express.session({               //提供会话支持
    secret: "maomao"
}));
app.use(routes(app));                   //是项目的路由支持  处理请求
app.use(express.logger({stream: accessLogfile}));
app.use(log4js.connectLogger(logger, {level: 'auto', format:':method :url'}));
app.use(express.static(path.join(__dirname, 'public')));     //提供了静态文件支持
app.use(express.logger('dev'));       //todo

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}



/**
 * ===================================
 *  启动服务器
 * ===================================
 */
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
