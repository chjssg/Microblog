<template>
<div id="home">
		<z-nav></z-nav>
		<div id="container" class="container">
			<!-- 未登录状态 -->
			<div v-if="!user" class="jumbotron bg-info">
				<h1>CHJ's Blog</h1>
				<p>随时随地分享你的新鲜事</p> 
				<p>
					<a><router-link  class="btn btn-primary btn-large" to="/login">登录</router-link></a>
					<a><router-link class="btn btn-primary btn-large" to="/reg">注册</router-link></a>
				</p>
			</div>
			<!-- 登录状态，user不为空时 -->
			<div v-else-if='user' class="box container-fluid">
				<h5>说点什么吗？</h5>
				<textarea v-model="text" class="form-control resize" rows="5" ></textarea>
				<div class="row">
					&nbsp;&nbsp;&nbsp;
					<!-- 使用表情 -->
					<a><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>&nbsp;添加表情</a>
					&nbsp;&nbsp;
					<!-- 使用图片 -->
					<a @click="display"><span  class="glyphicon glyphicon-picture" aria-hidden="true"></span>&nbsp;添加图片</a>
					<div  :class='imgDiv' class="d1 clearfix">
						<div class="littleNav clearfix">
							<h5>本地上传</h5>
							<div @click="close" class="close"><span>关闭</span></div>
						</div>
						<img v-for="item in images" :key='item.id' :src='item'  alt="" srcset="" class="img-rounded img">
						<input id="inputImg" type="file" name="file" :value="inputVal"  @change="getPic($event)" accept="">
						<label :class="disapper" class="label" for="inputImg">
							<div class="box">
								点击添加图片
							</div>
						</label>
					</div>
					<!-- 发布并保存到后台数据库 -->
					<button type="button" class="btn btn-small bgcolor" @click="publish">发布</button>
				</div>
			</div>
			<hr>
			<!-- 内容部分 -->
			<div class="row clearfix">
        <div class="col-sm-2 col-md-2 col-xs-1 ringhtBar">
					<p>推荐内容</p>
				</div>
				<div v-for='item in context' :key="item.id"  class="bigBox col-sm-8  col-xs-10">
					<div class="row context">
						<div class="left clearfix ">
							<img :src="item.headPic" alt="" srcset="">
						</div>
						<div class="right">
							<div class="nickname"><strong>{{item.nickname}}</strong></div>
							<div class="date"><i>{{item.time}}</i></div>
							<p class="text">{{item.text}}</p>
							<img v-for="pic in pictures"  v-if="item.id==pic.parentId" :src='pic.picture' :key='pic.id' class="images" alt="" srcset="">
						</div>
					</div>
					<div class="func">
						<div class="item"><a href=""><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;评论</a></div>
						<div class="item"><a href=""><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>&nbsp;111</a></div>
					</div>
				</div>
				
			</div>
			
			
			<hr>
			<!-- 页脚 -->
			<footer>
				<p><a href="http://www.baidu.com" target="_blank">陈浩军</a></p>
        <p>如有问题请联系邮箱：haojun_chen@126.com</p>
		    </footer>
		</div>
</div> 
		
</template>
<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      //接收的图片类型
      imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      },
      text: "", //文本内容
      imgs: [], //传入后台的图片组
      images: [], //前台显示图片组
      disapper: "", //控制label添加图片
      imgDiv: "disapper", //控制添加图片显示
      context: "", //页面主内容
      pictures: [], //每个内容图片组
      inputVal: "", //控制可以重复选择图片
      textval: ""
    };
  },
  computed: {
    ...mapGetters({ user: "user" })
  },
  watch: {
    context: function(val, oldval) {
      // console.log(val,oldval)
      var that = this;
      that.getconPic();
    }
  },
  methods: {
    //获取内容
    getContent: function() {
      var that = this;
      that.$http.get("api/content/contentGet").then(function(res) {
        // console.log(res.data);
        that.context = res.data;
      });
    },
    getconPic: function() {
      var that = this;
      that.$http.get("/api/content/pictureGet").then(function(res) {
        // console.log(res.data);
        that.pictures = res.data;
      });
    },
    //发布功能按钮
    publish: function() {
      var that = this;
      var content = {
        username: this.$store.state.user.username,
        text: this.text,
        time: that.getTime()
      };
      let formData = new FormData();
      for (let i = 0; i < that.imgs.length; i++) {
        formData.append("file", that.imgs[i]);
      }
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      if (that.text == "" && that.images == "") return alert("内容不能为空");
      this.$http.post("/api/content/commit", content).then(function(res) {
        // console.log(res.data.insertId);
        if (that.imgs.length != 0) {
          that.$http.post("/api/img/images", formData).then(function(res) {
            // console.log(res.data);
            that.imgs = "";
            that.images = "";
          });
        }
        that.getContent();
        that.getconPic();
        that.text = "";
        that.imgDiv = "disapper";
      });
      console.log(that.$route);
      // that.$router.push({path:'/'});
    },

    //显示添加照片功能
    display() {
      this.imgDiv = "display";
    },
    //关闭添加照片功能
    close: function() {
      var that = this;
      that.imgDiv = "disapper";
    },
    //获取当前照片
    getPic(evevt) {
      let that = this;
      var aaa = evevt.target.files[0];
      //判断图片是否符合要求
      let type = aaa.type; //文件的类型，判断是否是图片
      let size = aaa.size; //文件的大小，判断图片的大小
      if (this.imgData.accept.indexOf(type) == -1) {
        alert("请选择我们支持的图片格式！");
        return false;
      }
      if (size > 2097153) {
        alert("请选择2M以内的图片！");
        return false;
      }
      that.imgs.push(aaa);
      console.log(that.imgs);
      //读取图片信息
      var reader = new FileReader();
      reader.readAsDataURL(aaa);
      reader.onload = function(e) {
        that.images.push(e.target.result);
      };
      that.inputVal = "";
      if (that.images.length == 8) {
        that.disapper = "disapper";
      }
    },
    //获取当前时间
    getTime: function() {
      var myDate = new Date(); //获取系统当前时间
      var double = function(num) {
        return num > 9 ? num : "0" + num.toString();
      };
      var date = double(myDate.getDate());
      var month = double(myDate.getMonth() + 1);
      var time =
        myDate.getFullYear() +
        "-" +
        month +
        "-" +
        date +
        " " +
        double(myDate.getHours()) +
        ":" +
        double(myDate.getMinutes()) +
        ":" +
        double(myDate.getSeconds());
      return time;
    }
  },
  beforeCreate() {
    var that = this;
    that.$http.get("api/content/contentGet").then(function(res) {
      // console.log(res.data);
      that.context = res.data;
    });
    that.$http.get("/api/content/pictureGet").then(function(res) {
      // console.log(res.data);
      that.pictures = res.data;
    });
  }
};
</script>
<style type="text/css" lang='less'>
#home {
  .jumbotron {
    width: 95%;
    margin: 0 auto;
  }
  .disapper {
    display: none;
  }
  .display {
    display: block;
  }
  .row {
    position: relative;
    a {
      cursor: pointer;
    }
    .d1 {
      position: absolute;
      top: 30px;
      left: 105px;
      z-index: 10;
      width: 350px;
      height: auto;
      background: rgba(246, 248, 250, 1);
      border: 1px solid black;
      #inputImg {
        display: none;
      }
      .littleNav {
        height: 40px;
        h5 {
          float: left;
          margin-left: 20px;
        }
        .close {
          font-size: 15px;
          margin-top: 10px;
          margin-right: 10px;
        }
      }
      .label {
        width: 100px;
        height: 100px;
        // display: inline-block;
        float: left;
        padding: 0;
        margin-left: 11px;
        margin-top: 5px;
        .box:hover {
          border: 1px solid orange;
          color: orange;
        }
        .box {
          width: 100px;
          height: 100px;
          color: black;
          text-align: center;
          vertical-align: middle;
          background-color: rgba(149, 149, 149, 0.7);
          border: 1px dashed rgba(184, 184, 184, 0.3);
          // display: none;
        }
      }
      .img {
        width: 100px;
        height: 100px;
        display: inline-block;
        float: left;
        margin-left: 11px;
        margin-top: 5px;
        margin-bottom: 10px;
      }
    }
  }

  .box {
    // background-color:yellow;
    .resize {
      resize: none;
    }
    .row {
      margin-top: 10px;
      a:hover {
        color: orange;
      }
      a {
        text-decoration: none;
        line-height: 30px;
        span {
          font-size: 15px;
          color: orange;
        }
      }
      .bgcolor:hover {
        background-color: white;
        color: orange;
        border: 1px solid orange;
      }
      .bgcolor {
        background-color: orange;
        color: white;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
        display: inline-block;
        float: right;
        line-height: 15px;
        width: 80px;
        height: 30px;
        margin-right: 25px;
      }
    }
  }
  .bigBox {
    background: rgba(236, 236, 236, 0.5);
    border-radius: 10px;
    margin-left: 30px;
    margin-top: 35px;
    float: left;
    .context {
      display: flex;
      .left {
        flex-grow: 1;
        flex-basis: 1%;
        // background-color: red;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-left: 70px;
          margin-top: 10px;
          float: right;
        }
      }
      .right {
        flex-grow: 5;
        margin-right: 100px;
        padding-left: 10px;
        // background: yellow;
        .nickname {
          font-size: 18px;
          margin-top: 15px;
        }
        .date {
          margin: 5px 0;
        }
        .text {
          font-size: 17px;
        }
        .images {
          width: 150px;
          height: 150px;
          margin-right: 15px;
          margin-bottom: 30px;
        }
      }
    }
    .func {
      display: flex;
      margin: auto 50px;
      height: 50px;
      border-top: 1px solid rgba(184, 184, 184, 0.5);
      line-height: 50px;
      .item {
        flex-grow: 1;
        height: 20px;
        // background-color: pink;
        text-align: center;
        a:hover {
          color: orange;
        }
        a {
          text-decoration: none;
          line-height: 30px;
          font-size: 17px;
          color: gray;
          span {
            font-size: 17px;
            color: gray;
          }
        }
      }
    }
  }
  .ringhtBar {
    background: rgba(236, 236, 236, 0.5);
    float: right;
    overflow: hidden;
    margin-right: 50px;
    margin-top: 40px;
    height: 500px;
    border-radius: 10px;
    text-align: center;
  }
}

/*清除浮动代码*/
.clearfix:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfix {
  zoom: 1;
}
</style>