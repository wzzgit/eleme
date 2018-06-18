<template>
  <div class="header">
     <div class="content-wrapper">
             <div class="avatar">
                 <img :src="seller.avatar" width="64" height="64"/>
             </div>
             <div class="content">
                 <div class="title">
                     <span class="brand"></span>
                     <span class="name">{{seller.name}}</span>
                 </div>
                 <div class="description">
                     {{seller.description}}/{{seller.deliveryTime}}分钟送达
                 </div>
                 <div v-if="seller.supports" class="support">
                    <span class="icon" :class="sourceMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                 </div>
                <div v-if="seller.supports" class="support-count">
                    <span class="count" @click="showDetail">{{seller.supports.length}}个</span>
                    <i class="icon-keyboard_arrow_right"></i>
                </div>
            </div>
     </div>
     <div class="bulletin-wrapper" @click="showDetail">
         <span class="bulletin-title"></span>
         <span class="bulletin-text">{{seller.bulletin}}</span>
         <i class="icon-keyboard_arrow_right"></i>
     </div>
     <div class="background">
         <img :src="seller.avatar" alt="" width="100%" height="100%">
     </div>
     <transition name="fade">
     <div v-show="detailShow" class="detail">
        <div class="detail-wrapper" clearfix>
            <div class="main">
               <h1 class="name">{{seller.name}}</h1>
               <div class="star-wrapper">
                   <star :score="5" :size="36" ></star>
               </div>
               <div class="title">
                   <div class="line"></div>
                   <div class="text">优惠信息</div>
                   <div class="line"></div>
               </div>
               <ul v-if="seller.supports" class="cheapDetail">
                   <li v-for="(item,index) in seller.supports" :key="index" class="">
                      <span class="icon" :class="sourceMap[seller.supports[index].type]"></span>
                      <span class="text">{{seller.supports[index].description}}</span> 
                   </li>
               </ul>
               <div class="title">
                   <div class="line"></div>
                   <div class="text">商家公告</div>
                   <div class="line"></div>
               </div>
               <div class="bulletin">
                   <p>{{seller.bulletin}}</p>
               </div>          
            </div>
        </div>
        <div @click="closeDetail" class="close">
            <i class="icon-close"></i>
        </div>
     </div>
     </transition>
 </div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star'
export default {
  props:{
      seller:{
          type:Object
      }
  },
  data(){
      return {
          detailShow:false
      }
  },
  mounted(){
      this.sourceMap=['decrease','discount','special','invoice','guarantee'];
  },
  methods:{
      showDetail(){
          this.detailShow=true
      },
      closeDetail(){
          this.detailShow=false
      }
  },
  components: {
      star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
    .fade-enter-active, .fade-leave-active 
        transition: opacity .5s
    .fade-enter, .fade-leave-to 
         opacity: 0;
    .header
        position relative
        color:#fff
        font-size:0
        overflow hidden
        background:rgba(7,17,27,0.5)
        .content-wrapper
            position relative
            padding:24px 12px 18px 24px
            .avatar
                display:inline-block
                vertical-align top
                img 
                    border-radius:2px
            .content
                display:inline-block
                font-size :14px
                margin-left 16px
                .title
                    margin:2px 0 8px 0
                    .brand
                        width:30px
                        height 18px
                        display:inline-block
                        bg-image('brand')
                        background-size:30px 18px
                        background-repeat:no-repeat
                        vertical-align top
                    .name
                        font-size 16px
                        color:rgb(255,255,255)
                        font-weight:bold
                        line-height 16px
                        margin-left:6px
                        vertical-align top
                .description
                    margin-bottom:10px
                    font size 12px
                    line-height 12px
                .support
                    .icon
                        display inline-block
                        width:12px
                        vertical-align top
                        height 12px  
                        margin-right:4px
                        background-size:12px 12px
                        background-repeat:no-repeat
                        padding 0px
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.guarantee
                            bg-image('guarantee_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')
                    .text
                        font size 12px
                        line-height 12px
                .support-count
                    position:absolute
                    right:12px
                    bottom 14px
                    padding:2px 8px
                    height 24px
                    line-height 24px
                    border-radius 14px
                    background:rgba(0,0,0,0.2)
                    text-align center 
                    .count
                        vertical-align top
                        font-size 10px
                    .icon-keyboard_arrow_right
                        font-size:10px
                        line-height 24px
                        margin-left:2px
        .bulletin-wrapper
            font-size:10px
            height 28px
            line-height 28px
            padding:0 22px 0 12px
            overflow hidden
            text-overflow:ellipsis
            white-space nowrap
            position relative
            background:rgba(7,17,27,0.2)
            .bulletin-title
                margin-top:8px
                vertical-align top
                display inline-block
                width:22px
                height 12px
                background-size:22px 12px
                bg-image('bulletin')
            .bulletin-text
                vertical-align top
                font-size:10px
                margin-left:4px
            .icon-keyboard_arrow_right
                position:absolute
                font size 10px
                right 12px
                top:10px  
        .background
            position:absolute
            top:0
            left 0
            width:100%
            height:100%
            z-index -1 
            filter:blur(10px)
        .detail
            position:fixed
            width:100%
            height:100%
            z-index 99
            overflow auto 
            background:rgba(7,17,27,.8)
            top:0
            left:0
            backdrop-filter:blur(10px)
            .detail-wrapper
                overflow auto
                width:100%
                min-height 100%
                .main
                    margin-top:64px
                    padding-bottom 64px
                    font-size:12px
                    .star-wrapper
                        margin-top 18px
                        padding 2px 0
                        text-align center
                    .name
                        line-height 16px
                        font-size:16px
                        font-weight:700
                        text-align center
                    .title
                        width:80%
                        display:flex
                        margin:28px auto 24px auto
                        .line
                            flex:1
                            position relative
                            border-bottom 1px solid rgba(255,255,255,.2)
                            top:-6px
                        .text 
                            padding:0 12px
                            font-weight 700
                            font-size 14px
                    .cheapDetail
                        width:80%
                        margin:24px auto 28px auto                     
                        li
                            margin:12px 0
                            padding:0 12px
                            .text
                                margin-left:6px
                                font-size 12px
                                line-height 16px
                                color:rgb(255,255,255)
                                font-weight 200
                            .icon
                                display inline-block
                                vertical-align top
                                width 16px
                                height 16px
                                background-repeat:no-repeat
                                &.decrease
                                    bg-image('decrease_1')
                                &.discount
                                    bg-image('discount_1')
                                &.guarantee
                                    bg-image('guarantee_1')
                                &.invoice
                                    bg-image('invoice_1')
                                &.special
                                    bg-image('special_1')
                                background-size:16px 16px   
                    .bulletin
                        width:80%;
                        margin:24px auto auto auto 
                        p
                            padding:0 12px
                            font-size:12px
                            font-weight 200
                            color:rgb(255,255,255)
                            line-height 24px
            .close
                position relative
                width 32px
                height 32px
                margin -64px auto 0 auto 
                clear:both
                font-size:32px

</style>                

