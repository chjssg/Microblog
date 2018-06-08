<template>
    <div id='accountSet'>
        <z-nav></z-nav>
        <div class="container">
            <div class="container-fluid">
                <!-- 设置内容 -->
                <form class="form-horizontal">
                    <div class="form-group">
                        <div class="box"><img :src="imgs" alt="" srcset="" class="img-rounded myImg" data-toggle="modal" data-target="#myPic"></div>
                        
                    </div>
                    <div class="form-group">
                        <strong class="col-sm-6 control-label">邮箱:</strong>
                        <strong class="col-sm-4 control-label" style="text-align: left;">{{user.username}}
                            <a class="reset" data-toggle="modal" data-target="#myPassword">修改密码</a>
                        </strong>
                    </div>
                    <div class="form-group">
                        <strong class="col-sm-6 control-label">昵称:</strong>
                        <strong class="col-sm-4 control-label" style="text-align: left;">{{user.nickname}}
                            <a class="reset" data-toggle="modal" data-target="#myNickname">修改昵称</a>
                        </strong>
                    </div>
                    <div class="form-group">
                        <strong class="col-sm-6 control-label">邮箱:</strong>
                        <strong class="col-sm-4 control-label" style="text-align: left;">{{user.username}}</strong>
                    </div>
                </form>
                
            </div>
            <!-- 模态框（Modal 修改头像 -->
            <div class="modal fade" id="myPic" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">修改头像</h4>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">&nbsp;&nbsp;
                                <input type="file" name="file" value="上传图片"  @change="getPic($event)" accept="">
                                <img :src="image?image:imgs" alt="" srcset="" class="img-rounded img">
                            </div>
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button @click="changeImg" type="button" class="btn btn-primary" data-dismiss="modal" >提交更改</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 模态框（Modal）修改昵称 -->
            <div class="modal fade" id="myNickname" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">修改昵称</h4>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">&nbsp;&nbsp;
                                <label for="nickname" class="">新昵称：</label>
                                <div class="">
                                    <input v-model="nickname" type="text" class="form-control" id="nickname" name='nickname' placeholder="新昵称">
                                </div>
                            </div>
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button @click="change" type="button" class="btn btn-primary" data-dismiss="modal">提交更改</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 模态框（Modal）修改密码 暂时未开通 -->
            <div class="modal fade" id="myPassword" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">修改密码</h4>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">&nbsp;&nbsp;
                                <label for="password" class="">新密码：</label>
                                <div class="">
                                    <input v-model="password" type="text" class="form-control" id="password" name='password' placeholder="新密码">
                                </div>
                                <br>&nbsp;&nbsp;
                                <label for="confirmPassword" class="">确认密码：</label>
                                <div class="">
                                    <input v-model="confirmPassword" type="text" class="form-control" id="confirmPassword" name='confirmPassword' placeholder="确认密码">
                                </div>
                            </div>
                            <p class="not">此功能暂未开通</p>
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" class="btn btn-primary" onclick="alert('sorry,不能更改')">提交更改</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <!-- 我的内容展示 -->
            <div  v-if="context!=''" class="">
        	    <div v-for='item in context' :key="item.id"  class="contentShow ">
					<div class="row context">
						<div class="left clearfix ">
							<img :src="item.headPic" alt="" srcset="">
						</div>
						<div class="right">
							<div class="nickname"><strong>{{item.nickname}}</strong></div>
							<div class="date"><i>{{item.time}}</i></div>
							<p class="text">{{item.text}}</p>
						</div>
                        <img v-for="pic in pictures"  v-if="item.id==pic.parentId" :src='pic.picture' :key='pic.id' class="images" alt="" srcset="">
					</div>
        	    </div>
            </div>

            <div v-else class="contentShow">空空如也~~~<router-link to="/">快去发表你的内容吧</router-link></div>
            <footer>
				<p><a href="http://www.baidu.com" target="_blank">陈浩军</a></p>
                <p>如有问题请联系邮箱：haojun_chen@126.com</p>
		    </footer>
       </div>
        
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      image: "",
      imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      },
      tempImg: "", //暂时存放照片
      nickname: "", //修改昵称
      password: "", //修改密码
      confirmPassword: "", //确认修改密码
      context: "", //页面主内容
      pictures: [] //每个内容图片组
    };
  },
  computed: mapGetters({ imgs: "picUrl", user: "user" }),
  methods: {
    //动态显示头像修改
    getPic(evevt) {
      let that = this;
      that.tempImg = evevt.target.files[0];
      //判断图片是否符合要求
      let type = that.tempImg.type; //文件的类型，判断是否是图片
      let size = that.tempImg.size; //文件的大小，判断图片的大小
      if (this.imgData.accept.indexOf(type) == -1) {
        alert("请选择我们支持的图片格式！");
        return false;
      }
      if (size > 2097153) {
        alert("请选择2M以内的图片！");
        return false;
      }
      console.log(that.tempImg);
      //读取图片信息
      let reader = new FileReader();
      reader.readAsDataURL(that.tempImg);
      reader.onload = function(e) {
        that.image = e.target.result;
      };
    },
    //修改头像
    changeImg: function(evevt) {
      let that = this;
      // let img = evevt.target.files[0];
      let formData = new FormData();
      formData.append("file", that.tempImg);
      console.log(formData);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.$http.post("api/img/image", formData, config).then(function(res) {
        if (res.status === 200) {
          /*这里做处理*/
          console.log(res.data);
          that.$store.state.user.headPic = res.data.headPic;
          // console.log(that.imgs)
        }
      });
      that.$router.push({ path: "/accountSet" });
    },
    //修改昵称
    change: function() {
      let that = this;
      this.$http
        .post("api/resetNick", { nickname: that.nickname })
        .then(function(res) {
          if (res.status === 200) {
            /*这里做处理*/
            that.$store.state.user.nickname = res.data.nickname;
          }
        });
    }
  },
  beforeCreate() {
    var that = this;
    that.$http.get("api/content/personContentGet").then(function(res) {
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {}
      that.context = res.data;
    });
    that.$http.get("/api/content/pictureGet").then(function(res) {
      console.log(res.data);
      that.pictures = res.data;
    });
  }
};
</script>
<style type="text/css" lang='less'>
#accountSet {
  background: pink;
}
.box {
  margin-top: 50px;
  .myImg {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-left: 45%;
    cursor: pointer;
  }
}
.reset {
  text-align: left;
  margin-left: 10px;
  font-style: italic;
  cursor: pointer;
  opacity: 0.7;
}
.img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.not {
  color: red;
}

.contentShow {
  height: 150px;
  border-bottom: 1px solid white;
  padding-left: 30px;
  .left {
    float: left;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-top: 30px;
    }
  }
  .right {
    float: left;
    margin-top: 30px;
    margin-left: 20px;
  }
  .images {
    width: 100px;
    height: 100px;
    float: left;
    margin-top: 30px;
    margin-left: 20px;
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