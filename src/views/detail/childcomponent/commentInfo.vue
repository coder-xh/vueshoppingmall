<template>
  <div class="comment-info" v-if="commentInfo.length !== 0">
    <div class="text">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="conment-content">
      <div v-for="(item, index) in commentInfo.list" :key="index">
        <div class="userInfo">
          <img :src="'http:' + item.user.avatar" alt="" />
          <p class="userName">{{ item.user.uname }}</p>
        </div>
        <div class="userComment">
          {{item.content}}
        </div>
        <div class="userCommentlist">
          {{item.style}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.comment-info {
  border-bottom: 5px solid rgba(100, 100, 100, 0.1);
  border-top: 5px solid rgba(100, 100, 100, 0.1);
}
.conment-content{
  padding: 10px
}
.text {
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.comment-info img {
  width: 50px;
  height: 50px;
  border-radius: 60px;
  margin-right: 12px;
}
.comment-info .userName {
  display: inline-block;
  position: relative;
  top: -20px;
}
.userCommentlist{
   padding:10px 0;
   color:#ccc
}
</style>
