<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 吸顶效果替换用 -->
    <tab-control
      :title="['流行', '新款', '精选']"
      @tabcontrolClick="tabClick"
      ref="tabcontrol2"
      v-show="showTab"
    ></tab-control>
    <scroll
      class="swrapper-content"
      ref="scroll"
      @scrollevent="solveScroll"
      @loadMore="loadMore"
    >
      <home-swiper :banners="banners" @swiperload="swiperload"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :title="['流行', '新款', '精选']"
        @tabcontrolClick="tabClick"
        ref="tabcontrol1"
        v-show="!showTab"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="BackTopClick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/common/backtop/BackTop";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/common/tabcontrol/TabControl";

import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultidata, getHomeData } from "network/home";

export default {
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isshow: false,
      currentOffsettop: null,
      showTab: false,
      scrollY:0,
    };
  },
  created() {
    //获取轮播图和推荐
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommend = res.data.recommend.list;
    });
    this.getHomeDataAsync(this.currentType);
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImgLoad", () => {
      refresh();
    });
  },
  activated(){
    this.$refs.scroll.scroll.refresh()
    this.$refs.scroll.scroll.scrollTo(0,this.scrollY,0)
  },
  deactivated(){
    this.scrollY = this.$refs.scroll.scroll.y
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,

    GoodsList,
    Scroll,
    BackTop
  },
  methods: {
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
    },

    // 获取商品列表
    getHomeDataAsync(type) {
      const page = this.goods[type].page + 1;
      getHomeData({
        type,
        page
      }).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 初始化下拉加载更多
        this.$refs.scroll.scroll.finishPullUp();
      });
    },

    // tab页点击切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.getHomeDataAsync(this.currentType);
      this.$refs.tabcontrol1.currentIndex = index
      this.$refs.tabcontrol2.currentIndex = index
    },

    // 点击回到顶部
    BackTopClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },

    // 监听滚动事件
    solveScroll(position) {
      // 根据滚动决定返回顶部的显隐
      this.isshow = -position.y > 1000;

      // 根据滚动位置完成tab吸顶效果
      this.showTab = -position.y >this.currentOffsettop
    },

    // 加载更多
    loadMore() {
      this.getHomeDataAsync(this.currentType);
    },

    swiperload() {
      this.currentOffsettop = this.$refs.tabcontrol1.$el.offsetTop;
    }
  }
};
</script>

<style>
.home {
  padding-top: 44px;

  /* 视口高度 */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.tabcontrol {
  background-color: #fff;
  z-index: 9;
}

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
}
</style>
