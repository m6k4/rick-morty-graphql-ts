<template>
  <div class="ThePagination">
    <el-pagination background layout="prev, pager, next" 
      :total="total"
      :page-size="pageSize"
      @current-change="$emit('current-change', $event)"
      />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";


export default defineComponent({
  name: "ThePagination",
  props: {
    total: {
      type: Array,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.ThePagination {
  margin-left: 140px;
  margin-top: 40px;
}

.ThePagination .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
  background-color: #fff;
  width: 40px;
  height: 40px;
  border: 1px solid #A9B1BD;
  border-radius: 4px;
  padding: 4px;
  margin: 0px 4px;
  display: inline-flex;
  color: #A9B1BD;
}

.ThePagination .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon {
  padding: 8px;
}

.ThePagination .el-pagination.is-background .el-pager li.active {
  background-color: #11B0C8;
  border: 1px solid #11B0C8;
}

.ThePagination .el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #11B0C8;
}

.ThePaginatio.el-pagination.is-background .el-pager li:not(.disabled).active:hover {
  color: #fff
}
</style>
