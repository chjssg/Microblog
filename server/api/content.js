var models = require("../db");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
// var $sql = require('../sqlMap');
var app = express();

// 连接数据库
var conn = mysql.createPool(models);

//发布内容
router.post("/commit", function(req, res) {
  var content = {
    text: req.body.text,
    parent_id: req.body.username,
    time: req.body.time
  };
  // console.log(content)
  conn.getConnection(function(err, connection) {
    if (err) {
      console.log("与MySQL数据库连接失败" + err);
    } else {
      // console.log('成功')
      connection.query("insert into context set ?;", content, function(
        err,
        result
      ) {
        if (err) {
          console.log(err);
        } else {
          req.session.user.insertId = result.insertId;
          res.send(result);
        }
        connection.release();
      });
    }
  });
});
//获取内容
router.get("/contentGet", function(req, res) {
  conn.getConnection(function(err, connection) {
    if (err) {
      console.log("与MySQL数据库连接失败" + err);
    } else {
      // console.log('成功')
      connection.query(
        "select * from users left join context on users.username=context.parent_id  order by context.id desc;",
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
          connection.release();
        }
      );
    }
  });
});
//个人用户内容获取
router.get("/personContentGet", function(req, res) {
  conn.getConnection(function(err, connection) {
    if (err) {
      console.log("与MySQL数据库连接失败" + err);
    } else {
      // console.log('成功')
      connection.query(
        "select * from users left join context on users.username=context.parent_id  order by context.id desc ;",
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            let arr = [];
            for (let i = 0; i < result.length; i++) {
              if (result[i].username == req.session.user.username) {
                arr.push(result[i]);
              }
            }
            res.send(arr);
          }
          connection.release();
        }
      );
    }
  });
});
//获取图片
router.get("/pictureGet", function(req, res) {
  conn.getConnection(function(err, connection) {
    if (err) {
      console.log("与MySQL数据库连接失败" + err);
    } else {
      // console.log('成功')
      connection.query("select * from pictures ", function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
        connection.release();
      });
    }
  });
});

module.exports = router;
