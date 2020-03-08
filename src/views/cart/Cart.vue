<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ cartListCount }})</div>
    </nav-bar>
    <scroll class="cart-content" ref="scroll">
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :item-info="item"
      >
      </cart-list-item>
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import cartListItem from "./childcomponents/cartListItem";
import BottomBar from "./childcomponents/BottomBar";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList", "cartListCount"])
  },
  components: {
    NavBar,
    cartListItem,
    BottomBar,
    Scroll
  }
};
</script>

<style scoped>
.cart {
  height: calc(100vh - 49px);
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.cart-content{
  height: calc(100% - 40px);
  overflow: hidden;
  margin-top: 44px;
}
</style>
