<template>
<div>
<el-form  :model="formModel.order"  :rules="rules"  status-icon   ref="formModel" label-width="100px" >
 <el-form-item label="上级节点" prop="parentId">
      <yl-commontree
            v-model="formModel.order.parentId"
            placeholder="选择父节点"
            code="tsingletable02"
            displaytoolBar
            :orgId="appInfo.appKey"
            :defaultText="formModel.order.extensionTwo"
            @getCurrentNode="_getCurrentNode"
      ></yl-commontree>
  </el-form-item>
    <el-form-item label="节点名称" prop="name">
      <el-input v-model="formModel.order.name" ></el-input>
  </el-form-item>
    <el-form-item label="节点类型" prop="extensionOne">
      <dataDictionaryForSel 
        :code="'ContentType'" 
        v-model="formModel.order.extensionOne"  
        :placeholder="'请选择节点类型'" >
      </dataDictionaryForSel>
  </el-form-item>
  <el-row>
    <el-col :span="12">
        <el-form-item label="末级节点" prop="isLeaf">
                <el-switch  v-model="formModel.order.isLeaf"
                            active-text="是"
                            inactive-text="否">
                </el-switch>
        </el-form-item>
    </el-col>
    <el-col :span="12">
       <el-form-item label="排序" prop="sortCode" >
            <el-input-number v-model="formModel.order.sortCode" :min="1" ></el-input-number>
      </el-form-item>
    </el-col>
  </el-row>
   
  <el-form-item label="备注" prop="v_Col6">
      <el-input 
        v-model="formModel.order.v_Col6"
        type="textarea"
        :rows="2"
        ></el-input>
  </el-form-item>
  <el-form-item style="text-align:right;" >
      <el-checkbox v-model="isClose" style="padding-right:10px">保存后关闭</el-checkbox>
      <el-button icon="el-icon-refresh" @click="_resetForm">重置</el-button>
      <el-button icon="el-icon-circle-check-outline" type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
  </el-form-item>
  
</el-form>
</div>
</template>

<script type="text/babel">
import dataDictionaryForSel from '@/ocomponents/datadictionary/dataDictionaryForSel'
import fetch from '@/api/fetch.js'
export default {
    data(){
    return{
        isClose:true,
        formModel:{
            order:{
                id:'',
                orgId:'',
                name:'',
                fullName:'',
                isLeaf:false,
                treeCode:'',
                parentId:'',
                extensionOne:'',
                extensionTwo:'',
                extensionFour:false,
                v_Col1:'',
                v_Col2:'',
                sortCode:1
            }
        }, 
         rules: {
            parentId: [
              { required: true, message: '上级节点不能为空', trigger: 'change' }
            ],
            name: [
              { required: true, message: '节点名称不能为空！', trigger: 'blur' }
            ],
         },
        loading:false
       }       
    },
    props:{
        selectRow:{},
        appInfo:{},
        isVisible:false
    },
    components:{
         dataDictionaryForSel,
    },
    methods:{
        _complete(close) {
            this.$emit('close',close);
        },
        _getCurrentNode(node){
            if(node.isLeaf){
                 this.$message.warning('不能选择子节点！');
                 this.formModel.order.parentId='';
            }else{
                this.formModel.order.extensionTwo=node.text;
            }
        },
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    this.loading=true;
                    this.formModel.order.orgId=this.appInfo.appKey;
                    this.formModel.order.v_Col2=this.appInfo.appName;
                    fetch({
                            url:'/api/services/app/tsingletable02/createOrUpdateMainObject',
                            data:this.formModel,
                            method:'post'
                        }).then(data=>{
                    if(data.success){
                            this.$notify({
                                title: '成功',
                                message: '保存数据成功！',
                                type: 'success'
                                });
                            //关闭面板
                            this._complete(this.isClose);
                        }
                        else {
                            this.$message.error('失败！'+data.error.message);
                        }
                            this.loading=false;
                    }).catch(function(error){
                        this.loading=false;
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                
            });
         },
         _forItem(id){
             if(id){
                 let params={};
                 params.queryConditionItem=[
                        {dataField:"Id",op:"EQ",dataValue:id},
                 ];
                 params.sorting='';
                 fetch({
                            url:'/api/services/app/tsingletable02/getMainObjectForEdit',
                            data:params,
                            method:'post'
                        }).then(data=>{
                            if(data.success&&data.result){
                                this.formModel.order=data.result.order;
                            }
                        })
             }
         }, 
         _resetForm() {
                this.$refs.formModel.resetFields();
         },
        
    },
     mounted(){
       this._forItem(this.selectRow.id)
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
