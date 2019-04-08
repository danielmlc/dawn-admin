export default {
    name: 'structList',
    data(){
        return {
            structdata:[]
        }
    },
    props:{
        list:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    methods:{
        _edit(i){
            this.$emit('editEvent',i)
        },
        _delete(i){
            this.$emit('deleteEvent',i)
        },
        _publish(i){
            this.$emit('publishEvent',i)
        },
        _getClass(val){
            if(val==='空白节点')return 'site-blank';
            else return 'site-shortlist';
            // if(val==='短文本列表')return 'site-shortlist';
            // if(val==='图文列表')return 'site-imglist';
            // if(val==='主从数据列表')return 'site-complexlist'
        },  
        renderBtn(i){
            if(i.code!=='空白节点'){
                return <span  style="padding-right:5px"> 
                            <el-button size="mini" 
                                on-click={() => this._publish(i)} 
                                type="warning" 
                                icon="el-icon-tickets" 
                                circle></el-button>
                        </span>
            }
        },
        _randerHtml(list){
            if(list.length){
            return list.map((i,index)=>{
                  if(i.isLeaf){
                      return  <div class="site-item">
                                    <div  class={this._getClass(i.code)}>
                                            {i.text}
                                        <span class="site-span">
                                            {'（'+i.code+'）'}
                                        </span>
                                        <div style="float:right;width:120px;">
                                        <span  style="padding-right:3px"> 
                                            <el-button 
                                                    on-click={() => this._edit(i)}
                                                    type="primary" 
                                                    size="mini" 
                                                    icon="el-icon-edit" 
                                                    circle>
                                            </el-button>
                                        </span>
                                        <span  style="padding-right:3px"> 
                                            <el-button 
                                                    on-click={() => this._delete(i)}
                                                    type="danger" 
                                                    size="mini" 
                                                    icon="el-icon-delete" 
                                                    circle>
                                            </el-button>
                                         </span>
                                   
                                            {  
                                               this.renderBtn(i)
                                            }
                                        </div>
                                    </div>
                                </div>
                  }else{
                       let childhtml=''
                       if(i.children.length){
                          childhtml =this._randerHtml(i.children);
                       }
                       return <div class="site-item">
                                <div  class={this._getClass(i.code)}>
                                    {i.text}
                                    <span class="site-span">{'（'+i.code+'）'}</span>
                                   <div style="float:right;width:120px;">
                                   <span  style="padding-right:3px"> 
                                            <el-button 
                                                    on-click={() => this._edit(i)}
                                                    type="primary" 
                                                    size="mini" 
                                                    icon="el-icon-edit" 
                                                    circle>
                                            </el-button>
                                        </span>
                                        <span  style="padding-right:3px"> 
                                            <el-button 
                                                    on-click={() => this._delete(i)}
                                                    type="danger" 
                                                    size="mini" 
                                                    icon="el-icon-delete" 
                                                    circle>
                                            </el-button>
                                         </span>
                                        {  
                                            this.renderBtn(i)
                                        }
                                    </div>
                                </div>
                                <div class="site-children">
                                    {childhtml}
                                </div>
                             </div>
                  }
              })
            }else{
                return <div class="site-nonContent">请选择站点</div>
            }
          },
    },
    render(){
        return  <div class="site-content">
                    {
                       this._randerHtml(this.structdata)
                    }
                </div>
                
            
    },
    watch:{
        list:function(n){
            this.structdata=n;
        }
    }
}