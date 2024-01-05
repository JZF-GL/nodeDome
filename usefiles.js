
const express = require('express')
var router = express.Router()
const multer = require('multer'); // 导入Multer库，用于处理文件上传
var Jimp = require("jimp");
const XLSX = require('xlsx'); 
const path = require('path');

const useJimp = async (fp,host,w,h) => {
    const imageFilePath = path.join(__dirname, `/assets/uploads/${fp}`);
    var _FP = {
      y: '',
      n: ''
    }
    //读取图片
    let _image = await Jimp.read(imageFilePath)
    //读取时间戳
    const timestamp = new Date().getTime();
    //图片处理
    await _image.quality(80).write(`assets/images/${timestamp}${fp}`)
    // .resize(256, 256)
    //输出地址
    _FP.y = `http://${host}/assets/uploads/${fp}`;
    _FP.n = `http://${host}/assets/images/${timestamp}${fp}`;
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
      cb(null, file.originalname) // 指定上传文件的文件名生成策略，这里使用原始文件名
    }
});
  
// 配置Multer，指定上传文件的处理和验证规则
const upload = multer({ storage: storage });

const useUploads = async (req, res) => {
    if (!req.file) {
      return res.status(400).send('upload错误');
    }
    let _a = await useJimp(req.file.filename,req.headers.host)
    // encryptData(req.file)
    // console.log('req.file---->',req.file)
    // console.log('req.headers---->',req.headers)
    // useJimp(req.file.filename,req.file.width,)
    res.send({ code: 1, msg: "upload成功", data: _a });
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
  res.redirect(`http://${req.headers.host}/assets/xlsx/${config.title}.xlsx`);
  // res.send(workbook); 
  // res.send(`http://${host}/assets/xlsx/${config.title}.xlsx`)
}

router.get('/dModul', execlModul)
router.post('/uploads', upload.single('file'),useUploads)

module.exports = router
