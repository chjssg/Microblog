<template>
	<div id="">
		<z-nav></z-nav>
		<div id="container" class="container">
			<form class="form-horizontal" >
				<div v-if='flag==1' class="alert alert-danger" role="alert">注册失败！两次输入口令不一样</div>
				<div v-else-if='flag==2' class="alert alert-danger" role="alert">注册失败！格式错误</div>
				<div v-else-if="flag==3" class="alert alert-success" role="alert">注册成功</div>
				<div v-else-if='flag==4' class="alert alert-danger" role="alert">注册失败！密码不能为空</div>
				<div v-else-if='flag==5' class="alert alert-danger" role="alert">注册失败！昵称不能为空</div>
				<legend>用户注册</legend>
				<br/>
				<div class="form-group">
					<label for="username" class="col-sm-3 control-label">邮箱</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="username" name='username' placeholder="Username" v-model="username">
						<p class="">你的账户名，用于登录</p>
					</div>
					
				</div>
				<div class="form-group">
					<label for="nickname" class="col-sm-3 control-label">昵称</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="nickname" name='nickname' placeholder="Nickname" v-model="nickname">
					</div>
					
				</div>
				<div class="form-group">
					<label for="password" class="col-sm-3 control-label">密码</label>
					<div class="col-sm-8">
						<input type="password" class="form-control" id="password" name='password' placeholder="Password" v-model="password">
					</div>
				</div>
				<div class="form-group">
					<label for="password-repeat" class="col-sm-3 control-label">确认密码</label>
					<div class="col-sm-8">
						<input type="password" class="form-control" id="password-repeat" name='password-repeat' placeholder="Confirm Password" v-model="passwordRepeat">
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-3 col-sm-9">
						<div class="checkbox">
							<label>
								<input type="checkbox"> 记住密码
							</label>
						</div>
					</div>
				</div>
				<div class="form-group">
					123
				</div>
				<div class="form-group">
					<div class="col-sm-offset-3 col-sm-9">
						<button type="button" class="btn btn-default" @click='addUser'>注册</button>
						<button type="reset" class="btn btn-default">重置</button>
					</div>
				</div>
			</form>

			<hr />
			<footer>
				<p><a href="http://www.baidu.com" target="_blank">陈浩军</a></p>
			</footer>
		</div> 
				
	</div>
</template>
<script type="text/javascript">
	export default {
  // name: 'hello',
  data () {
    return {
	  	msg: 'Welcome to Your Vue.js App',
	  	flag:0,
      	username: '',
      	nickname:'',
		password: '',
		passwordRepeat:'',
    }
  },
  mounted:function(){

  },
  methods: {
    addUser() {
			var that = this;
			//邮箱正则表达式
			var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
			var user = {
				username : that.username,
				password : that.password,
				nickname : that.nickname,
				passwordRepeat : that.passwordRepeat
			}
			if(that.username === ''||!reg.test(that.username)){
				that.flag = 2
			}else if(that.password!==that.passwordRepeat){
				that.flag = 1
			}else if(that.password==''&&that.passwordRepeat==''){
				that.flag = 4
			}
			else if(that.nickname==''){
				that.flag = 5;
			}
			else{
				this.$http.post('/api/reg',user).then(function(res){
					if (res.status === 200) {
						// console.log(res.data);
						that.flag = 3;
						that.$router.push({path:'/'});
						that.$store.state.user = user;
					}
				})
			}
			
			
    }
  }
}
</script>
<style type="text/css">
	
</style>