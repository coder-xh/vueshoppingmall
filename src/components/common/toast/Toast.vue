<template>
  <div class="toast" v-show="isshow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      message: "",
      isshow: false
    };
  },
  methods: {
    show(message, duartion) {
      this.isshow = true;
      this.message = message;
      setTimeout(() => {
        this.isshow = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;

  z-index: 999;
  background-color: rgba(0,0,0,0.75);
  color: #fff;
}
</style>
