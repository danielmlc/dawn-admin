import Vue from 'vue';
import Router from 'vue-router';
//业务组件
const demo = resolve => require(['./pages/Demo.vue'], resolve);
const Login = resolve => require(['./pages/Login.vue'], resolve);
const ReportCenter = resolve => require(['./pages/ReportCenter.vue'], resolve);
const Index = resolve => require(['./pages/Index.vue'], resolve);
const RedirectPage = resolve => require(['./pages/RedirectPage.vue'], resolve);
const Main = resolve => require(['./pages/layout/Main.vue'], resolve);
const Home = resolve => require(['./pages/config/homepage/Home.vue'], resolve);
const Page404 = resolve => require(['./pages/Page404.vue'], resolve);
const MobilePageConf = resolve => require(['./pages/operation/systeminfo/mobilepageconf/MobilePageConf.vue'], resolve);
const Comments = resolve => require(['./pages/operation/basic/comments/Comments.vue'], resolve);
const MenuItem = resolve => require(['./pages/operation/systeminfo/menuitem/MenuItem.vue'], resolve);
const MenuApp = resolve => require(['./pages/operation/systeminfo/menuapp/MenuApp.vue'], resolve);
const Functions = resolve => require(['./pages/operation/systeminfo/function/Function.vue'], resolve);
const RoleApproveState = resolve => require(['./pages/operation/systeminfo/roleapprovestate/RoleApproveState.vue'], resolve);
const InformationPublish = resolve => require(['./pages/operation/systeminfo/informationpublish/InformationPublish.vue'], resolve);
const DataDictionaryDetail = resolve => require(['./pages/operation/systeminfo/datadictionary/DataDictionaryDetail.vue'], resolve);
const ProvinceCity = resolve => require(['./pages/operation/systeminfo/provincecity/ProvinceCity.vue'], resolve);
const Role = resolve => require(['./pages/operation/systeminfo/role/Role.vue'], resolve);
const Parameters = resolve => require(['./pages/operation/basic/parameters/Parameters.vue'], resolve);
const Organize = resolve => require(['./pages/operation/basic/organize/Organize.vue'], resolve);
const User = resolve => require(['./pages/operation/basic/user/User.vue'], resolve);
const ApiTest = resolve => require(['./pages/ApiTest.vue'], resolve);
const AttachMent = resolve => require(['./pages/operation/basic/attachment/AttachMent.vue'], resolve);
const Project = resolve => require(['./pages/operation/basic/project/Project.vue'], resolve);
const CodeRule = resolve => require(['./pages/operation/systeminfo/coderule/CodeRule.vue'], resolve);
const ModuleConf = resolve => require(['./pages/operation/systeminfo/moduleconf/ModuleConf.vue'], resolve);
const SelectModuleConf = resolve => require(['./pages/operation/systeminfo/selectmoduleconf/SelectModuleConf.vue'], resolve);
const GlobConfig = resolve => require(['./pages/operation/systeminfo/globconfig/GlobConfig.vue'], resolve);
const CommonDataDictionary = resolve => require(['./pages/operation/basic/commondatadictionary/CommonDataDictionary.vue'], resolve);
const ModuleColConfig = resolve => require(['./pages/operation/systeminfo/modulecolconfig/ModuleColConfig.vue'], resolve);
const SqlState = resolve => require(['./pages/operation/systeminfo/sqlstatementconf/SqlState.vue'], resolve);
const supperModule = resolve => require(['./pages/config/dynamicmodule/SupperModule.vue'], resolve);
const SecurityApiOrder = resolve => require(['./pages/operation/systeminfo/securityapiorder/SecurityApiOrder.vue'], resolve);
const HomePageConf = resolve => require(['./pages/operation/systeminfo/homepageconf/HomePageConf.vue'], resolve);
const reportorderconf = resolve => require(['./pages/operation/systeminfo/reportorderconf/ReportOrderConf.vue'], resolve);
const ordershow = resolve => require(['./pages/OrderShow.vue'], resolve);
const PrintModelConf = resolve => require(['./pages/operation/systeminfo/printmodelconf/PrintModelConf.vue'], resolve);

// const userModuleConf = resolve => require(['./pages/operation/systeminfo/moduleconf/userModuleConf.vue'], resolve);
// const userSelectModuleConf = resolve => require(['./pages/operation/systeminfo/selectmoduleconf/userSelectModuleConf.vue'], resolve);
// const userSqlState = resolve => require(['./pages/operation/systeminfo/sqlstatementconf/userSqlState.vue'], resolve);
// const userMobilePageConf = resolve => require(['./pages/operation/systeminfo/mobilepageconf/userMobilePageConf.vue'], resolve);
// const userHomePageConf = resolve => require(['./pages/operation/systeminfo/homepageconf/userHomePageConf.vue'], resolve);
Vue.use(Router);
export default new Router({
mode:"hash",
routes:[
   {path: '/Login', component: Login },
   {path: '/Index', component: Index },
   {path: '/demo', component: demo,name: '测试页面'  },
   {path: '/RedirectPage', component: RedirectPage },
   {path: '/Page404', component: Page404 },
   {
    path: '/ReportCenter',
    component: ReportCenter,
    name: '报表中心',
    children: [
      { path: 'home', component: Home, name: '首页'  },
      { path: 'suppermodule/:systemName/:tableName/:pageName', component: supperModule, name: '模块容器1'},
      { path: 'ordershow', component: ordershow, name: '单据查看' },
      { path: '/redirect/:path*', component: () => import('@/pages/config/redirect/index') },
      {path: '*',component: Page404} 
    ]
   },
   {
    path: '/',
    component: Main,
    name: '易龙快速开发平台',
    children: [
          { path: 'home', component: Home, name: '门户'  },
          { path: 'apitest', component: ApiTest,name: 'api测试页面'  },
          { path: 'menuItem', component: MenuItem, name: '菜单管理' },
          { path: 'menuApp', component: MenuApp, name: '应用系统' },
          { path: 'function', component: Functions, name: '功能管理' },
          { path: 'reportorderconf', component:reportorderconf, name: '单据菜单管理' },
          { path: 'role', component: Role, name: '角色管理' },
          { path: 'approveFlow', component: RoleApproveState, name: '审批管理' },
          { path: 'moduleColInfoConfig', component: ModuleColConfig, name: '模块表对应信息' },
          { path: 'DataDictionarys', component: DataDictionaryDetail, name: '字典数据' },
          { path: 'InformationPublish', component: InformationPublish, name: '系统文档管理' },
          { path: 'parameters', component: Parameters, name: '组织属性' },
          { path: 'organize', component: Organize, name: '组织机构管理' },
          { path: 'provinceCity', component: ProvinceCity, name: '省市管理' },
          { path: 'user', component: User, name: '用户管理' },     
          { path: 'attachment', component: AttachMent, name: '文件上传' },
          { path: 'project', component: Project, name: '项目信息维护' },
          { path: 'comments', component: Comments, name: '评论管理' },
          { path: 'coderule', component: CodeRule, name: '编码管理' },
          { path: 'commondatadictionary', component: CommonDataDictionary, name: '单位字典库' },
          { path: 'globconfig', component: GlobConfig, name: '全局配置' },
          { path: 'mobilepageconf', component: MobilePageConf, name: 'APP配置' },
          { path: 'moduleconf', component: ModuleConf, name: '模块配置' },
          { path: 'sqlStatementConf', component: SqlState, name: 'SQL语句配置' },
          { path: 'securityapiorder', component: SecurityApiOrder, name: 'API授权管理' },
          { path: 'selectmoduleconf', component: SelectModuleConf, name: '数据选择框' },
          { path: 'homePageConf', component: HomePageConf, name: '门户配置'},
          { path: 'printmodelconf', component: PrintModelConf, name: '打印模板管理'},
          { path: '/siteStructure', component: () => import('@/pages/nonConfPage/siteStructure/siteStructure') },
          // { path: 'userHomePageConf', component: userHomePageConf, name: '门户自定义配置'},
          // { path: 'userSQLStatementConf', component: userSqlState, name: 'SQL语句自定义配置' },
          // { path: 'userModuleConf', component: userModuleConf, name: '模块自定义配置' },
          // { path: 'userSelectModuleConf', component: userSelectModuleConf, name: '自定义数据选择框' },
          // { path: 'userMobilePageConf', component: userMobilePageConf, name: 'APP自定义配置' },
          { path: 'suppermodule/:systemName/:tableName/:pageName', component: supperModule, name: '模块容器'},
          { path: '/redirect/:path*', component: () => import('@/pages/config/redirect/index') },
          {path: '*',component: Page404} 
    ]
   },
  {path: '*',component: Page404} 
  ]
});


