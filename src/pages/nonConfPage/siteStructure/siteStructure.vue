<template>
<yl-panelpage titleName="站点结构管理" >
<div slot="content">
    <yl-layout>
        <div slot="fristbox" >
          <yl-toolbar>
                <el-form  :inline="true"  >
                        <el-form-item class="form-content-vertical">
                           <yl-commonselect
                           v-model="searchModel.appKey"
                           placeholder="请选择站点"
                           clearable
                           :defaultProps="commonSel.defaultProps"
                           :apiConf="commonSel.apiConf"
                           @getCurrentNode="_getCurrentNode"
                           @clear="_clear"
                           style="width:300px;"
                           ></yl-commonselect>
                        </el-form-item>
                        <el-form-item class="form-content-vertical">
                            <el-button type="primary" icon="el-icon-search" size="small"   @click="_reload">查 询</el-button>
                        </el-form-item>
                </el-form>
          </yl-toolbar>
        <yl-toolbar>
            <el-button-group>
                    <el-button type="primary" icon="el-icon-plus" size="small"  v-permissionSetting="'TSingleTable02s.Create'"  @click="_add" >添加</el-button>
                    <!-- <el-button type="primary" icon="el-icon-edit"  size="small"  v-permissionSetting="'TSingleTable02s.Edit'"  :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                    <el-button type="danger"  icon="el-icon-delete" size="small"  v-permissionSetting="'TSingleTable02s.Delete'"   :disabled="selectRows.length===0" @click="_delete" >删除</el-button> -->
                </el-button-group>
        </yl-toolbar>
        </div>
         <div slot="secondbox" class="flexbox" 
            v-loading="loading" 
            element-loading-text="加载中">
                <div class="site-warpper">
                    <structList 
                        :list="structData"
                        @editEvent="_edit"
                        @deleteEvent="_delete"
                        @publishEvent="_publish"
                    ></structList>
                   
                </div>
               
         </div>
    </yl-layout>
    <!--编辑界面-->
         <el-dialog ref="mainDialog" :title="searchModel.appName+'编辑'" :visible.sync="addFormVisible" width="40%"  top="5%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <Edit :selectRow="currentRows" :appInfo="searchModel" @close="_close"  v-if="addFormVisible"></Edit>
         </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import fetch from '@/api/fetch.js'
import Edit from './Edit';
import structList from './structList'
export default {
    data(){
        return {
                loading:false,
                currentRows:{},
                searchModel:{
                       appKey:'',  
                       appName:''
                    },
                commonSel:{
                    defaultProps: {
                        text: "v_Col1",
                        value: "id"
                    },
                    apiConf:{
                        url: "/api/services/app/ssingletable06/getMainPageList",
                        query: [
                            {
                            "key": "B_Col1",
                            "op": "EQ",
                            "value": 1
                            }
                        ],
                        "sorting": "id desc",
                        "maxRows": 1000
                    },
                },
                addFormVisible:false,
                structData:[],
                selectRows:[],
            }
    },
     computed: {
        },
    methods:{
        _getCurrentNode(node){
            this.searchModel.appName=node[0].v_Col1;
            this._reload();
        },
        _clear(){
            this.searchModel.appKey='';
            this.searchModel.appName='';
            this.structData=[];
        },
        _getMenuPageList(){
            let _this=this;
                this.loading=true; //开启加载
                fetch({
                            url:'/api/services/app/tsingletable02/GetTreeList',
                            data:{
                               parentId:"00000000-0000-0000-0000-000000000000",
                               orgId:this.searchModel.appKey
                             },
                            method:'post'
                        }).then(data =>{
                            if(data.success){
                                this.structData=data.result[0].children;
                            }
                            else {
                                   this.$message.error('获取数据失败！'+data.error.message);
                            }
                          this.loading=false;
                }).catch(function(error){
                       _this.loading=false;
                });
        },
        _reload(){
            this._getMenuPageList();
        },
        _add(){
            if(this.searchModel.appKey){
                this.addFormVisible=true;
                this.currentRows={};
            }else{
                this.$message.warning('请选择站点！')
            }
        },
        _delete(i){
            this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning'
            }).then(() => {
                var obj={}; 
                obj.id=i.id;
                obj.queryConditionItem=[]
                fetch({
                    url:"api/services/app/tSingleTable02/deleteMainObject",
                    method:'post',
                    data:obj
                }).then(data =>{
                        if(data.success){
                                this._reload();
                                this.$notify({
                                    title: '成功',
                                    message: '删除数据成功！',
                                    type: 'success'
                                    });
                            }
                            else {
                                this.$notify.error({
                                    title: '错误',
                                    message: '删除数据失败！'+data.error.message,
                                    });
                            }
                });
            }).catch(()=>{});
        },
        _edit(i){
            this.addFormVisible=true;
           this.currentRows=i;
        },
        _publish(i){
            const siteParams={
                appKey:this.searchModel.appKey,
                appName:this.searchModel.appName,
                nodeFullName:i.fullName,
                nodeName:i.text,
                nodeId:i.id,
            }    
            sessionStorage.setItem('siteParams',JSON.stringify(siteParams));
            if(i.code==='内容片段'){
                this.goUrl('/suppermodule/pages/ssingletable07/index')
            }else if(i.code==='图文列表'){
                 this.goUrl('/suppermodule/pages/ssingletable08/index')
            }else if(i.code==='主从数据列表'){

            }
        },
        _close(c){
            if(c){
                this.addFormVisible=false;
                this._reload();
            }
        },
        
       

    },
    components:{
         Edit,
         structList
        },
    mounted(){
        this._reload();
    },
    watch:{
       
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" >
    .site-warpper
        margin 10px
        padding 10px
        border 1px solid #eee
        padding 10px
        .site-content
            font-size 16px
            color #909399
            .site-item
                padding 10px 0px 10px 15px 
                border-left 5px solid #E6A23C
                border-bottom 2px solid #E6A23C
                .site-blank
                    height 35px
                    line-height 35px
                    cursor pointer
                    &:hover
                        background #E4E7ED
                .site-shortlist
                    height 35px
                    line-height 35px
                    cursor pointer
                    background #F2F6FC
                    &:hover
                        background #E4E7ED
                .site-children
                    padding-left 10px
                .site-span
                    font-size 14px
        .site-nonContent
            color #909399
            font-size 14px
            text-align center
            height 120px
</style>
