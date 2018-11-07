<template>
  <div class="use-case">
    <div class="operate">
      <button class="save">保存</button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :span-method="objectSpanMethod"
      fit>
      <el-table-column
        prop="name"
        label="用例"
        >
      </el-table-column>
      <el-table-column
        prop="combo"
        label="组合"
        style="position: relative"
        >
        <template slot-scope="scope">
          <textarea name="" id="" cols="30" rows="10" class="text"></textarea>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {name: '用例1'},
        {name: '用例2'},
        {name: '用例3'},
        {name: '用例4'},
        {name: '用例5'},
        {name: '用例6'},
        {name: '用例7'},
        {name: '用例8'}
      ]
    }
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return {
          rowspan: this.tableData.length,
          colspan: 1
        };
      }
    }
  }

};
</script>

<style lang="scss" scoped>
.use-case {
  position: relative;
  background-color: #f2f3f7;
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .clearfix {
    &::after {
      display: table;
      content: '';
      clear: both;
    }
  }
  .operate {
    padding: 10px 20px;
    background-color: #ffffff;
    .save {
      background-color: #005eef;
      font-size: 12px;
      border-radius: 5px;
      color: #ffffff;
      padding: 5px;
      width: 60px;
      height: 30px;
    }
    td {
      padding: 5px;
    }
  }
  .text {
    border: 1px solid #dcdfe6;
    width: 100%;
    height: 100%;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
