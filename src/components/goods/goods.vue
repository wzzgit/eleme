<template>
    <div class="goods">
         <div class="menu-wrapper" ref="menuwrapper">
             <ul>
                 <li v-for="(item,index) in goods" :key="index" @click="selectMenu(index,$event)" class="menu-detail" :class="{'currents':currentIndex==index}">
                    <span class="text border-1px"><span v-show="item.type>0" class="icon" :class="sourceMap[item.type]"></span>{{item.name}}</span>
                 </li>
             </ul>
         </div>
         <div class="foods-wrapper" ref="foodwrapper">
             <ul>
                 <li v-for="(item,index) in goods" :key="index" class="food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click="selectFood(food,$event)" v-for="(food,index) in item.foods" class="border-1px food-item" :key="index">
                            <div class="icon">
                                <img :src="food.icon" width="57">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                <span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                <span class="now">￥{{food.price}}</span><span class="old"
                                                                                v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="carcontrol-wrapper">
                                <carcontrol @addFoods="addFood" :food="food"></carcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                 </li>
             </ul>
         </div>
         <shopcar ref="shopcar" :selectFoods="selectFoods" :delivery="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcar>
    <food :food="selectedFood" @foodadd="addFood" ref="food"></food>
   </div>
    
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import shopcar from 'components/shopcar/shopcar';
import carcontrol from 'components/carcontrol/carcontrol';
import food from 'components/food/food'
    export default{
        props: {
            seller: {
                type:Object
            }
        },
        data(){
            return {
                 goods:[],
                 hightList:[],
                 scrollY:0,
                 selectedFood:{}
            }
        },
        created(){
            this.sourceMap=['decrease','discount','special','invoice','guarantee'];
            this.$http.get('/api/goods')
            .then((res)=>{
                var response=res.body;
                if(response.errno===0){
                    this.goods=response.data;
                    this.$nextTick(function(){
                          this._initScroll();
                          this.compuHeight()
                    })             
                }
            })
        },
        computed:{
            currentIndex(){
                for(let i=0;i<this.hightList.length;i++){
                    let height = this.hightList[i];
                    let height1 = this.hightList[i+1];
                    if(!height1 || this.scrollY>=height&&this.scrollY<height1){
                        return i;
                    }
                }
            },
            selectFoods(){
                let foods=[];
                this.goods.forEach(good=>{
                    good.foods.forEach(food=>{
                        if(food.count){
                            foods.push(food)
                        }
                    })
                })
                
                return foods;
            }
        },
        methods:{
            selectFood(food,event){
                if(!event._constructed){
                    return;
                }
                this.selectedFood = food
                this.$refs.food.show();
            },
            _initScroll() {   
                this.menuScroll = new BScroll(this.$refs.menuwrapper,{click:true});
                this.foodsScroll = new BScroll(this.$refs.foodwrapper,{probeType:3,click:true});
                this.foodsScroll.on('scroll',(pos)=>{     
                this.scrollY = Math.abs(Math.round(pos.y));
                })
            },
            compuHeight(){
                let foodList = this.$refs.foodwrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.hightList.push(height)
                for(let i=0;i<foodList.length;i++){
                    let item=foodList[i];
                    height+=item.clientHeight
                    this.hightList.push(height)
                }
            },
            selectMenu(i,event){
                if(!event._constructed){
                    return;
                }
                let foodlist= this.$refs.foodwrapper.getElementsByClassName('food-list-hook');
                let el = foodlist[i];
                this.foodsScroll.scrollToElement(el,300)
            },
            addFood(target){
            
                this._drop(target)
            },
            _drop(target){
                this.$refs.shopcar.drop(target)
            }
        },
        components:{
            shopcar,
            carcontrol,
            food
        }
    }
  
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import '../../common/stylus/mixin.styl'
.goods
    position absolute
    top 184px
    width 100%
    bottom 46px
    display flex 
    overflow hidden
    .menu-wrapper
        flex 0 0 80px
        width 80px
        background #f3f5f7
        .menu-detail         
            display table
            height 54px
            width 56px
            padding 0 12px
            font-size 12px
            line-height 14px
            &.currents
                background #fff
                position relative
                z-index 10
                margin-top -1px
                font-weight 700
                .text
                    border-none()
            .icon
                display inline-block
                vertical-align top
                width 16px
                height 16px
                margin-right 2px
                background-size:12px 12px
                background-repeat:no-repeat
                &.decrease
                    bg-image('decrease_3')
                &.discount
                    bg-image('discount_3')
                &.guarantee
                    bg-image('guarantee_3')
                &.invoice
                    bg-image('invoice_3')
                &.special
                    bg-image('special_3')
            .text 
                display table-cell
                vertical-align middle
                width 56px
                font-size 12px
                border-1px(rgba(7,17,27,0.1))
    .foods-wrapper
        flex:1
        .title
            font-size 12px
            color rgb(147,153,159)
            line-height 26px
            padding-left 14px
            border-left 2px solid #d9dde1
            background #f3f5f7
        .food-item
            display flex
            margin 18px
            padding-bottom 18px
            border-1px(rgba(7,17,27,0.1))
            &:last-child
                border-none()
                margin-bottom 0px
            .icon
                flex 0 0 57px
            .content
                flex 1 
                margin-left 8px             
                .name
                    margin: 2px 0 8px 0
                    height: 14px
                    line-height: 14px
                    font-size: 14px
                    color: rgb(7, 17, 27)
                .desc 
                    font-size 10px
                    line-height 12px
                    color rgb(147,153,159)
                .extra
                    font-size 10px
                    line-height 10px
                    color rgb(147,153,159)
                    margin 8px 0
                    .count
                        margin-right 12px
                        
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
                    right 0
                    bottom 12px


</style>
