// 引入express
const db = require('./db')
const express = require('express')
var router = express.Router()
const sm3 = require('sm3');

//这个组件用于接收post数据
var jwt = require("jsonwebtoken")
const userLogin = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    if (!username || !password) {
    	res.send({
    		code: 0,
    		msg: "用户名与密码为必传参数...",
    	})
    	return
    }
    const sqlStrselect = "select * from stu_user WHERE username=?"
    db.query(sqlStrselect, [username, password], (results,fields) => {
		if (results.length > 0) {
			const _password = sm3(`${password}${results[0].salt}`)
			if(_password === results[0].password){
				var token = jwt.sign(
					{
						identity: results[0].identity,
						username: results[0].username,
					},
					"secret",
					{ expiresIn: "1h" },
				)
				res.send({ code: 1, msg: "登录成功", token: token })
			}else{
				res.send({ code: 0, msg: "账号或密码错误" })
			}
		}else{
			res.send({ code: 0, msg: "账号或密码错误" })
		}
    })
    // const sqlStr = "select * from stu_user WHERE username=? AND password=?"
    // db.query(sqlStr, [username, password], (results,fields) => {
    //     if (results.length > 0) {
    //         const _password = sm3(`${password}${_random}`)
    //     	// 生成token
    //     	var token = jwt.sign(
    //     		{
    //     			identity: results[0].identity,
    //     			username: results[0].username,
    //     		},
    //     		"secret",
    //     		{ expiresIn: "1h" },
    //     	)
    //     	res.send({ code: 1, msg: "登录成功", token: token })
    //     	// 如果没有登录成功，则返回登录失败
    //     } else {
    //     	// 判断token
    //     	if (req.headers.authorization == undefined || req.headers.authorization == null) {
    //     		if (req.headers.authorization) {
    //     			var token = req.headers.authorization.split(" ")[1] // 获取token
    //     		}
    //     		jwt.verify(token, "secret", (err, decode) => {
    //     			if (err) {
    //     				res.send({ code: 0, msg: "登录失败" })
    //     			}
    //     		})
    //     	}
    //     }
    // })
}

const userRegister = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    if (!username || !password) {
    	res.send({
    		code: 0,
    		msg: `用户名与密码为必传参数...${username}-${password}`,
    	})
    	return
    }
    if (username && password) {
    	const result = `SELECT * FROM stu_user WHERE username = '${username}'`
    	db.query(result, [username], (results,fields) => {
            if (results.length >= 1) {
                res.send({ code: 0, msg: "注册失败，用户名重复" })
            } else {
                const _random =  String(Math.floor(Math.random() * 900000) + 100000);
                const _password = sm3(`${password}${_random}`)
                const sqlStr = "insert into stu_user(username,password,identity,salt) values(?,?,?,?)"
                db.query(sqlStr, [username, _password, '1', _random], (results,fields) => {
                    if (results.affectedRows === 1) {
                    	res.send({ code: 1, msg: "注册成功" })
                    } else {
                    	res.send({ code: 0, msg: "注册失败" })
                    }
                })
            }
    	})
    }
}

router.post('/login',userLogin)
router.post('/register',userRegister)

module.exports = router