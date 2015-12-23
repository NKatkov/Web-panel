var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser')
    app = module.exports = express();
    mongoStore = require('connect-mongodb'),
    favicon = require("serve-favicon"),
    Settings = { development: {}, test: {}, production: {} };



var staticSiteOptions = {
   portnum: 80, // слушать порт 80
   maxAge: 1000 * 60 * 15 // хранить страницы в кэше пятнадцать минут
};

function mongoStoreConnectionArgs() {
  return { dbname: "Web",
           host: "127.0.0.1",
           port: "27017",
           username: "admin",
           password: "do5ita" };
}


  app.set('views', __dirname + '/views');
  //app.use(favicon(options.favicon));
  app.use(bodyParser());
  app.use(express.cookie-parser());
  app.use(express.session({store: mongoStore(mongoStoreConnectionArgs())}));
  app.use(express.logger({ format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }))
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'static'),staticSiteOptions)).listen(staticSiteOptions.portnum);

