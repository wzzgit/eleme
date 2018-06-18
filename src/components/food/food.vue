<template>
<transition name="foodss">
  <div v-show="showflag" class="food" ref="foods">
    <div class="food-content">
        <div class="image-header">
            <img :src="food.image" alt="">
            <div class="back" @click="hide">
                <i class="icon-arrow_lift"></i>
            </div>    
        </div>
        <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
                <span class="sell-count">月售{{food.sellCount}}份</span><span class="ratings">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="carcontrol-wrapper">
            <carcontrol @addFoods="addfood($event)" :food="food" v-show="1"></carcontrol>
            </div>
            <div @click="addfirst($event)"  class="buy" v-show="!food.count || food.count==0">加入购物车
            </div>
        </div>
        
        <split></split>
        <div class="info">
            <h1 class="title">
                商品信息
            </h1>
            <p class="text" v-show="food.info">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
            <div class="text">商品评价</div>
            <ratingselect @ratingtype="ratingtypes" @changeonlyContent="changeonlyContents" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
            <div class="rating-wrapper">
                <ul v-show="food.ratings && food.ratings.length">
                    <li v-show="isshow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" :key="index" class="border-1px rating-item">
                        <div class="user">
                            <span class="username">
                                {{rating.username}}
                            </span>
                            <img :src="rating.avatar" class="vartar" width="12" height="12" alt="">
                        </div>
                        <div class="time">
                            {{rating.rateTime | formatDates}}
                        </div>
                        <p class="rattext">
                            <span :class="{'icon-thumb_up':rating.rateType==0,
                            'icon-thumb_down':rating.rateType==1}"></span>
                            <span class="texts">{{rating.text}}</span>
                        </p>
                    </li>
                </ul>
                <div class="no-ratings" v-show="!food.ratings || food.ratings.length">暂无评价</div>
            </div>
        </div>
    </div>
    
   
  </div>
  </transition>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import carcontrol from 'components/carcontrol/carcontrol';
import split from 'components/split/split';
import ratingselect from 'components/ratingselect/ratingselect';
import {formatDate} from '../../common/js/date';
const good = 0;
const bad = 1;
const all = 2;
    export default{
        props:{
            food:{
                type: Object
            }
        },
        data(){
            return{
                showflag:false,
                selectType:all,
                onlyContent : true,
                desc:{
                    alls:'全部',
                    positive:'推荐',
                    negative:'吐槽'
                }
            }
        },
        filters:{
            formatDates(time){
                let times= new Date(time)
                //debugger
                return formatDate(times,'yyyy-MM-dd hh:mm')
            }
        },
        methods:{
            show(){
                this.showflag=true;
                this.selectType= all;
                this.onlyContent=false;
                    this.$nextTick(()=>{
                    if(!this.scroll){
                        this.scroll=new BScroll(this.$refs.foods,{
                            click:true,probeType:3
                        })
                    }
                        this.scroll&&this.scroll.refresh();                 
                })                
            },
            hide(){
                this.showflag=false;
            },
            addfood(evnet){
                this.$emit('foodadd',event.target)
            },
            addfirst(event){
                if(event._contructed){
                    return;
                }
                this.$emit('foodadd',event.target)
                Vue.set(this.food,'count',1)
            },
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
                if(this.selectType === all){
                    return true
                }else{
                    return type == this.selectType
                }
            }
        },
        components:{
            carcontrol,
            split,
            ratingselect
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import '../../common/stylus/mixin.styl'
    .food
        position fixed 
        left 0
        top 0
        bottom 48px
        z-index 50
        width 100%
        background #ffffff
        transition all 0.5s
        &.foodss-enter-active,&.foodss-leave{
            transform translate3d(100%,0,0)
        }
        .food-content
            .content
                padding 18px
                position relative
                .title
                    font-size 14px 
                    color rgb(7,17,27)
                    font-weight 700
                    line-height 14px
                .detail
                    margin-top 8px
                    font-size 0
                    margin-bottom 18px
                    .sell-count,.ratings
                        font-size 10px
                        color rgb(147,153,159)
                        line-height 20px
                    .ratings
                        margin-left 12px
                .price 
                    font-weight 700
                    line-height 24px
                    .now
                        color rgb(240,20,20)
                        font-size 14px
                        margin-right 8px                        
                    .old
                        text-decoration line-through
                        color rgb(147,153,159)
                        font-size 10px
                .carcontrol-wrapper
                    position absolute 
                    right 12px
                    bottom 12px
            .buy
                position absolute
                right 18px
                bottom 18px
                z-index 10
                height 24px
                line-height 24px
                padding 0 12px
                box-sizing border-box
                font-size 10px
                background rgb(0 160,220)
                color #ffffff
                border-radius 12px    
            .image-header
                position relative
                width 100%
                height 0
                padding-top 100%
                img 
                    position absolute
                    top 0
                    left 0
                    width 100%
                    height 100%
                .back
                    position absolute
                    top 10px 
                    left 0
                    .icon-arrow_lift
                        display block 
                        padding 10px
                        font-size 20px
                        color #ffffff
        .info 
            padding 18px
            .title
                line-height 14px
                margin-bottom 6px
                font-size 14px
                color rgb(7,17,27)
            .text
                padding 0 8px
                line-height 24px
                font-size 12px
                color rgb(77,85,93) 
        .rating
            padding-top 18px
            .text
                margin-left 18px
                line-height 14px
                margin-bottom 6px
                font-size 14px
                color rgb(7,17,27)
            .rating-wrapper
                padding 0 18px
                .no-ratings
                    padding 16px 0
                    font-size 12px
                    color rgb(149,153,159)
                .rating-item
                    border-1px(rgba(7,17,27,.1))
                    padding 16px 0
                    position relative
                    .user   
                        position absolute 
                        right 0 
                        font-size 0
                        line-height 12px
                        top 16px
                        .username
                            font-size 10px
                            color rgb(147,153,159)
                            display inline-block
                            vertical-align top
                            margin-right 6px
                        .avatar
                            border-radius 50%
                    .time 
                        margin-bottom 6px
                        font-size 10px
                        color rgb(147,153,159)
                        line-height 12px
                    .rattext
                        .texts
                            font-size 12px
                            line-height 16px
                            color rgb(147,153,159)
                        .icon-thumb_up,.icon-thumb_down
                            line-height 24px
                            margin-right 4px   
                            font-size 12px
                            color rgb(0,160,220)
                        .icon-thumb_down
                            color rgb(147,153,159)  
</style>
