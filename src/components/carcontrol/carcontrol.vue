<template>
    <div class="carcontrol">
        <transition name="move">
            <div class="decrease " v-show="food.count>0" @click.stop="decreaseCount">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="counts" v-show="food.count>0">{{food.count}}</div>
        <div class="add icon-add_circle" @click.stop="addCart"></div>
    </div>
</template>
<script>
import Vue from 'vue';
    export default{
        props:{
            food:{
                type:Object
            }
        },
        created(){
           
        },
        methods:{
            addCart(event){
                if(!event._constructed){
                    return;
                }
                if (!this.food.count){
                    Vue.set(this.food,'count',1)
                }else{
                    this.food.count++
                }
                this.$emit('addFoods',event.target)
                event.preventDefault();
                
            },
            decreaseCount(event){
                if(!event._constructed){
                    return;
                }              
                if (this.food.count){
                    this.food.count--
                }
                 event.preventDefault();
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .carcontrol
         font-size 0 
        .decrease
            display inline-block          
            padding 6px 
            transition all 0.4s linear
            &.move-transition        
                opacity 1
                transform translate3d(0,0,0)
            &.move-enter,&.move-leave
                opacity 0
                transform translate3d(24px,0,0)
            .inner
                font-size 24px
                line-height 24px
                color rgb(0,160,220)
        .counts
            font-size 10px
            line-height 24px
            display inline-block
            width 12px 
            vertical-align top
            line-height 24px
            padding-top 6px
            color rgb(147,153,159)
        .add
            display inline-block
            font-size 24px
            line-height 24px
            padding 6px
            color rgb(0,160,220)
            
</style>
