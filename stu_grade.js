const http = require('http');
const url = require('url');
const querstring = require('querystring');

const hostname = '127.0.0.1';

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://admin:123456@127.0.0.1:27017/admin';

/*传入学生成绩*/
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
        //console.log(obj);

        MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            console.log('数据库已经连接');
            var dbase = db.db('studentsystem');

            var whereStr = {username:obj.username};
            var updateStr = {$set:{grade:obj.grade}};
            dbase.collection('userinfo').updateOne(whereStr,updateStr,function (err,results) {
                if(err) throw err;
                console.log('更新文档成功');
                db.close();
            })
        });

    });
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
}).listen(3060);