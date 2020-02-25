<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="goods[index]"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";
export default {
  props: {
    goods: {
      type: Array,
      deefault() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
};
</script>

<style></style>
