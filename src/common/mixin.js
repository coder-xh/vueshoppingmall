
export const backTopMixin = {
  data: function () {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: '流行'
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = '流行'
          break
        case 1:
          this.currentType = '新款'
          break
        case 2:
          this.currentType = '精选'
          break
      }
      console.log(this.currentType);
    }
  }
}
