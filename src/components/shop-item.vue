<template>
    <div class="item" >
        <div>
            <div class="item-img"><img :alt="item.name" :src="item.sku_info[itemindex].ali_image+'?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'" style="opacity: 1;">
            </div>
            <h6>{{item.name}}</h6>
            <h3 >{{item.name_title}}</h3>
            <div class="params-colors">
                <ul class="colors-list">
                    <li v-for="(sku,index) in item.sku_info">
                        <a href="javascript:;" @click="tableIndex(index)" :class="{ 'active':index==itemindex}">
                        <img :title="sku.spec_json.show_name" :src="'http://img01.smartisanos.cn/'+sku.spec_json.image+'20X20.jpg'">
                        </a>
                    </li>
                </ul>
            </div>
            <div class="item-btns clearfix">
                <span class="item-gray-btn">
                    
                    <router-link :to="{name:'Item',query:{itemId:item.sku_info[itemindex].sku_id} }">查看详情</router-link>
                    </span><span class="item-blue-btn" @click="addpanelHandel(item.sku_info[itemindex])">加入购物车 </span>
            </div>
            <div class="item-price clearfix">
                <i>¥</i><span>{{item.price}}</span>
            </div>
            <div class="discount-icon">false</div>
            <div class="item-cover">
                <router-link :to="{name:'Item',query:{itemId:item.sku_info[itemindex].sku_id}}"></router-link>
            </div>
        </div>
    </div>
</template>
<script>
//购物车
export default {
    data(){
        return{
            itemindex:0
        } 
    },
    //接收父组件传递过来的数据item
    props:{
        item:{
            type:Object
        }
    },
    methods:{
        //商品颜色选择，点击时将所点击元素下标记录为选中状态的itemindex
        tableIndex(index){
            this.itemindex=index
        },
        //点击时候发送当前所点击对象的数据。并通过vuex传递给addcarPanelData函数
        addpanelHandel(data){
            let infoData={
                info:data,
                count:1
            }
            this.$store.commit('addcarPanelData',infoData)
        }
    }
}
</script>
