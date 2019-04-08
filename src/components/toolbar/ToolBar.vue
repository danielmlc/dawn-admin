<template>
<div class="toolbar" v-if="isShow"> 
    <slot>
    </slot>
</div>
</template>

<script type="text/babel">
export default {
    data(){
		return {
            isShow:true,
		}
    },
    mounted(){
        
    },
    watch:{
        
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .toolbar
        padding 8px
        box-sizing border-box
        display: flex
        align-items: center
</style>
