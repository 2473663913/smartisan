<template>
    <li class="nav-cart" @mouseenter="shopCarshow()" @mouseleave="heidCar()">
        <a href="javascript:;" class="ball-rect">购物车</a>
        <!--根据class改变颜色-->
        <span class="cart-empty-num" :class="{'cart-num': getCounts>0}">
            <i>{{getCounts}}</i>
        </span>
        <div class="nav-cart-wrapper"  v-if="carShow">
            <div class="nav-cart-list">
                <div class="empty" v-if="getCounts<=0">
                    <h3>购物车为空</h3>
                    <p>您还没有选购任何商品，现在前往商城选购吧!</p>
                </div>
                <div class="full" v-else>
                    <div class="nav-cart-items">
                        <ul>
                            <li class="clear" v-for="(item,index) in getpanelData">
                                <div class="cart-item js-cart-item cart-item-sell">
                                    <div class="cart-item-inner">
                                        <div class="item-thumb">
                                            <img :src="item.ali_image+'?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'">
                                        </div>
                                        <div class="item-desc">
                                            <div class="cart-cell">
                                                <h4> 
                                                    <a href="#/item/100027401">{{item.title}}</a>
                                                </h4>
                                                <p class="attrs">
                                                    <span>{{item.spec_json.show_name}}</span>
                                                </p>
                                                <h6>
                                                    <span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x {{item.count}}</span>
                                                </h6>
                                            </div>
                                        </div>
                                        <div class="del-btn" @click="delpanelData(item.sku_id)">删除</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="nav-cart-total">
                        <p>共 <strong class="ng-binding">{{getCounts}}</strong> 件商品</p>
                        <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{getPrice}}</span></h5>
                        <h6>
                            <router-link class="nav-cart-btn" :to="{name:'Cart'}">去购物车</router-link>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
        <transition
            name="ball"
            v-on:bofore-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
            v-bind:css="true"
        >
            <div class="addcart-mask" v-show="ball.show">
                <img class="mask-item" src="" alt="">
            </div>
        </transition>
    </li>
</template>
<script>
    export default{
        computed:{
            //接收vuex中购物车的商品数据
            getpanelData(){
                return this.$store.state.carPanelData
            },
            //接收vuex中计算的商品总数
            getCounts(){
                return this.$store.getters.totlecount
            },
            //接收vuex中计算的商品总价
            getPrice(){
                return this.$store.getters.totleprice
            },
            carShow(){
                return this.$store.state.carShow
            },
            //接收vuex中小球相关数据
            ball(){
                return this.$store.state.ball
            }
        },
        methods:{
            delpanelData(id){
                this.$store.commit('delcarPanelData',id)
            },
            shopCarshow(){
                this.$store.commit('showCar')
            },
            heidCar(){
                this.$store.commit('heidCar')
            },
            beforeEnter(el){
                //声明一个变量存储按钮的位置
                let rect=this.ball.el.getBoundingClientRect()
                //声明一个变量存储购物车的位置
                let rectE1=document.getElementsByClassName('ball-rect')[0].getBoundingClientRect()
                //获取图片
                let base=document.getElementsByClassName('mask-item')[0]
                
                //计算购物车中心点到按钮中心点的举距离
                let x=(rectE1.left+16)-(rect.left+rect.width/2)
                let y=rect.top+rect.height/2-rectE1.top + 5 - 16
                el.style.transform='translate3d(0,'+y+'px,0)'
                base.style.transform='translate3d(-'+x+'px,0,,0)'
                base.src=this.ball.img
            },
            enter(el){
                let a=el.offsetHeight
                el.a=a
                el.style.transform='translate3d(0,0,0)'
                document.getElementsByClassName('mask-item')[0].style.transform='translate3d(0,0,,0)'
            },
            afterEnter(){
                this.ball.show=false
            }
        }
    }
</script>
<style>
    .ball-enter-active{
        transition: 3s
    }
    .ball-enter-active .mask-item{
        transition: 3s
    }
</style>
