import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

const state = {
  cartList: []
}

// 创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions

  // mutations: {
    // addToCart(state, payload) {      
      // let oldProduct = null
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   } 
      // }

    //   let oldProduct = state.cartList.find((item) => {
    //     return item.iid === payload.iid
    //   })

    //   if(oldProduct){
    //     oldProduct.count += 1
    //   }else{
    //     payload.count = 1
    //     state.cartList.push(payload);
    //   }
    // }

    // // 已有商品数量加1
    // addCount(state, payload){
    //   payload.count += 1
    // },

    // // 未有商品直接加入购物车
    // addCart(state, payload){
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }

  // },
  // actions: {
  //   addToCart(context, payload) {
  //     let oldProduct = context.state.cartList.find((item) => {
  //       return item.iid === payload.iid
  //     })

  //     if(oldProduct){
  //       context.commit("addCount",oldProduct)
  //     }else{
  //       context.commit("addCart",payload)
  //     }
  //   }
  // }
});

export default store;
