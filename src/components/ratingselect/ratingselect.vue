<template>
    <div class="ratingselects">
        <div class="ratingType border-1px">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType==2}">{{desc.alls}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType==0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType==1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div @click="toggleContent($event)" class="swith" :class="{'on':onlyContent}">
            <span class="icon-check_circle"></span>
            <span class="texts">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
const good = 0;
const bad = 1;
const all = 2;
    export default{
        props:{
            ratings:{
                type:Array,
                default(){
                    return [];
                }
            },
            selectType:{
                type: Number,
                default:all
            },
            onlyContent:{
                type: Boolean,
                default:false
            },
            desc:{
                type:Object,
                default(){
                    return {
                        alls:'全部',
                        positive:'满意',
                        negative:'不满意'
                    }
                }
            }
        },
        methods:{
            select(type,event){
                // if(!this._constructed){
                //     return;
                // }
               // this.selectType=type;
                this.$emit('ratingtype',type);
            },
            toggleContent(event){
                // debugger
                // if(!this._constructed){
                //     return;
                // }
               // this.onlyContent=!this.onlyContent;
                this.$emit('changeonlyContent',!this.onlyContent);
            }   
        },
        computed:{
            positives(){
                return this.ratings.filter((rat)=>{
                    return rat.rateType === good;
                })
            },
            negatives(){
                return this.ratings.filter((rat)=>{
                  return rat.rateType === bad;
                })
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import '../../common/stylus/mixin.styl'
    .ratingselects
        .ratingType
            padding 18px 0
            margin 0 18px
            border-1px(rgba(7,17,27,.2))
            font-size 0
            .block
                padding 8px 12px
                border-radius 1px 
                margin-right 8px
                font-size 12px
                color rgb(77,85,93)
                font-size 12px
                &.active 
                    color #ffffff
                .count
                    font-size 8px
                    margin-left 2px
                    line-height 16px
                &.positive
                    background rgba(0,160,220,.2)
                    &.active 
                        background rgb(0,160,220)
                &.negative
                    background rgba(77,85,93,.2)
                    &.active
                        background rgb(77,85,93)
        .swith
            padding 12px 18px
            line-height 24
            font-size 0
            border-bottom 1px solid rgba(7,17,27,.2)  
            color rgb(147,153,159)
            &.on
                .icon-check_circle
                    color green
            .icon-check_circle
                display inline-block
                vertical-align top
                font-size 24px
                margin-right 4px    
            .texts
                font-size 12px
                display inline-block
                vertical-align top
                line-height 24px
</style>

