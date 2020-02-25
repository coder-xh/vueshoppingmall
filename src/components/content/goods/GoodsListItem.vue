<template>
  <div class="goodsItem">
    <img :src="goodsItem.show.img" alt="" />
    <div class="goodsInfo">
      <p class="goodsTitle">{{ goodsItem.title }}</p>

      <span class="price">{{ goodsItem.orgPrice }}</span>

      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: Object,
    default() {
      return {};
    }
  }
};
</script>

<style>
.goodsItem {
  padding-bottom: 40px;
  position: relative;
}

.goodsItem img {
  width: 100%;
  height: 96%;
  border-radius: 5px;
}
.goodsTitle {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.goodsInfo{
  text-align: center
}

.goodsInfo img {
  width: 40px;
  height: 40px;
}

.goodsInfo .price{
  margin-right: 20px
}

.goodsInfo .collect{
  position: relative;
}

.goodsInfo .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
