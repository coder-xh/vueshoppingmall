export default {
  addtoMyCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => {
        return item.iid === payload.iid;
      });

      if (oldProduct) {
        
        context.commit("addCount", oldProduct);
        resolve("数量加1")
      } else {
        resolve("加了新商品")
        context.commit("addCart", payload);
      }
    });
  }
};
