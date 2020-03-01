<template>
  <swiper>
      <swiper-item v-for = '(item,index) in banners' :key='index'> 
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgload">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper';
export default {
  props:['banners'],
  components:{
    Swiper, SwiperItem
  },
  methods:{
    imgload(){
      this.$emit('swiperload')
    }
  }
}
</script>

<style>

</style>