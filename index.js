
const db = require('./db')
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = 8879
const userApi = require('./stu_user_api')
const useFiles = require('./usefiles')
const awardApi = require('./awardApi')
const examineApi = require('./examineApi')

app.use((err, req, res, next) => {  
  // 自定义错误页面或响应  
  res.status(err.status || 500).send({  
    error: {  
      message: err.message,  
      stack: err.stack  
    }  
  });  
});  

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: "application/*+json" }))
app.all("*",function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');  
  res.setHeader('Access-Control-Allow-Methods', '*');  
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  
  // res.header("Content-Type", "application/json;charset=utf-8");
  next()
})
app.get('/api/user/userList', (req, res) => {
  
  db.query('select * from stu_user',[], function(results,fields){
    res.json({results})
  })
})

app.use('/api/user',userApi)

app.use('/api/files',useFiles)
app.use('/api/award',awardApi)
app.use('/api/examine',examineApi)
app.use('/assets',express.static('assets'));  
// app.use("/assets", express.static(__dirname));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})