const http = require('http');
const url = require('url');
const querstring = require('querystring');

const hostname = '127.0.0.1';

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://admin:123456@127.0.0.1:27017/admin';

/*老师查看学生试卷*/
http.createServer((req,res)=> {

    var obj = {};
    var post = '';

    req.on('data', function (chunk) {
        post += chunk;
    });
    req.on('end', function () {

        if (req.method == 'GET') {
            post = url.parse(req.url).query;
        }
        obj = (querstring.parse(post));

        MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            console.log('数据库已经连接');
            var dbase = db.db('studentsystem');

            dbase.collection('userinfo').find({}).toArray(function (err,result) {
                if(err) throw err;
                res.end(JSON.stringify(result));
                db.close();
            })

        });

    });
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
}).listen(3040);