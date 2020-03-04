<template>
  <div class="recommend">
    <goods-list :goods="recommendInfo"></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";
export default {
  props: {
    recommendInfo: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsList
  }
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.goodsItem {
  width: 48%;
}

.swrapper-content {
  height: calc(100% - 40px);
  overflow: hidden;
  /* margin-top: 44px; */
}</style>
