<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore" class="starC"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore" class="starC"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery">
              <span class="title">送达时间</span>
              <span class="deliverytime">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
         <ratingselect @ratingtype="ratingtypes" @changeonlyContent="changeonlyContents"  :selectType="selectType" :onlyContent="onlyContent"  :ratings="ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul>
              <li v-show="isshow(rating.rateType,rating.text)" v-for="(rating,index) in ratings" :key="index" class="rating-item">
                <div class="avatar">
                  <img :src="rating.avatar" width="28" height="28" alt="">
                </div>
                <div class="content">
                  <h1 class="username">{{rating.username}}</h1>
                  <div class="star-wrapper">
                    <star :size="24" :score="rating.score" class="star"></star>
                    <span class="deliverytime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                 </div>
                 <p class="text">{{rating.text}}</p>
                 <div class="recommend" v-show="rating.recommend&& rating.recommend.length">
                      <span class="icon-thumb_up"></span>
                      <span v-for="(recomm,index) in rating.recommend" :key="index" class="item">{{recomm}}</span>
                 </div>
                 <div class="time">{{rating.rateTime | formatDates}}</div>
                </div>
              </li>
            </ul>
          </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import split from 'components/split/split';
import star from 'components/star/star';
import ratingselect from 'components/ratingselect/ratingselect';
import {formatDate} from '../../common/js/date';
const good = 0;
const bad = 1;
const all = 2;
    export default {
      props:{
        seller:{
          type:Object
        }
      },
      data(){
        return {
          selectType:all,
          onlyContent:true,
          ratings:[]
        }
      },
      filters:{
            formatDates(time){
                let times= new Date(time)
                return formatDate(times,'yyyy-MM-dd hh:mm')
            }
      },
      created(){
        this.$http.get('/api/ratings')
        .then((res)=>{
          let response=res.body;
          if(response.errno===0){
            this.ratings=response.data;
            this.$nextTick(()=>{
              this.scroll=new BScroll(this.$refs.ratings,{click:true})
            })
          }
        })
      },
      components:{
        split,
        star,
        ratingselect
      },
      methods:{
            ratingtypes(type){
                this.selectType=type;
                this.$nextTick(()=>{
                    this.scroll&&this.scroll.refresh(); 
                }) 
            },
            changeonlyContents(type){       
                 this.onlyContent=type;
                this.$nextTick(()=>{
                    this.scroll&&this.scroll.refresh(); 
                })            
            },
           isshow(type,text){
              if(this.onlyContent && !text){
                return false;
              }
              if(this.selectType == all){
                return true;
              }else{
                return this.selectType == type;
              }
           }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import '../../common/stylus/mixin.styl'
.ratings
  position absolute 
  top 184px
  left 0
  overflow hidden
  width 100%
  bottom 0
  .overview
    display flex
    padding 18px 0
    .overview-left
      padding 6px 0
      flex 0 0 137px
      width 137px
      border-right 1px solid rgba(7,17,27,.1)
      text-align center 
      @media only screen and (max-width:320px){
        flex 0 0 120px
        width 120px
      }
      .score  
        margin-bottom 6px
        font-size 24px
        line-height 28px
        color rgb(255,153,0)
      .title
        margin-bottom 8px
        font-size 12px
        color rgb(7,17,27)
        line-height 12px
      .rank
        font-size 10px
        line-height 10px
        color rgb(147,153,159)
        
    .overview-right
      flex 1
      padding 6px 0 6px 24px
      @media only screen and (max-width:320px){
        padding-left 6px
      }
      .score-wrapper
        margin-bottom 8px 
        font-size 0      
        .title
          display inline-block
          vertical-align top
          font-size 12px
          color rgb(7,17,27)
          line-height 18px
        .score
          display inline-block
          vertical-align top
          font-size 12px
          color rgb(255,153,0)
          line-height 18px
        .starC
          display inline-block
          vertical-align top
          margin 1px 12px
          @media only screen and (max-width:320px){
            margin 1px 6px
          }
      .delivery
        .title
          font-size 12px
          color rgb(7,17,27)
          line-height 18px   
        .deliverytime
          margin-left 12px
          font-size 12px
          color rgb(147,153,159)
          line-height 18px
  .rating-wrapper
    padding 0 18px
    .rating-item
      display flex
      padding 18px 0
      border-1px(rgba(7,17,27,.1))
      .avatar
        width 28px
        height 28px
        margin-right 12px
        img
          border-radius 50%
      .content  
        position relative
        flex 1
        .username
          line-height 12px
          font-size 10px
          color rbg(7,17,27)
          margin-bottom 4px
        .star-wrapper
          margin-bottom 6px
          font-size 0
          .star
            display inline-block
            vertical-align top
            margin-right 6px
          .deliverytime
            font-size 10px
            font-weight 200
            color rgb(147,153,159)
            line-height 12px
        .text
          font-size 12px 
          color rgb(7,17,27)
          line-height 18px   
        .recommend
          font-size 0
          margin-top 8px
          line-height 16px
          .icon-thumb_up,.item
            display inline-block
            margin 0 8px 4px 0
            font-size 9px
          .icon-thumb_up
            color rgb(0,160,220)
          .item 
            padding 0 6px
            border 1px solid rgba(7,17,27,.1)
            border-radius 1px
        .time
          position absolute 
          line-height 12px
          font-size 10px 
          font-weight 200
          color rgb(147,153,159)
          right 0
          top 0
              
</style>

