<template>
    <div>
        <div>
          <el-button
          type="primary"
          @click="$router.go(-1)"
          >返 回</el-button>
        </div>
        <el-table
        v-loading="listLoading"
        :data="reportlistdata"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @row-click="rowClick">
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="开始时间: ">
                            <span>{{ props.row.startTime }}</span>
                        </el-form-item>
                        <el-form-item>
                        </el-form-item>
                        <!-- <el-form-item label="结束时间： ">
                            <span>{{ props.row.endTime }}</span>
                        </el-form-item> -->
                        <el-form-item label="持续时间： ">
                            <span>{{ props.row.continueTime }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column align="center" label="ID" width="80px">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="UI_CASE_ID" width="180px">
                <template slot-scope="scope">
                    {{scope.row.correspondingCases}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="执行结果" width="80px">
                <template slot-scope="scope">
                    <el-tag style="center" :type="scope.row.result | statusFilter">{{ scope.row.result }}</el-tag>
                    <!-- {{scope.row.result}} -->
                </template>
            </el-table-column>
            <el-table-column align="center" label="执行信息" width="auto">
                <template slot-scope="scope">
                    {{scope.row.Info}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="错误信息" width="auto">
                <template slot-scope="scope">
                    {{scope.row.errorInfo}}
                </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="开始时间" width="auto">
                <template slot-scope="scope">
                    {{scope.row.startTime}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="结束时间" width="auto">
                <template slot-scope="scope">
                    {{scope.row.endTime}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Continue Time" width="auto">
                <template slot-scope="scope">
                    {{scope.row.continueTime}}
                </template>
            </el-table-column> -->
            <!-- <el-table-column align="center" label="执行者" width="120px">
                <template slot-scope="scope">
                    {{scope.row.runner}}
                </template>
            </el-table-column> -->
            <!-- <el-table-column align="center" label="耗时" width="auto">
                <template slot-scope="scope">
                    {{scope.row.id}}mm
                </template>
            </el-table-column> -->
            <!-- <el-table-column align=center label="详细" width="150px">
                <template slot-scope="scope">
                    <el-tag style="float: left;" :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
                    <el-button id="buttonStyle" type="primary" size="small" @click="jumpToDetail(scope.row.id)">查看</el-button>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>


<script>
import { getUiCaseRepById } from "@/api/report";
export default {
    filters: {
    statusFilter(status) {
        const statusMap = {
        true: "success",
        false: "danger"
        };
        return statusMap[status];
    }
  },
  data() {
    return {
      reportlistdata: null,
      uireportid:this.$route.query.id?this.$route.query.id:''
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getUiCaseRepById(this.uireportid).then(response => {
        this.reportlistdata = response.results;
        this.listLoading = false;
      });
    },
    rowClick(row, event, column) {
      //控制展开行
      var NoIndex = column.type.indexOf("expand");
      if (NoIndex == 0 && row.child.length <= 0) {
        this.expands = [];
        return;
      }
      if (row.child.length > 0) {
        Array.prototype.remove = function(val) {
          let index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        if (this.expands.indexOf(row.id) < 0) {
          //确保只展开一行
          this.expands.shift();
          this.expands.push(row.id);
        } else {
          this.expands.remove(row.id);
        }
      } else {
        return;
      }
    }
  }
};
</script>

<style scoped>
div {
  margin: 10px;
}
</style>
