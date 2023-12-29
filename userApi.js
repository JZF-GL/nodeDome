const db = require('./db')
const express = require('express')
var router = express.Router()
router.get('/userList',(req,res,next)=>{
    db.query('select * from list',[], function(results,fields){
      res.json({results})
    })
})