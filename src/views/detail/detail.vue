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
    <scroll class="content" ref="scroll">
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
        :detailInfo="detailInfo"
        @imgLoad="imgLoad"
      >
      </item-info>
      <param-info :paInfo = paInfo></param-info>
      <comment-info :commentInfo = commentInfo></comment-info>
      <recommend :recommendInfo = recommendInfo></recommend>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/common/tabcontrol/TabControl";
import { Swiper, SwiperItem } from "components/common/swiper";
import ItemInfo from "./childcomponent/ItemInfo";
import ParamInfo from "./childcomponent/paramInfo";
import CommentInfo from "./childcomponent/commentInfo";
import Recommend from "./childcomponent/recommend";
import Scroll from "components/common/scroll/Scroll";

import { getGoodInfo, getRecommendInfo } from "network/detail";

export default {
  name: "detail",
  data() {
    return {
      goodId: "",
      swiperImg: [],
      goodInfo: {},
      extraInfo: [],
      serviceInfo: [],
      shopInfo: {},
      detailInfo: {},
      paInfo:{},
      commentInfo:{},
      recommendInfo:[],
    };
  },
  created() {
    this.goodId = this.$route.params.iid;
    // 获取商品详情页数据
    this.getGoodInfoAsync();
    // 获取推荐商品数据
    this.getRecommendInfoAsync();
  },
  components: {
    NavBar,
    TabControl,
    Swiper,
    SwiperItem,
    ItemInfo,
    ParamInfo,
    CommentInfo,
    Recommend,
    Scroll
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImgLoad", () => {
      refresh();
    });
  },
  methods: {
    getGoodInfoAsync() {
      getGoodInfo({
        iid: this.goodId
      }).then(res => {
        this.swiperImg = res.result.itemInfo.topImages;
        this.goodInfo = res.result.itemInfo;
        this.extraInfo = res.result.columns;
        this.serviceInfo = res.result.shopInfo.services;
        this.shopInfo = res.result.shopInfo;
        this.detailInfo = res.result.detailInfo;
        this.paInfo = res.result.itemParams
        this.commentInfo = res.result.rate
      });
    },
    getRecommendInfoAsync(){
      getRecommendInfo().then(res => {
        this.recommendInfo = res.data.list
      })
    },
    back() {
      this.$router.back();
    },
    imgLoad() {
      const refresh = this.debounce(this.$refs.scroll.refresh, 200);
      refresh();
    },

    // 防抖函数
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
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
.detail-swiper img {
  width: 100%;
  height: 300px;
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
