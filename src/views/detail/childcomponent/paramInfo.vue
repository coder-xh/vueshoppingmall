<template>
  <div class="param-info" v-if="paInfo.info">
    <div class="text">{{ paInfo.info.key ||'' }}</div>

    <el-table
      v-if="paInfo.info"
      :data="paInfo.info.set"
      style="width: 100%"
      :cell-style="cellStyle"
    >
      <el-table-column prop="key" width="100"> </el-table-column>
      <el-table-column prop="value" width="280"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    paInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return "color:var(--color-tint)";
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.param-info {
  border-bottom: 5px solid rgba(100, 100, 100, 0.1);
  border-top: 5px solid rgba(100, 100, 100, 0.1);
}
.text {
  padding: 10px;
}
</style>
