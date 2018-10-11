import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store=new Vuex.Store({
    state:{
        carPanelData:[],
        receiveInfo:[{
                        "name": "王某某",
                        "phone": "13811111111",
                        "areaCode": "010",
                        "landLine": "64627856",
                        "provinceId": 110000,
                        "province": "北京市",
                        "cityId": 110100,
                        "city": "市辖区",
                        "countyId": 110106,
                        "county": "海淀区",
                        "add": "上地十街辉煌国际西6号楼319室",
                        "default": true
                        },{
                        "name": "李某某",
                        "phone": "13811111111",
                        "areaCode": "010",
                        "landLine": "64627856",
                        "provinceId": 110000,
                        "province": "北京市",
                        "cityId": 110100,
                        "city": "市辖区",
                        "countyId": 110106,
                        "county": "海淀区",
                        "add": "上地十街辉煌国际东6号楼350室",
                        "default": false
                    }],
        limOff:false,
        carShow:false,
        clearTimer:null,
        //创建小球相关信息，是否显示、当前点击对象、图片地址
        ball:{
            show:false,
            el:null,
            img:''
        },
        //创建用户订单相关数据
        orderData:[]
    },
    getters:{
        //计算购物车商品总数
        totlecount(state){
            let counts=0
            state.carPanelData.forEach((item)=>{
                counts+=item.count
            })
            return counts
        },
        //计算购物车商品总价
        totleprice(state){
            let price=0
            state.carPanelData.forEach((item)=>{
                price+=item.price*item.count
            })
            return price
        },
        //是否全部选中
        allCheckde(state){
            let allCheckde=true
            state.carPanelData.forEach((item)=>{
                if(!item.checked){//存在一个未选中，allCheckde为false，并结束循环
                    allCheckde=false
                    return
                }
            })
            return allCheckde
        },
        //计算选中商品数量及总价
        allCheckdeGoods(state){
            let counts=0
            state.carPanelData.forEach((item)=>{
                if(item.checked){
                    counts += item.count
                }
            })
            return counts
        },
        allCheckdeGoodsPrice(state){
            let prices=0
            state.carPanelData.forEach((item)=>{
                if(item.checked){
                    prices += item.count*item.price
                }
            })
            return prices
        },
        //计算购物车选中的商品
        checkdeGoods(state){
            let checkdeGoods=[]
            state.carPanelData.forEach((item,index)=>{
                if(item.checked){
                    checkdeGoods.push(item)
                }
                
            })
            
            return checkdeGoods
        }
    },
    mutations:{
        //点击购物车
        addcarPanelData(state,data){
            let bOff=true;//设置一个开关，如果传入数据购物车里有了，就不添加，默认为没有
            state.carPanelData.forEach((panels)=>{
                if(panels.sku_id===data.info.sku_id){
                    panels.count+=data.count
                    bOff=false
                    if(panels.count>panels.limit_num){
                        panels.count--
                        state.limOff=true
                        return
                    }
                    state.carShow=true
                }
                
            })
            if(bOff){
                let panelsData=data.info
                Vue.set(panelsData,'count',data.count)
                Vue.set(panelsData,'checked',true)
                state.carPanelData.push(panelsData)
                state.carShow=true
            }
            state.ball.show=true
            state.ball.img=data.info.ali_image
            
            state.ball.el=event.path[0]
            console.log(state.ball)
        },
        //删除购物车中对象
        delcarPanelData(state,id){
            state.carPanelData.forEach((item,index)=>{
                if(item.sku_id===id){
                    state.carPanelData.splice(index,1)
                }
            })
        },
        //删除购物车中选中的所有商品
        delCheckedGoods(state){
            //从后往前删
            let i=state.carPanelData.length
            while(i--){
                if(state.carPanelData[i].checked){
                    state.carPanelData.splice(i,1)
                }
            }
            //从前往后删，这样删的时候当第一个删除后，第二个会变成数组第一项，但是splice里的index还是从第二项，会跳过一项
            // state.carPanelData.forEach((item,index)=>{
            //     if(item.checked){
            //         state.carPanelData.splice(index,1)
            //     }
            // })
        },
        //购物车页面商品数量改变
        addCart(state,id){
            state.carPanelData.forEach((item,index)=>{
                if(item.sku_id===id){
                    if(item.count>=item.limit_num) return
                    item.count++
                    return
                }
            })
        },
        reduceCart(state,id){
            state.carPanelData.forEach((item,index)=>{
                if(item.sku_id===id){
                    if(item.count<=1) return
                    item.count--
                    return
                }
            })
        },
        //购物车商品是否选中
        checkedChange(state,id){
            state.carPanelData.forEach((item,index)=>{
                if(item.sku_id===id){
                item.checked=!item.checked
                console.log(item.checked)
                return
                }
                
            })
        },
        
        //关闭限制数量弹窗
        closeLimit(state){
            state.limOff=false
        },
        //显示限制数量弹窗
        showCar(state){
            state.clearTimer=null
            state.carShow=true
        },
        //隐藏右上角购物车界面
        heidCar(state){
            state.clearTimer=setTimeout(()=>{
                state.carShow=false
            },500)
            
        },
        //全部选中
        allCheckedgoods(state,allCheckde){
            state.carPanelData.forEach((item)=>{
               item.checked=!allCheckde
            })
        },
        submitReceive(state,data){
            //先判断传过来数据地址是否为选中默认状态
            if(data.default){
                state.receiveInfo.forEach((receive)=>{
                    receive.default=false
                })
            }
            this.state.receiveInfo.push(data)
        },
        //添加订单相关数据
        submitOrder(state,data){
            //每次订单的数据添加到数组第一个位置
            state.orderData.unshift(data)
            //已经购买完的商品从购物车中移除
            let n=state.carPanelData.length
            while(n--){//如果是选中的，就删除掉
                if(state.carPanelData[n].checked){
                    state.carPanelData.splice(n,1)
                }
            }
        },
        payHander(state,id){
            state.orderData.forEach((order)=>{
                if(order.orderId==id){
                    order.isPay=true
                    return
                }
            })
        }
    }
})
export default store