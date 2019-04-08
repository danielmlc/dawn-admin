<template>
	<div class="login">
		<div class="header">
			<div class="logowrapper">
					<img class="logo" src="img/logo.png"  />
				</div>
			<div class="title">{{systemTitleName}}</div>
		</div>
		<div class="main">
			<div class="title"></div>
			<div class="loginform">
				<el-form class="loginlay" :model="LoginForm" status-icon :rules="formRules" ref="LoginForm" label-width="0px" label-position="left">
					<el-form-item  prop="userName" >
							<el-input v-model="LoginForm.userName" size="medium"  :placeholder="$t('system.login.userNameTip')" style="width:270px">
								<template slot="prepend"><i class="icon-user-tie"></i></template>
							</el-input>
						</el-form-item>
						<el-form-item  prop="passWord">
							<el-input v-model="LoginForm.passWord" size="medium" :placeholder="$t('system.login.passwordTip')" @keyup.enter.native="_handleSubmit"  type="password" style="width:270px">
								<template slot="prepend"><i class="el-icon-more"></i></template>
							</el-input>
						</el-form-item>
						<el-form-item >
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="large" @click="_handleSubmit" :loading="loading" >{{$t('system.login.login')}}</el-button>
							<el-button @click="_handleReset" size="large" >{{$t('system.login.reset')}}</el-button>
						</el-form-item>
					</el-form>
			</div>
		</div>
		<div class="foot">
			<div class="about-warpper"  v-if="companyInfo">
				<a class="about-item" href="http://www.yearrow.com">{{$t('system.login.website')}}</a>
				<a class="about-item">{{$t('system.login.phone')}}:029-88227793</a>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
import { 
		requestToken,
		requestGetMenuAppList,
		requestGetCurrentLoginInformations,
	   } from '@/api/login';
import util from '@/common/js/util';
import fetch from '@/api/fetch';
export default {
		data() {
		      return {
		        LoginForm: {
					userName: '',
					passWord: '',
					grant_type:'password', //'password'/''
					ylClientId:'',
					loginType:0
		        },
				loading:false,
				menuAppList:[],
				companyInfo:getClientObj().sysConf.companyInfo,
				systemTitleName:getClientObj().sysConf.titleName,
				formRules:{
					userName: [
						{ required: true, message: this.$t('system.login.message.userNameNotNull'), trigger: 'blur' }
					],
					passWord: [
						{ required: true, message: this.$t('system.login.message.passWordNotNull'), trigger: 'blur' }
					],
				}
			  }
		     },
		     methods:{
				 _initlogin(){
					 if(util.getCookieValue('ylClientId')===''){
						util.setCookie('ylClientId',this.newGuid(),1);
					 }
					 this.LoginForm.ylClientId=util.getCookieValue('ylClientId');
					 document.title=getClientObj().sysConf.titleName;
				 },
			     _handleSubmit(ev){
					//系统登录
					this.$refs.LoginForm.validate((valid) => {
							if (valid) {
								let _this=this;
								this.loading=true;
								this.LoginForm.passWord=util.jsEncrypt(this.LoginForm.passWord);
								//写入LocalStorage
								localStorage.setItem('access',this.LoginForm.passWord);	
								requestToken(this.LoginForm).then(data => {
									let result=data.data;
									if(result.error!==undefined){
										if(result.error==="InvalidUserName"){
											this.$message.warning(this.$t('system.login.message.userNameErr'));
										}else if(result.error==="InvalidPassword"){
											this.$message.warning(this.$t('system.login.message.passWordErr'));
										}else if(result.error==="InvalidOrgId"){
											this.$message.warning(this.$t('system.login.message.userNoOrg'));
										}else if(result.error==="InvalidRoleId"){
											this.$message.warning(this.$t('system.login.message.userNoRole'));
										}else{
											this.$message.error(result.error);
										}
										this.LoginForm.passWord='';
									}else{
										if(result.access_token!==""){
											util.setLogin(result.access_token);
											requestGetCurrentLoginInformations().then(
													data=>{
														if(data.success){
															util.setCookie('userInfo',JSON.stringify(data.result),1);
															
															this.$message({message: this.$t('system.login.message.loginSuccess'),type: 'success'});
															this.$router.replace('/Index');
														}
											});
										} else {
											this.$message.error(this.$t('system.login.message.loginFail'));
											this.LoginForm.passWord='';
										}
									}
									this.loading = false;
								}).catch(function(err){
									_this.LoginForm.passWord='';
									_this.loading = false;
								})
							} else {
								return false;
							}
				       });
			     },
			     _handleReset(){
					//表单重置
					 this.$refs.LoginForm.resetFields();
			    },
		     },
			 mounted(){
				 this._initlogin();
				 
			 }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.login
	background url(/img/login_bgpic.png) no-repeat 
	background-size:100% 100%
	height:100%
	width:100%
	color:#ddd
	display:flex
	flex-direction:column
	.header
		padding-left:26px
		height:85px
		display flex
		flex-direction row
		padding-top:20px
		background-color rgba(0,0,0,0.6)
		.logo
			height:65px
		.title	
			flex:1
			font-size:26px
			font-family:SimSun
			color:#fdf5f5
			font-weight 500
			height:65px
			line-height :65px
			padding-left:10px
			text-shadow: 1px 1px 2px #eee
	.main
		position:relative
		height:616px
		border-top:2px #eee solid
		border-bottom:2px #eee solid
		flex:1
		.title
			position:absolute  
			top:100px
			left:100px
			height:150px
			width:364px
			z-index:1000
			background: url(/img/ad_word.png) no-repeat
		.loginform
			position:absolute
			top:10px
			right:100px
			height:407px
			width:480px
			z-index:1001
			background: url(/img/login_bg.png) no-repeat
			.loginlay
				padding-top:120px
				padding-left:90px
	.foot
		height:35px
		text-align:center
		padding-top:10px
		background-color rgba(0,0,0,0.6)
		.about-warpper>.about-item
				font-size:12px
				margin:0px  5px 
				&:hover
					color:#475669
			.bottom
				margin-top:5px
				font-size:12px
</style>
