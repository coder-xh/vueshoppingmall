<template>
  <div class="tabcontrol">
    <div
      class="tabcontrol-item"
      v-for="(item, index) in title"
      :key="index"
      :class="index == currentIndex ? 'active' : ''"
      @click="tabClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('tabcontrolClick',index)
    }
  }
};
</script>

<style>
.tabcontrol {
  height: 44px;
  line-height: 44px;
  display: flex;
  text-align: center;
}
.tabcontrol-item {
  flex: 1;
}

.active span {
  padding: 5px;
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}
</style>
