const db = require('./db')
const express = require('express')
var router = express.Router()

//列表
const examineLists = (req, res) => {
    const sqlStr = "select * from stu_examine"
    db.query(sqlStr, [], (results,fields) => {
        res.send({ code: 1, msg: "正常", data: results })
    })
}
//修改状态
const editExamine = (req, res) =>{
    var { id, edit_type } = req.body
    const sqlStr = "UPDATE stu_examine set examine_status = ? WHERE id=?"
    db.query(sqlStr, [edit_type,id], (results,fields) => {
        if (results.affectedRows === 1) {
        	res.send({ code: 1, msg: "修改完成" })
        } else {
        	res.send({ code: 0, msg: "修改失败" })
        }
    })
}
//删除
const examineDel = (req, res) =>{
    var id = req.query.id
    const sqlStr = "DELETE FROM stu_examine WHERE id=?"
    db.query(sqlStr, [id], (results,fields) => {
        if (results.affectedRows === 1) {
        	res.send({ code: 1, msg: "删除完成" })
        } else {
        	res.send({ code: 0, msg: "删除失败" })
        }
    })
}

router.get('/query',examineLists)
router.post('/edit',editExamine)
router.delete('/del',examineDel)

module.exports = router