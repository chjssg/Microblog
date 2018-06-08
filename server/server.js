const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(
  session({
    secret: "chj123456", //设置 session 签名
    name: "user",
    cookie: { maxAge: 60 * 1000 * 60 * 24 }, // 储存的时间 24小时
    resave: false, // 每次请求都重新设置session
    saveUninitialized: true
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

// 后端api路由

//登录注册路由
const userApi = require("./api/userApi");
app.use("/api", userApi);
//处理图片
const imagePic = require("./api/imagePic");
app.use("/api/img", imagePic);
//添加内容
const content = require("./api/content");
app.use("/api/content", content);

//webpack打包
app.use(express.static(path.resolve(__dirname, "./dist")));
app.get("*", function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, "./dist/index.html"));
  res.send(html);
});
// 监听端口
app.listen(3000);
console.log("success listen at port:3000......");
