export default {
  addtoMyCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => {
        return item.iid === payload.iid;
      });

      if (oldProduct) {
        
        context.commit("addCount", oldProduct);
        resolve("购物车已有该商品")
      } else {
        resolve("添加了新商品")
        context.commit("addCart", payload);
      }
    });
  }
};
