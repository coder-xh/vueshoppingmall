export default {
  // 已有商品数量加1
  addCount(state, payload) {
    payload.count += 1;
  },

  // 未有商品直接加入购物车
  addCart(state, payload) {
    payload.count = 1;
    state.cartList.push(payload);
  }
};
