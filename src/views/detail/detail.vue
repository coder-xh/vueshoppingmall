<template>
  <div class="good-detail">
    <nav-bar class="detail-nav">
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center">
        <tab-control
          :title="['商品', '参数', '评论', '推荐']"
          @tabcontrolClick="tabClick"
          ref="tabcon"
        ></tab-control>
      </div>
    </nav-bar>
    <scroll class="content" ref="scroll" @scrollevent="handleScroll">
      <swiper class="detail-swiper" ref="goods">
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
      <param-info :paInfo="paInfo" ref="params"></param-info>
      <comment-info :commentInfo="commentInfo" ref="comment"></comment-info>
      <recommend :recommendInfo="recommendInfo" ref="recommend"></recommend>
    </scroll>
    <bottom-tab @addToCart= "addToCart"></bottom-tab>
    <back-top @click.native="BackTopClick" v-show="isshow"></back-top>
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

import BackTop from "components/common/backtop/BackTop";
import BottomTab from "./childcomponent/BottomTab"

import { getGoodInfo, getRecommendInfo } from "network/detail";
import { debounce } from "network/utils";
import {mixin} from "network/mixin"
import {mapActions} from 'vuex'

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
      paInfo: {},
      commentInfo: {},
      recommendInfo: [],
      offsetY: [],
      getY: null,
      curIndex: 0,
      isshow: false
    };
  },
  mixins:[mixin],
  created() {
    this.goodId = this.$route.params.iid;
    // 获取商品详情页数据
    this.getGoodInfoAsync();
    // 获取推荐商品数据
    this.getRecommendInfoAsync();

    this.getY = debounce(() => {
      this.offsetY = [];
      this.offsetY.push(this.$refs.goods.$el.offsetTop);
      this.offsetY.push(this.$refs.params.$el.offsetTop);
      this.offsetY.push(this.$refs.comment.$el.offsetTop);
      this.offsetY.push(this.$refs.recommend.$el.offsetTop);
    }, 200);
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
    Scroll,
    BackTop,
    mixin,
    BottomTab
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImgLoad", () => {
      refresh();
    });
  },
  methods: {
    ...mapActions(['addtoMyCart']),

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
        this.paInfo = res.result.itemParams;
        this.commentInfo = res.result.rate;
      });
    },
    getRecommendInfoAsync() {
      getRecommendInfo().then(res => {
        this.recommendInfo = res.data.list;
      });
    },
    back() {
      this.$router.back();
    },
    imgLoad() {
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      refresh();
      this.getY();
    },
    tabClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.offsetY[index], 500);
    },
    handleScroll(position) {
      this.isshow = -position.y > 1000;

      let yHeight = -position.y;
      let len = this.offsetY.length;
      for (let i in this.offsetY) {
        if (
          (i != this.curIndex &&
            i < len - 1 &&
              yHeight >= this.offsetY[i] &&
              yHeight < this.offsetY[parseInt(i) + 1]) ||
          (i == len - 1 && yHeight >= this.offsetY[i])
        ) {
          this.curIndex = i;
          this.$refs.tabcon.currentIndex = i;
        }
      }
    },

    addToCart(){
      // 获取加入购物车的信息
      const addInfo = {}
      addInfo.iid = this.goodId
      addInfo.img = this.goodInfo.topImages[0]
      addInfo.title = this.goodInfo.title
      addInfo.desc = this.goodInfo.desc
      addInfo.price = this.goodInfo.lowNowPrice
      addInfo.checked = false

      // vuex映射为方法
      this.addtoMyCart(addInfo).then(res => {
        this.$toast.show(res,2000)
      })

      // this.$store.dispatch('addtoMyCart',addInfo).then(res => {
      //   console.log(res)
      // })

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
  height: calc(100% - 49px);
  overflow: hidden;
}
</style>
