
const express = require('express')
var router = express.Router()
const multer = require('multer'); // 导入Multer库，用于处理文件上传
var Jimp = require("jimp");
const XLSX = require('xlsx'); 
const path = require('path');
const db = require('./db');
const moment = require('moment');  
// const moment = require('moment-timezone');  

const useJimp = async (fp,host,w,h) => {
    const imageFilePath = path.join(__dirname, `/assets/uploads/${fp}`);
    var _FP = {
      y: '',
      n: ''
    }
    //读取图片
    let _image = await Jimp.read(imageFilePath)
    //读取时间戳
    // const timestamp = new Date().getTime();
    //图片处理
    await _image.quality(80).write(`assets/images/jimp_${fp}`)
    // .resize(256, 256)
    //输出地址
    _FP.y = `http://${host}/assets/uploads/${fp}`;
    _FP.n = `http://${host}/assets/images/jimp_${fp}`;
    return _FP
}

// const crypto = require('crypto'); // 导入加密模块
// const path = require('path')
// const fs = require('fs')
// 读取图片文件
// function readImageFile(filePath) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filePath, (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 console.log('文件------>',data)
//                 resolve(data);
//             }
//         });
//     });
// }
// // 加密函数
// function encryptData(data) {
//     console.log('待加密数据------------->', data)
//     const algorithm = 'aes-256-cbc';
//     const key = crypto.randomBytes(16).toString();
//     // 创建加密器并设置初始向量为空
//     const cipher = crypto.createCipheriv(algorithm, key, 32);
//     // let encrypted = cipher.update(data, 'utf8', 'hex'); 
//     // encrypted += cipher.final('hex'); 
    
//     let encryptedImageData = '';
//     cipher.on('data', (chunk) => {
//         encryptedImageData += chunk;
//     });
//     cipher.end(data);
//     console.log('加密数据------------->', encryptedImageData)
//     return encryptedImageData;
// }
// // 模拟的图片文件路径
// const imageFilePath = path.join(__dirname, 'uploads/Vector672555.jpg');
// console.log('imageFilePath---------->',imageFilePath)
// readImageFile(imageFilePath)
//     .then(data => encryptData(data))
//     .then(encryptedData => {
//         console.log(encryptedData);  // 输出加密后的数据
//         // 你可以将此数据发送给前端，或将其存储在数据库或其他地方。
//     })
//     .catch(err => console.error(err));





// 配置Multer，指定上传文件存储的目录和文件名生成策略
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'assets/uploads/') // 指定上传文件的存储目录
    },
    filename: (req, file, cb) => {
      req.setEncoding('utf-8')
      const _filename = Buffer.from(file.originalname,'latin1').toString('utf-8')
      const timestamp = new Date().getTime();
      const filename = `${timestamp}_${_filename}`;  
      cb(null, filename) // 指定上传文件的文件名生成策略，这里使用原始文件名
    }
});
  
// 配置Multer，指定上传文件的处理和验证规则
const upload = multer({ storage: storage });

const useUploads = async (req, res) => {
  // console.log(req.file)
    if (!req.file) {
      return res.status(400).send('upload错误');
    }

    //图片压缩走这里
    // let _a = await useJimp(req.file.filename,req.headers.host)
    // res.send({ code: 1, msg: "upload成功", data: _a });

    //正常上传
    res.send({ code: 1, msg: "upload成功", data: {
      path: `http://${req.headers.host}/${req.file.destination}/${req.file.filename}`
    }});
}

const execlModul = (req, res) => {  
  // 定义配置数据  
  const config = {  
    title: '导入模板',  
    data: [
      { "学校": "", "学院": "" ,"专业": "","年级": "","学号": "","姓名": "","获奖时间": "","比赛、活动名称": "","获奖名称": "","指导老师": "","主办单位、机构、部门": ""},
    ]  
  };  
  // const workbook = XLSX.utils.book_new();  
  // // {header:["学校", "学院","专业","年级","学号","姓名","获奖时间","比赛、活动名称","获奖名称","指导老师","主办单位、机构、部门"]}
  // const worksheet = XLSX.utils.json_to_sheet(config.data); 
  // // console.log(workbook)
  // XLSX.utils.book_append_sheet(workbook, worksheet, config.title);  
  // const filename = `${config.title}.xlsx`;  
  // const encodedFilename = encodeURIComponent(filename);  
  // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');  
  // res.setHeader('Content-Disposition', `attachment; filename="${encodedFilename}"`);
  // XLSX.writeFile(workbook,`assets/xlsx/${config.title}.xlsx`)

  //重定向到模板下载链接
  res.redirect(`http://${req.headers.host}/assets/xlsx/${config.title}.xlsx`);
  // res.send(workbook); 
  // res.send(`http://${host}/assets/xlsx/${config.title}.xlsx`)
} 

const importExecl = (req,res) => {
  if (!req.file) {
    return res.status(400).send('upload错误');
  }
  const workbook = XLSX.readFile(`${req.file.destination}/${req.file.filename}`, {cellDates: true,dateNF(d,s){
    return 'YYYY-MM-DD'
  }});  
  // 获取工作表列表  
  const sheet_name_list = workbook.SheetNames;  
  // 获取第一个工作表的数据  
  const worksheet = workbook.Sheets[sheet_name_list[0]];  
  // 将工作表数据转换为JSON对象数组  
  const jsonData = XLSX.utils.sheet_to_json(worksheet);  
  //获取到的数据
  // console.log(jsonData);
  if(!Array.isArray(jsonData)){
    res.send({ code: 0, msg: "数据异常"});
    return
  }
  if(!jsonData.length){
    res.send({ code: 0, msg: "没有检测到导入数据，请检查文档格式或数据！"});
    return
  }
  //http://${req.headers.host}/${req.file.destination}/${req.file.filename}
  res.send({ code: 1, msg: "已加入导入队列"});
  // console.log("服务器继续执行")
  let _resout = execlFillter(jsonData)
  // console.log(_resout)
  db.query(_resout.sqlStr, _resout.jsonData , (results,fields) => {
    //结果后续通过其他方式通知前端
    // console.log(results)
    if (results.affectedRows > 0) {
      // res.send({ code: 1, msg: "添加完成" })
      console.log(`成功添加${results.affectedRows}条数据`)
    } else {
      // res.send({ code: 0, msg: "添加失败" })
      console.log("添加失败")
    }
  })
}

//
function convertToBeijingTime(utcTime) {
  const beijingTime = new Date(utcTime.getTime() + 8 * 60 * 60 * 1000); // UTC时间加上8小时  
  const beijingDate = beijingTime.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }); // 转换为北京时区的时间 
  return moment(beijingDate,"YYYY/MM/DD HH:mm:ss").format("YYYY-MM-DD");  
}

let valConfig = [
  '学校',
  '学院',
  '专业',
  '年级',
  '学号',
  '姓名',
  '获奖时间',
  '比赛、活动名称',
  '获奖名称',
  '指导老师',
  '主办单位、机构、部门',
  '描述'
]

const execlFillter = (_json) =>{
  var _newJson = []
  let _sqlStr = `insert into stu_award(school,college,speciality,grade,student_id,full_name,award_time,activity,encourage,Instructor,org,award_desc) values`
  for(var i in _json){
    var _i = Number(i)
    //拼接sql
    if(_i+1 === _json.length) _sqlStr += "(?,?,?,?,?,?,?,?,?,?,?,?)"; else _sqlStr += "(?,?,?,?,?,?,?,?,?,?,?,?),";
    if(typeof _json[_i] === 'object'){
      var values = []
      for(var j in valConfig){
        var _j = Number(j)
        //根据valConfig字段配置判断需要的字段是否存在
        if(valConfig[_j]==='获奖时间'){
          values.push(_json[_i][valConfig[_j]] ? convertToBeijingTime(_json[_i][valConfig[_j]]): '')
        }else{
          values.push(_json[_i][valConfig[_j]] ? _json[_i][valConfig[_j]]: '')
        }
      }
      //获取到每个行的信息
      // console.log(values)
    }
    //拼接所有行信息
    _newJson = [ ..._newJson, ...values ]
  }
  // console.log(_newJson)
  // console.log(_sqlStr)
  //输出最后sql,json
  return {
    sqlStr: _sqlStr,
    jsonData: _newJson
  }
}

execlFillter()


//dome ----start
// const workbook = XLSX.readFile("assets/xlsx/模板.xlsx");  
// // console.log(workbook)
// // 获取工作表列表  
// const sheet_name_list = workbook.SheetNames;  
// // 获取第一个工作表的数据  
// const worksheet = workbook.Sheets[sheet_name_list[0]];
// // 将工作表数据转换为JSON对象数组  
// const jsonData = XLSX.utils.sheet_to_json(worksheet);  
// console.log(jsonData);
//dome ----end

router.get('/dModul', execlModul)
router.post('/uploads', upload.single('file'),useUploads)
router.post('/execl_import', upload.single('file'),importExecl)
module.exports = router
