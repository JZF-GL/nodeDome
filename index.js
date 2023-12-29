// const userApi = require('./api')
// const userApi = require('./userApi')
const db = require('./db')
// const fs = require('fs');
// const path = require('path');
// const bodyParser = require('body-parser');

const express = require('express')
const app = express()
// var router = express.Router()
const port = 8879

//好像不能用的后端代理(还是前端代理解决)
// const { createProxyMiddleware } = require('http-proxy-middleware');  
// // 创建代理中间件  
// const proxy = createProxyMiddleware({  
//   target: `http://localhost:${port}`, // 后端服务地址  
//   changeOrigin: true, // 开启虚拟托管，模拟跨域请求  
// });   
// app.use('/api', proxy);

app.get('/api/user/userList', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  
  db.query('select * from stu_user',[], function(results,fields){
    res.json({results})
  })
})
// app.get('/api/user/addUser', (req, res) => {
//   db.query('select * from stu_user',[], function(results,fields){
//     res.json({results})
//   })
// })
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}));
// app.use('/api/user',userApi);
// app.get('/user/userList',userApi);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})