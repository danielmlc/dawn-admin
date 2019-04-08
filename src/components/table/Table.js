 import util from '@/common/js/util.js';
 export default {
    name: 'yl-table',
    data () {
        return {
            defaultAttr: {
                table: {  // table的默认属性
                    height:'100%',
                    border:true,
                    stripe:true,
                    size:'small',
                    highlightCurrent:true,   //默认配置为单选
                    style:{width:'100%',height:'100%'},
                },
                column: { // column的默认属性
                    showOverflowTooltip: true,
                    headerAlign: 'left',
                    resizable: true,
                    sortable:true
                }
            },
            pageChange:0
        }
    },
    props: {
        // table的配置,具体见README.md
            configs: {
                type: Object,
                required: true,
              },
            input:{
                    type: Object,
                    required: true,
                    },
           tableloading:{
                    type: Boolean,
                    default:false
                },
           pagination:{
                    type: Object,
                    default:function(){
                        return  {};
                    }
                }, 
         
    },
    computed:{
        paginationAttr:{
            get(){
                let pagination=util.getLocalStorage('SysGlobConf').pagination;
                if(this.pagination.layout!==undefined){
                    return Object.assign(pagination,this.pagination )
                }else{
                    return pagination;
                } 
            }
        },
    },
    methods: {
        /**
        * 提供element table 的clearSelection方法
        * @param selection
        */
        clearSelection (selection) {
            this.$refs.table.clearSelection(selection)
        },
        /**
        * 提供element table 的toggleRowSelection方法
        * @param row
        * @param selected
        */
        toggleRowSelection (row, selected) {
            this.$refs.table.toggleRowSelection(row, selected)
        },
        /**
        * 转发element table的事件
        * @param action
        * @returns {Function}
        */
        handleEvent (action) {
        const _self = this
            return function () {
                _self.$emit(action, ...arguments)
            }
        },
        handleSizeChange(val) {
            this.input.maxResultCount=val
            this.pageChange=val;
            this.input.skipCount=val*(this.input.draw-1)
            this.$emit('reload')
        },
        handleCurrentChange(val) {
            this.input.draw=val
            this.input.skipCount=this.input.maxResultCount*(val-1)
            this.$emit('reload')
        },
        renderItem(columns,columnDefaultAttr){
            return columns.map((column,index)=>{
                const columnAttr = Object.assign({}, columnDefaultAttr, column.attr)
                if(column.isParent){
                    //父节点
                    return   <el-table-column
                                label={columnAttr.label}
                                render-header={columnAttr.renderHeader}
                                resizable={columnAttr.resizable}
                                formatter={columnAttr.formatter}
                                header-align={columnAttr.headerAlign}
                                class-name={columnAttr.className}
                                label-class-name={columnAttr.labelClassName}
                            >
                                {
                                 this.renderItem(column.items,columnDefaultAttr)
                                }
                            </el-table-column>
                    }else{
                        //子节点
                        return <el-table-column
                                type={columnAttr.type}
                                index={columnAttr.index}
                                column-key={columnAttr.columnKey}
                                label={columnAttr.label}
                                prop={columnAttr.prop}
                                width={columnAttr.width}
                                min-width={columnAttr.minWidth}
                                fixed={columnAttr.fixed}
                                render-header={columnAttr.renderHeader}
                                sortable={columnAttr.sortable}
                                sort-method={columnAttr.sortMethod}
                                sort-by={columnAttr.sortBy}
                                sort-orders={columnAttr.sortOrders}
                                resizable={columnAttr.resizable}
                                formatter={columnAttr.formatter}
                                show-overflow-tooltip={columnAttr.showOverflowTooltip}
                                align={columnAttr.align}
                                header-align={columnAttr.headerAlign}
                                class-name={columnAttr.className}
                                label-class-name={columnAttr.labelClassName}
                                selectable={columnAttr.selectable}
                                reserve-selection={columnAttr.reserveSelection}
                                filters={columnAttr.filters}
                                filter-placement={columnAttr.filterPlacement}
                                filter-multiple={columnAttr.filterMultiple}
                                filter-method={columnAttr.filterMethod}
                                filtered-value={columnAttr.filterValue}
                                >
                                    {
                                        columnAttr.scopedSlot ? this.$scopedSlots[columnAttr.scopedSlot] : ''
                                    }
                                </el-table-column>
                    }
                
                })  
            },

    },
    mounted(){
    },
    render() {
        const tableAttr = Object.assign({}, this.configs.table.default || this.defaultAttr.table, this.configs.table.attr || {}) // 表格属性
        const columns = this.configs.columns  // 列配置
        const columnDefaultAttr = this.configs.columnDefault || this.defaultAttr.column // 列默认配置
        if(this.pageChange>0){
            this.input.maxResultCount=this.pageChange;
        }else{
             this.input.maxResultCount=this.paginationAttr.pageSize;
        }
        return  <yl-layout>
                    <div slot="fristbox" class="flexbox" style="margin:0px 10px;">
                        <el-table ref="table" 
                                v-loading={this.tableloading}
                                element-loading-text="加载中..."
                                style={tableAttr.style}
                                data={tableAttr.data.data}
                                height={tableAttr.height}
                                max-height={tableAttr.maxHeight}
                                stripe={tableAttr.stripe}
                                border={tableAttr.border}
                                size={tableAttr.size}
                                fit={tableAttr.fit}   
                                show-header={tableAttr.showHeader}
                                highlight-current-row={tableAttr.highlightCurrent}
                                current-row-key={tableAttr.currentRowKey}
                                row-class-name={tableAttr.rowClassName}
                                row-style={tableAttr.rowStyle}
                                row-key={tableAttr.rowKey}
                                empty-text={tableAttr.emptyText}
                                cell-class-name={tableAttr.cellClassName}
                                cell-style={tableAttr.cellStyle}
                                header-row-class-name={tableAttr.headerRowClassName}
                                header-row-style={tableAttr.headerrowStyle}
                                header-cell-class-name={tableAttr.headerCellClassName}
                                header-cell-style={tableAttr.headerCellStyle}
                                default-expand-all={tableAttr.defaultExpandAll}
                                expand-row-keys={tableAttr.expandRowKeys}
                                default-sort={tableAttr.defaultSort}
                                tooltip-effect={tableAttr.tooltipEffect}
                                show-summary={tableAttr.showSummary}
                                sum-text={tableAttr.sumText}
                                summary-method={tableAttr.summaryMethod}
                                span-method={tableAttr.spanMethod}
                                select-on-indeterminate={tableAttr.selectOnIndeterminate}
                                on-select={this.handleEvent('select')}
                                on-select-all={this.handleEvent('select-all')}
                                on-selection-change={this.handleEvent('selection-change')}
                                on-cell-mouse-enter={this.handleEvent('cell-mouse-enter')}
                                on-cell-mouse-leave={this.handleEvent('cell-mouse-leave')}
                                on-cell-click={this.handleEvent('cell-click')}
                                on-cell-dblclick={this.handleEvent('cell-dblclick')}
                                on-row-click={this.handleEvent('row-click')}
                                on-row-contextmenu={this.handleEvent('row-contextmenu')}
                                on-row-dblclick={this.handleEvent('row-dblclick')}
                                on-header-click={this.handleEvent('header-click')}
                                on-header-contextmenu={this.handleEvent('header-contextmenu')}
                                on-sort-change={this.handleEvent('sort-change')}
                                on-filter-change={this.handleEvent('filter-change')}
                                on-current-change={this.handleEvent('current-change')}
                                on-header-dragend={this.handleEvent('header-dragend')}
                                on-expand-change={this.handleEvent('expand-change')}
                                >
                                    { 
                                    this.renderItem(columns,columnDefaultAttr)
                                    }
                        </el-table>
                    </div>
                    <div slot="secondbox" >
                        <yl-toolbar>
                                <el-pagination   
                                    on-size-change={this.handleSizeChange}
                                    on-current-change={this.handleCurrentChange}
                                    current-page={tableAttr.data.draw}
                                    page-sizes={ this.paginationAttr.pageSizes}
                                    page-size={this.input.maxResultCount}
                                    prev-text={this.paginationAttr.prevText}
                                    next-text={this.paginationAttr.nextText}
                                    disabled={this.paginationAttr.disabled}
                                    total={tableAttr.data.recordsFiltered}
                                    layout={ this.paginationAttr.layout}>
                                </el-pagination>
                        </yl-toolbar>
                    </div>
              </yl-layout>
    }
}

