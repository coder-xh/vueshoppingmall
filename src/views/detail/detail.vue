<template>
  <div class="good-detail">
    <nav-bar class="detail-nav">
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center">
        <tab-control :title="['商品', '参数', '评论', '精选']"></tab-control>
      </div>
    </nav-bar>

    <swiper class="detail-swiper">
      <swiper-item v-for="(item, index) in swiperImg" :key="index">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>

    <item-info
      :goodInfo="goodInfo"
      :extraInfo="extraInfo"
      :serviceInfo="serviceInfo"
      :shopInfo="shopInfo"
    ></item-info>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/common/tabcontrol/TabControl";
import { Swiper, SwiperItem } from "components/common/swiper";
import ItemInfo from "./childcomponent/ItemInfo";

import { getGoodInfo } from "network/detail";

export default {
  name: "detail",
  data() {
    return {
      goodId: "",
      swiperImg: [],
      goodInfo: {},
      extraInfo: [],
      serviceInfo: [],
      shopInfo: {}
    };
  },
  created() {
    this.goodId = this.$route.params.iid;
    // 获取商品详情页数据
    this.getGoodInfoAsync();
  },
  components: {
    NavBar,
    TabControl,
    Swiper,
    SwiperItem,
    ItemInfo
  },
  methods: {
    getGoodInfoAsync() {
      getGoodInfo({
        iid: this.goodId
      }).then(res => {
        console.log(res);
        this.swiperImg = res.result.itemInfo.topImages;
        this.goodInfo = res.result.itemInfo;
        this.extraInfo = res.result.columns;
        this.serviceInfo = res.result.shopInfo.services;
        this.shopInfo = res.result.shopInfo;
      });
    },
    back() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.good-detail {
  padding-top: 44px;
  height: 100vh;
  position: relative;
  z-index: 9;
  background: #fff;
}
.back {
  position: relative;
  top: 6px;
}
.detail-nav {
  font-size: 14px;
  background-color: #fff;
  z-index: 9;
}
.detail-swiper {
  height: 300px;
}
</style>
