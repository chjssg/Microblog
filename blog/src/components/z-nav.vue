<template>
	<div id="">
		<!-- <div class="navbar navbar-fixed-top">
		    <div class="navbar-inner">
			   	<div class="container">
					<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
					        <span class="icon-bar"></span>
					        <span class="icon-bar"></span>
					        <span class="icon-bar"></span>
					</a>
					<a class="brand" href="/">CHJ's blog</a>
					<div class="nav-collapse">
						<ul class="nav">
							<li class="active"><a href="/">首页</a></li> 
							<li><a href="/login">登入</a></li>
							<li><a href="/reg">注册</a></li>
						</ul> 
					</div>
				</div>
			</div>
		</div>
		
		<div id="container" class="container">
			<Home></Home>
			<hr />
			<footer>
				<p><a href="http://www.baidu.com" target="_blank">陈浩军</a></p>
			</footer>
		</div> -->

		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<span class="navbar-brand"><router-link to="/">CHJ's Blog</router-link></span>
					</div>
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					
					<form class="navbar-form navbar-left">
						<div class="form-group">
						<input type="text" class="form-control" placeholder="Search">
						</div>
						<button type="button" class="btn btn-default" >Submit</button>
					</form>
					<!-- 状态判断 -->
					<ul v-if="!user"  class="nav navbar-nav navbar-right">
						<li class="active"><router-link to="/login">登录</router-link></li>
						<li><router-link to="/reg">注册</router-link></li>
					</ul>
					<ul v-else class="nav navbar-nav navbar-right">
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user.username}} <span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><router-link to="/">首页</router-link></li>
								<li><router-link to="/accountSet">账号设置</router-link></li>
								<li><a href="#">激情聊天室</a></li>
								<li><a href="#">Something else here</a></li>
								<li role="separator" class="divider"></li>
								<li><a @click="logout">退出</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>



	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex'
	export default {
		name: 'index',
		data(){
			return{
				thisClass:'active',
				loged:0,
			}
		},
		computed:mapGetters({
				index:'index',
				user:'user'
		}),
		mounted(){
		},
		watch:{
				
		},
		methods:{
			...mapActions([
				'donIndex',
			]),
			logout:function(){
				var that = this;
				this.$http.get('api/logout').then(function(res){
					
					that.$store.state.user = null;
					that.$router.push({path:'/'});
					console.log(res.data);
				})
			}
		},
		props:[]
}
</script>
<style type="text/css">
	
</style>