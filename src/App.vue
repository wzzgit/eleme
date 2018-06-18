<template>
  <div id="app">
   <headers :seller="seller"></headers>
   <div class="tab border-1px">
     <div class="tab-item"> <router-link to="/goods">商品</router-link></div>
     <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
     <div class="tab-item"> <router-link to="/seller">商家</router-link></div>
   </div>
   <keep-alive><router-view :seller="seller" ></router-view></keep-alive>
   
  </div>
</template>

<script>
  import headers from './components/header/header'
  import {urlParse} from './common/js/util'
  export default{
    data () {
      return {
        seller: {
          id:(()=>{
            let query=urlParse();
            return query.id;
          })()
        }
      }
    },
    created(){
      this.$http.get('/api/seller?id='+this.seller.id)
      .then(function(res){   
            this.seller=res.body.data;
            this.seller = Object.assign({},this.seller,res.body.data)
      })
    },
    components:{
      headers:headers
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl'
  #app 
    .tab 
      display:flex
      width:100%
      height:40px
      border-1px(rgba(7,17,27,0.1))
      line-height:40px
      .tab-item
        flex:1
        text-align:center 
        & >a 
          display:block
          font-size:14px
          color:rgb(77,85,93)
          &.active
            color:rgb(240,20,20)
</style>
