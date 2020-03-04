<template>
  <div class="good-info">
    <div class="good-title">
      {{ goodInfo.title }}
    </div>
    <div class="price">
      <span class="curprice"> {{ goodInfo.price }} </span>
      <span class="oldprice"> {{ goodInfo.oldPrice }} </span>
      <span class="discountDesc" v-if="goodInfo.discountDesc">{{
        goodInfo.discountDesc
      }}</span>
    </div>
    <div class="extra-info">
      <span v-for="(item, index) in extraInfo" :key="index">{{ item }}</span>
    </div>
    <div class="service-info">
      <span v-for="(item, index) in serviceInfo" :key="index">
        <img :src="'http:' + item.icon" alt="" />
        {{ item.name }}
      </span>
    </div>
    <div class="shop-info">
      <div class="shopName">
        <img :src="'http:' + shopInfo.shopLogo" alt="" />
        <p class="shopLogo">{{ shopInfo.name }}</p>
      </div>
      <div class="shopSellInfo">
        <div class="count">
          <div>{{ shopInfo.cSells }}<br />总销量</div>
          <div>{{ shopInfo.cGoods }}<br />全部宝贝</div>
        </div>
        <div class="score">
          <ul>
            <li v-for="(item, index) in shopInfo.score" :key="index">
              {{ item.name }} &nbsp;
              <span
                style="display: inline-block;width: 40px;padding: 0 6px;"
                :class="item.isBetter ? '' : 'greenColor'"
                >{{ item.score }}</span
              >
              <span v-if="item.isBetter">高</span>
              <span v-else style="background: green;color:#fff">低</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="goShop">
        <button>进店逛逛</button>
      </div>
    </div>
    <div class="detail-info">
      <div v-for="(item, index) in detailInfo.detailImage" :key="index">
        <div class="text">{{ item.key }}</div>
        <div v-for="(citem, index) in item.list" :key="index">
          <img :src="'http:' + citem" alt="" @load="imgLoad"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgInfo: [],
      title: ""
    };
  },
  props: {
    goodInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    extraInfo: {
      type: Array,
      ddefault() {
        return [];
      }
    },
    serviceInfo: {
      type: Array,
      ddefault() {
        return [];
      }
    },
    shopInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgLoad() {
      this.$emit("imgLoad");
    },
  }
};
</script>
<style scoped>
.good-title {
  font-weight: bolder;
  padding: 10px;
  color: #333333;
}
.price {
  padding: 0 10px;
}
.price .curprice {
  font-size: 24px;
  color: var(--color-tint);
}
.price .oldprice {
  text-decoration: line-through;
}
.price .discountDesc {
  position: relative;
  top: -4px;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  padding: 2px 4px;
  margin: 9px;
  background-color: var(--color-tint);
}
.extra-info {
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.service-info {
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 3px solid rgba(100, 100, 100, 0.1);
  border-top: 1px solid rgba(100, 100, 100, 0.1);
}
.service-info img {
  width: 14px;
  height: 14px;
}
.service-info span {
  padding: 4px;
  font-size: 15px;
  color: #000;
}

.shop-info {
  padding: 10px;
  vertical-align: middle;
}

.shop-info .shopLogo {
  display: inline-block;
  position: relative;
  top: -25px;
}

.shop-info img {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  margin-right: 12px;
}
.count {
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-right: 1px solid #333;
  text-align: center;
  line-height: 24px;
}
.shopSellInfo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
}
.score {
  width: 40%;
}
.score ul {
  list-style: none;
  line-height: 25px;
}

.greenColor {
  color: green;
}
.goShop {
  padding: 6px 0;
  text-align: center;
}
.goShop button {
  width: 160px;
  border: none;
  height: 32px;
  background-color: #eee;
  color: #666;
  border-radius: 5px;
}
.detail-info .text {
  padding: 10px;
}
.detail-info img {
  width: 100%;
  height: auto;
}
</style>
