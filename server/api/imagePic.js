var models = require('../db');
var express = require('express');
var router = express.Router();
var fs = require('fs')
var mysql = require('mysql');
var bodyParser = require('body-parser');
var formidable = require('formidable');
// var $sql = require('../sqlMap');
//引进multer模块  记得在终端安装multer模块
const multer = require('multer');
const muilter = require('../common/multer')
// var upload=multer({dest:'./uploads'});
// router.use(upload.any());


// 连接数据库
var conn = mysql.createPool(models);

//更改头像,处理一张照片
router.post("/image",function (req,res) {
	let thisUsername = req.session.user.username
	console.log(req.session.user.username)
	let path ;
	let upload=muilter.single('file');  
	     	
    upload(req, res, function (err) {
      //添加错误处理
        if (err) {
            return  console.log(err);
        } 
        //文件信息在req.file或者req.files中显示。
		// console.log(req.file)
		path = {'headPic':'http://localhost:3000/'+req.file.path}
		conn.getConnection(function(err,connection){
			if(err){
				console.log('与MySQL数据库连接失败'+err);
			}else{
				connection.query('update users set ? where username=?;',[path,thisUsername],
				function(err,result){
					if(err){
						console.log(err);
					}else{
						// console.log(result);
						req.session.user.headPic = path.headPic;
						res.send(path);
					}
					connection.release();
				})
			}
		})
	});
	
});
//处理多张照片
router.post("/images",function (req,res) {
	let path=[];
	let upload=muilter.array('file', 9);  
	let parent = req.session.user.insertId
    upload(req, res, function (err) {
      //添加错误处理
        if (err) {
            return  console.log(err);
        } 
        //文件信息在req.file或者req.files中显示。
		for(let i=0;i<req.files.length;i++){
			path.push(['http://localhost:3000/'+req.files[i].path,parent])
		}
		console.log(path)
		conn.getConnection(function(err,connection){
			if(err){
				console.log('与MySQL数据库连接失败'+err);
			}else{
				connection.query('INSERT INTO pictures(`picture`,`parentId`) VALUES ?',[path],
				function(err,result){
					if(err){
						console.log(err);
					}else{
						console.log(result);
					}
				})
				connection.release();
			}
		})
	});
    
});
module.exports = router;