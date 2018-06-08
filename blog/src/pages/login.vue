<template>
	<div id="">
		<z-nav></z-nav>
		<div id="container" class="container">
			
			<form class="form-horizontal">
				<div v-if='flag==1' class="alert alert-danger" role="alert">用户名不能为空</div>
				<!-- <div v-else-if='flag==2' class="alert alert-danger" role="alert">密码错误</div> -->
				<div v-else-if="flag==3" class="alert alert-success" role="alert">登录成功</div>
				<div v-else-if='flag==2' class="alert alert-danger" role="alert">用户名或密码错误</div>
				<legend>用户登录</legend>
				<br/>
				<div class="form-group">
					<label for="username" class="col-sm-3 control-label">用户名</label>
					<div class="col-sm-8">
						<input v-model="username" type="text" class="form-control" id="username" name='username' placeholder="Username">
					</div>
				</div>
				<br>
				<div class="form-group">
					<label for="password" class="col-sm-3 control-label">密码</label>
					<div class="col-sm-8">
						<input v-model="password" type="password" class="form-control" id="password" name='password' placeholder="Password">
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
					<div class="col-sm-offset-3 col-sm-9">
						<button type="button" class="btn btn-default" @click='login'>登录</button>
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
		  username:'',
		  password:'',
		  flag:0,
	    }
	  },
	  methods:{
		  login:function(){
			  	var that = this;
				var user = {
					username : that.username,
					password : that.password
				}
				if(that.username==''){
					that.flag = 1;
				}else{
					this.$http.post('/api/login',user).then(function(res){
						if (res.status === 200) {
							if(res.data!==''){
								// console.log(res.data)
								that.flag=3;
								that.$router.push({path:'/'});
								that.$store.state.user = res.data;
								// that.setCookie('username',res.data.username,1)	
							}else{
								that.flag=2
							}
						}
					})
				}
		},
		
	  }
}
</script>
<style type="text/css">
	
</style>