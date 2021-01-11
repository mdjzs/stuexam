var MongoClient = require('mongodb').MongoClient;

var mongoUrl = 'mongodb://admin:123456@127.0.0.1:27017/admin';

MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    console.log('数据库已经创建');
    var dbase = db.db('studentsystem');

    /*var userinfo = [
        {_id:1,pwd:'123456',username:'lisi',identity:0},
        {_id:2,pwd:'123456',username:'root',identity:1},
        {_id:3,pwd:'123456',username:'lili',identity:0},
        {_id:4,pwd:'123456',username:'mike',identity:0}
    ];
    dbase.collection('userinfo').insertMany(userinfo,function (err,res) {
        if(err) throw err;
        console.log(res);
        db.close();
    })*/

    /*var questionlist = [
        {_id:1,question:'请问1+1等于多少?'},
        {_id:2,question:'请问2+2等于多少?'},
        {_id:3,question:'请问3+3等于多少?'},
        {_id:4,question:'请问4+4等于多少?'},
        {_id:5,question:'请问5+5等于多少?'}
    ];
    dbase.collection('questionlist').insertMany(questionlist,function (err,res) {
        if(err) throw err;
        console.log(res);
        db.close();
    })*/

    /*dbase.createCollection('anwserlist',function (err,res) {
        if(err) throw err;
        console.log('创建集合成功');
        db.close();
    })*/

});