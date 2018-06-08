var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// var $sql = require('../sqlMap');
var app = express();

// 连接数据库
var conn = mysql.createPool(models);

// conn.connect();

router.get('/reg',function(req,res) {
    res.end('nihaoya')
})
router.get('/userInfo',function(req,res){
	// console.log("Cookies: ", req.cookies);
	// res.send(req.cookies);
	if(req.session.user!== null){
		// console.log(req.session)
		req.user=req.session.user;
		res.send(req.session)
	  } 
})
router.get('/logout', function (req,res,next){ 
	//删除Cookie  
	// res.clearCookie('user');
	delete req.session.user;
	res.send(req.session)
	// res.render('/')
  })

//登录路由
router.post('/login',function(req,res){
	var user = {'username': req.body.username,
				'password':req.body.password,}
	conn.getConnection(function(err,connection){
		if(err){
			console.log('与MySQL数据库连接失败'+err);
		}else{
			connection.query('select username,password,nickname,headPic from users',
			function(err,result){
				if(err){
					console.log(err);
				}else{
					var flag = 0;
					for(let i=0;i<result.length;i++){
						if(result[i].username==user.username&&result[i].password==user.password){
							flag = 1;
							req.session.user = result[i];
							return res.send(result[i])
						}
					}
					if(flag==0)return res.send('')
				}
				connection.release();
			})
		}
	})
})




//注册路由
router.post('/reg',function(req,res){
	var user ={'username': req.body.username,
				'nickname':req.body.nickname,
				'password':req.body.password,
				'headPic':'http://localhost:3000/uploads/default.jpg'};
	if(user.password!=req.body.passwordRepeat){
	 	// return res.redirect('/reg');
      	return res.end('shibai');
	}
	conn.getConnection(function(err,connection){
		if(err){
			res.send('与MySQL数据库连接失败'+err);
		}else{
			reg(user,connection,res);
			req.session.user = user;
		}
	})
	// res.end();
});
//注册
var reg = function(user,connection,res) {
	var str;
	connection.query('insert into users set ?;',user,
		function(err,result) {
			if(err){
				str="注册失败";
				console.log(str+' '+err.message);
			}
			else {
				console.log(result);
				if(result.length==0)
					str="注册插入数据失败";
				else 
					str=user;
			}
			connection.release();
			res.send(str);
		});
}
//修改昵称，密码；
router.post('/resetNick',function(req,res){
	var thisUsername = req.session.user.username
	// console.log(req.body);
	var user ={
				'nickname':req.body.nickname,
	}
	
	conn.getConnection(function(err,connection){
		if(err){
			res.send('与MySQL数据库连接失败'+err);
		}else{
			connection.query('update users set ? where username=?;',[user,thisUsername],
			function(err,result){
				if(err){
					console.log(err);
				}else{
					// console.log(result);
					req.session.user.nickname = user.nickname;
					res.send(user);
				}
				connection.release();
				
			})
		}
	})
	// res.end();
});

module.exports = router;