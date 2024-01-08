const db = require('./db')
const express = require('express')
var router = express.Router()
//列表
const awardLists = (req, res) => {
    const sqlStr = "select * from stu_award"
    db.query(sqlStr, [], (results,fields) => {
        res.send({ code: 1, msg: "正常", data: results })
    })
}
// 新增
const awardAdd = (req, res) =>{
    var {school,college,speciality,grade,student_id,full_name,award_time,activity,encourage,Instructor,org,desc} = req.body
    const sqlStr = "insert into stu_award(school,college,speciality,grade,student_id,full_name,award_time,activity,encourage,Instructor,org,award_desc) values(?,?,?,?,?,?,?,?,?,?,?,?)"
    db.query(sqlStr, [school,college,speciality,grade,student_id,full_name,award_time,activity,encourage,Instructor,org,desc], (results,fields) => {
        if (results.affectedRows === 1) {
        	res.send({ code: 1, msg: "添加完成" })
        } else {
        	res.send({ code: 0, msg: "添加失败" })
        }
    })
}

const awardEdit = (req, res) =>{
    var {school,college,speciality,grade,student_id,full_name,award_time,activity,encourage,Instructor,org,desc,id} = req.body
    const sqlStr = "UPDATE stu_award set school = ?,college = ?,speciality = ?,grade = ?,student_id = ?,full_name = ?,award_time = ?,activity = ?,encourage = ?,Instructor = ?,org = ?,award_desc = ? WHERE id=?"
    db.query(sqlStr, [school,college,speciality,grade,student_id,full_name,award_time,activity,encourage,Instructor,org,desc,id], (results,fields) => {
        if (results.affectedRows === 1) {
        	res.send({ code: 1, msg: "修改完成" })
        } else {
        	res.send({ code: 0, msg: "修改失败" })
        }
    })
}
//删除
const awardDel = (req, res) =>{
    var id = req.query.id
    const sqlStr = "DELETE FROM stu_award WHERE id=?"
    db.query(sqlStr, [id], (results,fields) => {
        if (results.affectedRows === 1) {
        	res.send({ code: 1, msg: "删除完成" })
        } else {
        	res.send({ code: 0, msg: "删除失败" })
        }
    })
}

router.get('/lists',awardLists)
router.post('/add',awardAdd)
router.post('/edit',awardEdit)
router.delete('/del',awardDel)

module.exports = router