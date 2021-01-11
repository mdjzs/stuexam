const http = require('http');
const url = require('url');
const querstring = require('querystring');

const hostname = '127.0.0.1';

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://admin:123456@127.0.0.1:27017/admin';

/*登录*/
http.createServer((req,res)=> {

    var obj = {};
    var post = '';

    req.on('data', function (chunk) {
        post += chunk;
    });
    req.on('end', function () {
        var log;
        var logs='nostatus';
        if (req.method == 'GET') {
            post = url.parse(req.url).query;
        }
        obj = (querstring.parse(post));
        //console.log(obj);
        MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            console.log('数据库已经连接');
            var dbase = db.db('studentsystem');

            dbase.collection('userinfo').find({}).toArray(function (err,result) {
                if(err) throw err;
                result.forEach(function (t) {
                   if(obj.username==t.username&&obj.pwd==t.pwd&&obj.identity==t.identity) {
                       log = t.identity;
                       username = t.username;
                       if(t.status) {
                           logs = -1;
                           if(t.grade) {
                               logs = t.grade;
                           }

                       }
                   }
                });
                var info = {};
                info.log = log;
                info.logs = logs;
                res.end(JSON.stringify(info));
                db.close();
            })

        });

    });
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
}).listen(3010);