<template>
  <div class="goodsItem" @click="showDetail(goodsItem.iid)">
    <!-- 懒加载方式加载图片 -->
    <img v-lazy="showImg" alt="" @load="imgLoad" />
    <div class="goodsInfo">
      <p class="goodsTitle">{{ goodsItem.title }}</p>

      <span class="price">{{ goodsItem.price }}</span>

      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imgLoad() { 
      this.$bus.$emit("itemImgLoad");
    },
    showDetail(iid) {
      this.$router.push("/detail/" + iid);
    }
  }
};
</script>

<style scoped>
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

.goodsInfo {
  text-align: center;
}

.goodsInfo img {
  width: 40px;
  height: 40px;
}

.goodsInfo .price {
  margin-right: 20px;
}

.goodsInfo .collect {
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
