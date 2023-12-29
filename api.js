const db = require('./db.js')
const express = require('express')
var router = express.Router();
var multer = require(multer);
var datetime = require('silly-datetime');
var fs = require('fs');
var path = require('path');
var UUID = require('uuid')
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'static/public/uploads')
    },
    filename: function(req,file,cb){
        var str = file.originalname.split('.');
        cb(null,UUID.v1() + '.' + str[1]);
    }
})
var upload = multer({
    storage: storage
})

const jsonWrite = function(res,ret){
    if(typeof ret === 'undefined'){
        res.json({
            code: '1',
            msg: '操作失败'
        })
    } else{
        console.log('ret',ret);
        res.json(ret)
    }
};


router.post('/addUser',(req,res)=>{
    let params = req.body;
    db.query('select * from user where user_id=?',[params.id],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            if(result.length > 0){
                jsonWrite(res,{
                    code: -1,
                    msg: '该账号已注册'
                })
            }else{
                db.query("INSERT INTO user(user_id,user_nick,gender,password) VALUES(?,?,?,?)",[params.id,params.nick,params.gender,params.password],function(err,result){
                    if(err){
                        console.log(err);
                    }
                    if(result){
                        jsonWrite(res,{
                            code: 200,
                            msg: '注册用户成功!'
                        })
                    }
                })
            }
        }
    })
})