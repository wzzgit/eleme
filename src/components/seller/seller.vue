<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
             <star :size="36" :score="seller.score" class="star"></star>
             <span class="text">({{seller.ratingCount}})</span>
             <span class="text">月售{{seller.sellCount}}单</span>
        </div>
       <ul class="remark">
         <li class="block">
           <h2>起送价</h2>
           <div class="content">
             <span class="stress">{{seller.minPrice}}</span><span class="size">元</span>
           </div>
         </li>
         <li class="block">
           <h2>商家配送</h2>
           <div class="content">
             <span class="stress">{{seller.deliveryPrice}}</span><span class="size">元</span>
           </div>
         </li>
         <li class="block">
           <h2>平均配送时间</h2>
           <div class="content">
             <span class="stress">{{seller.deliveryTime}}</span><span class="size">分钟</span> 
           </div>
         </li>
       </ul>
       <div class="favorite" @click="togglefav($event)"> 
         <span class="icon-favorite" :class="{'active':favorite}"></span>
         <span class="text" >{{favoratetext}}</span>
       </div>
      </div>
      <split></split>
      <div class="bulletin ">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
      <ul v-if="seller.supports" class="support">
          <li v-for="(item,index) in seller.supports" :key="index" class="item border-1px">
            <span class="icon" :class="sourceMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span> 
          </li>
      </ul>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picwrapper">
          <ul class="pic-list" ref="picS">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infos">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="(item,index) in seller.infos" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import star from 'components/star/star';
import split from 'components/split/split';
import {savetoLocal,loadLocal} from '../../common/js/store'
    export default{
      data(){
        return {
          favorite: loadLocal(this.seller.id,'favoo',false)
        
        }
      },
      props:{
        seller:{
          type:Object
        }
      },
      computed:{
          favoratetext(){
            return this.favorite?'已收藏':'收藏'
          }
      },
      components:{
        star,
        split
      },
      created(){
        this.sourceMap=['decrease','discount','special','invoice','guarantee'];
      },
      watch:{
        'seller'(){
          this._initScroll()
          this._initPic()
        },
      },
      mounted(){
        this._initScroll();
        this._initPic();
       
      },
      methods:{
        _initScroll(){
            this.$nextTick(()=>{
            this.scroll=new BScroll(this.$refs.seller,{click:true})      
            })
          
        },
        _initPic(){   
            let picwidth =120
            let margin = 6;
            let width= (picwidth+margin)*this.seller.pics.length-margin;
            this.$refs.picS.style.width = width+'px';
            this.$nextTick(()=>{
              this.picScroll = new BScroll(this.$refs.picwrapper,{
                click:true,
                scrollX:true,
                eventPassthrough:'vertical'
              })
            })         
        },
        togglefav(event){
          this.favorite=!this.favorite;
          savetoLocal(this.seller.id,'favoo',this.favorite)
        }      
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import '../../common/stylus/mixin.styl'
.seller
    position absolute 
    top 184px
    left 0
    overflow hidden
    width 100%
    bottom 0
  .seller-content
    .overview
      padding 18px
      position relative
      .favorite
        position absolute
        right 11px
        top 18px
        text-align center 
        width 50px
        .icon-favorite
           display block 
           margin-bottom 4px
           line-height 24px
           font-size 24px
           color #d4d6d9
           &.active
            color rgb(240,20,20)
          .text
            line-height 10px
            font-size 10px
            color rgb(77,85,93)
      .title
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
        margin-bottom 8px
      .desc
        font-size 0
        padding-bottom 18px
        border-1px(rgba(7,17,27,.1))
        .star 
          display inline-block
          vertical-align top
          margin-right 8px
        .text
          margin-right 12px
          vertical-align top
          font-size 10px
          color rgb(77,85,93)
          line-height 14px
      .remark
        display flex
        padding 18px 0 0 0;
        .block
          flex 1
          text-align center 
          border-right 1px solid rgba(7,17,27,.1)
          &:last-child
            border-right none 
          h2  
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
            margin-bottom 4px
          .stress,.size
            font-size 24px
            font-weight 200
            color rgb(7,17,27)
            line-height 24px
          .size 
            font-size 10px
            line-height 10px
    .bulletin
      padding 18px 18px 0px 18px
      .title
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
        margin-bottom 8px       
      .content-wrapper
        padding 0 12px 16px
        border-1px(rgba(7,17,27,.1))
        .content
          font-size 12px
          font-weight 200
          line-height 24px
          color rgb(240,20,20)
    .support
      padding 0 18px
      .item
        padding 16px 12px
        border-1px(rgba(7,17,27,.1))
        font-size 0
        &:last-child
          border-none()
        .icon
          display inline-block
          vertical-align top
          width 16px
          height 16px
          margin-right 6px
          background-size 16px 16px
          &.decrease
              bg-image('decrease_4')
          &.discount
              bg-image('discount_4')
          &.guarantee
              bg-image('guarantee_4')
          &.invoice
              bg-image('invoice_4')
          &.special
              bg-image('special_4')
          background-size:16px 16px
        .text
          vertical-align top
          font-size 12px
          font-weight 200
          color rgb(7,17,27)
          line-height 16px
    .pics
      padding 18px
      .title
        margin-bottom 12px
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap 
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin-right 0
    .infos
        padding 18px 18px 0 18px
        .title  
          padding-bottom 12px
          border-1px(rgba(7,17,27,.1))
        .info-item
          padding 16px 12px
          line-height 16px
          border-1px(rgba(7,17,27,.1))
          font-size 12px
          color rgb(7,17,27)
          font-weight 200
          &:last-child
            border-none()
</style>
