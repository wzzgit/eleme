<template>
  <div class="shopcar">
     <div class="content"  @click="togglelist">
         <div class="content-left">
             <div class="logo-wrapper">
                 <div class="logo" :class="{'highlight':totalCount>0}">
                     <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
                 </div> 
                 <div class="totalCount" v-show="totalCount>0">{{totalCount}}</div>               
             </div>
             <div class="price" :class="{'highlight':totalPrice>0}">
                     ￥{{totalPrice}}
                 </div>
                 <div class="desc">
                     另需配送费￥{{delivery}}元
                 </div>
         </div>
         <div class="content-right">
             <div class="minprice" :class="payClass">
                 {{payDesc}}
             </div>
         </div>
     </div>
    <div class="ball-wrapper">
        <div v-for="(ball,index) in balls" :key="index">
            <transition name="drop"  @before-enter="beforeDrop" @enter="droping"  @after-enter="afterdroping" >
            <div class="ball" v-show="ball.show" >
                    <div class="inner inner-hook"></div>
            </div>
        </transition>
        </div>      
    </div> 
    <transition name="folds">
        <div class="shoplist" v-show="listshow">      
            <div class="listHeader">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="clearShop">清空</span>
            </div>
            <div class="listContent" ref="listContent">
                <ul>
                    <li v-for="(food,index) in selectFoods" :key="index" class="food border-1px">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>￥{{food.count*food.price}}</span>
                        </div>
                        <div class="carcontrol-wrapper">
                            <carcontrol :food="food"></carcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div> 
    </transition>
    <transition name="fade">
        <div class="list-mark" v-show="listshow" @click="hidelist"></div>
    </transition>
  </div>
</template>
<script  type="text/ecmascript-6">
    import carcontrol from 'components/carcontrol/carcontrol';
    import BScroll from 'better-scroll';
    export default{
        components:{
            carcontrol
        },
        props:{
            delivery:{
                type:Number,
                default:0
            },
            minPrice:{
                type:Number,
                default:0
            },
            selectFoods:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        data(){
            return {
                balls:[
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    }
                ],
                dropBall :[],
                fold:true
            }
        },
        methods: {
            drop (el) {    
                for(let i = 0;i < this.balls.length;i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBall.push(ball);
                        return
                    }
                }
            },
            beforeDrop(el){     
                    let count = this.balls.length;
                    while(count--){
                        let ball=this.balls[count];
                        if(ball.show){
                            let rect= ball.el.getBoundingClientRect();
                            let x=rect.left -32;
                            let y= -(window.innerHeight-rect.top-22);
                            el.style.display = '';
                            el.style.webkitTransform=`translate3d(0,${y}px,0)`;
                            el.style.transform = `translate3d(0,${y}px,0)`;
                            let inner = el.getElementsByClassName('inner-hook')[0];
                            inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
                            inner.style.transform=`translate3d(${x}px,0,0)`;
                        }
                    }
            },
            droping(el,done){
                 let rf=el.offsetHeight
                    this.$nextTick(function(){
                            el.style.webkitTransform='translate3d(0,0,0)';
                            el.style.transform = 'translate3d(0,0,0)';
                            let inner = el.getElementsByClassName('inner-hook')[0];
                            inner.style.webkitTransform='translate3d(0,0,0)';
                            inner.style.transform='translate3d(0,0,0)';
                            el.addEventListener('transitionend',done)
                    })
            },
            afterdroping(el){            
                 let ball = this.balls.shift();
                    if(ball){ 
                        ball.show=false
                        el.style.display='none';
                    }      
            },
            togglelist() {
                if(!this.totalCount){
                    return;
                }else{
                    this.fold = !this.fold;
                }
            },
            clearShop(){
                this.selectFoods.forEach((food)=>{
                    food.count=0;
                })
            },
            hidelist(){
                this.fold = !this.fold;
            }
        },
        computed: {
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food)=>{
                    total += food.price*food.count
                });
                return total;
            },
            totalCount(){
                let count=0;
                this.selectFoods.forEach(food=>{
                    count+=food.count;
                })
                return count;
            },
            payDesc(){
                if(this.totalPrice === 0){
                    return `￥${this.minPrice}元起送`;
                }else if(this.totalPrice<this.minPrice){
                    let diff=this.minPrice-this.totalPrice;
                    return `还差￥${diff}元起送`;
                }else{
                    return '去结算';
                }
            },
            payClass(){
                if(this.minPrice >this.totalPrice >0){
                    return 'not-enough';
                }else{
                    return 'enough';
                }
            },
            listshow(){
                if(!this.totalCount){
                    this.fold=true;
                    return false;
                }else{
                    let show = !this.fold;
                    if(show){
                        if(!this.scroll){
                        this.$nextTick(()=>{
                             this.scroll= new BScroll(this.$refs.listContent,{click:true});
                        })
                        }else{
                            this.scroll.refresh();
                        }
                    }
                    return show;
                }
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import '../../common/stylus/mixin.styl'
.shopcar
    width 100%
    height 48px
    position fixed 
    left 0
    bottom 0
    z-index 999
    .content
        display flex
        background #141d27
        font-size 0
        .content-left
            flex 1
            .logo-wrapper
                display inline-block               
                position relative
                margin 0 12px
                margin-top -10px
                padding 6px
                width 56px
                height 56px
                box-sizing border-box
                vertical-align top
                border-radius 50%
                background #141d27
                .totalCount
                    position absolute
                    top 0
                    right 0
                    width 24px
                    height 16px
                    line-height 16px
                    text-align center
                    border-radius 16px
                    font-size 9px
                    color #ffffff
                    background rgb(240,20,20)
                    font-weight 700
                    box-shadow 0 4px 8px 0px rgba(0,0,0,.4)
                .logo
                    width 100%
                    height 100%
                    border-radius 50%
                    background #2b343c
                    text-align center
                    &.highlight
                        background rgb(0,160,220)                     
                    .icon-shopping_cart
                        font-size 24px
                        color #80858a
                        line-height 44px
                        &.highlight
                            color #ffffff
            .price
                display inline-block
                vertical-align top
                line-height 24px
                font-size 16px
                margin-top 12px
                box-sizing border-box
                padding-right 12px
                border-right 1px solid rgba(255,255,255,.1)
                font-weight 700
                color rgba(255,255,255,.4)
                &.highlight
                    color #ffffff
            .desc
                display inline-block
                vertical-align top
                line-height 24px 
                margin 12px 0 0 12px 
                color rgba(255,255,255,.4)
                font-size 10px
        .content-right
            flex 0 0 105px
            width 105px
            text-align center
            .minprice
                height 48px
                line-height 48px
                font-size 12px
                color rgba(255,255,255,.4)
                font-weight 700
                background #2b333b
                &.not-enough
                    background #2b333b
                &.enough
                    background #00b43c
                    color #ffffff
    .ball-wrapper{
        .ball{
            position fixed 
            left 32px
            bottom 22px
            z-index 9999   
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
            .inner{
                    width 16px
                    height 16px
                    border-radius 50%
                    background rgb(0,160,220)
                    transition all .4s linear
                }
        }
    }
    .shoplist
        position absolute
        top 0
        left 0
        z-index -1
        width 100%
        transform :translate3d(0,-100%,0)
        transition :all .5s linear
		&.folds-enter-active, &.folds-leave-active{
			transition :all .5s linear
		}
		&.folds-enter, &.folds-leave-active{
			transform :translate3d(0,0,0)
		}
        .listHeader
            height 40px
            line-height 40px
            background #f3f5f7
            border-bottom 1px solid rgba(7,17,27,.1)
            box-sizing border-box
            .title
                margin-left 18px
                font-size 14px
                font-weight 200
                color rgb(7,17,27)
                line-height 40px
                float left    
            .empty
                font-size 12px
                color rgb(0,160,220)
                line-height 40px
                float right
                margin-right 18px
        .listContent
             padding 0px 18px
             max-height 217px
             overflow hidden
             background #fff
             .food
                height 48px
                position relative
                box-sizing border-box
                border-1px(rgba(7,17,27,.1))
                padding 12px 0
                .name
                    font-size 14px
                    color rgb(7,17,27)
                    line-height 24px
                .price 
                    position absolute 
                    bottom 12px
                    right 90px
                    line-height 24px
                    font-size 14px
                    font-weight 700
                    color rgb(240,20,20)   
                .carcontrol-wrapper
                    position absolute
                    right 0px
                    bottom 6px
    .list-mark
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        z-index -2
        -webkit-backdrop-filter blur(10px)
        background rgba(7,17,27,0.6)
        &.fade-enter-active,&.fade-leave
            transition all 0.5s
        &.fade-enter,&.fade-leave-active
            opacity 0
            background rgba(7,17,27,0)
</style>
