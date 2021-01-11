const http = require('http');
const url = require('url');
const querstring = require('querystring');

const hostname = '127.0.0.1';

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://admin:123456@127.0.0.1:27017/admin';


/*储存学生答题答案*/
http.createServer((req,res)=> {
    var arr = [];
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
        var name = obj.username;
        var anwsers = JSON.parse(obj.anwser);
        //console.log(anwsers);
        var object = {};
        object.username = name;
        object.anwser = anwsers;
        //console.log(object);
        arr.push(object);
        //console.log(arr);

        MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            console.log('数据库已经连接');
            var dbase = db.db('studentsystem');

            var whereStr = {username:obj.username};
            var updateStr = {$set:{status:'true'}};
            dbase.collection('userinfo').updateOne(whereStr,updateStr,function (err,res) {
                if(err) throw err;
                console.log('文档更新成功');
                db.close();
            });
        });
        MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            console.log('数据库已经连接');
            var dbase = db.db('studentsystem');

            dbase.collection('anwserlist').insertMany(arr,function (err,res) {
                if(err) throw err;
                console.log(res);
                db.close();
            });

        })

    });
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
}).listen(3030);