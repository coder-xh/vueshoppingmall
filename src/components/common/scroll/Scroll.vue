<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:2,
      pullUpLoad:true
    })

    this.scroll.on('scroll',(position) => {
      this.$emit('scrollevent',position)
    })

    
    
    this.scroll.on('pullingUp',() => {
      this.$emit('loadMore')
    })
  },
  methods:{
    refresh(){
      this.scroll.refresh()
    }
  }
};
</script>

<style></style>
