<template>
  <div class="app-container">
    <el-form :inline="true" class="form-inline">
      <el-form-item>
        <el-input
          class="inputTip"
          v-model="paginationData.search"
          placeholder="请输入内容"
          style="width:450px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()" style="width:110px">搜 索</el-button>
      </el-form-item>
    </el-form>
    <!-- TABLE -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="日期">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="级别">
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="最近一次执行结果" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="250px" label="场景名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更多" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="scope.row.edit=!scope.row.edit"
          >Edit</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-caret-right"
            @click="runner"
          >Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="paginationData.page"
      :page-size="paginationData.pageSize"
      layout="prev, pager, next"
      :total="paginationData.total"
    ></el-pagination>
  </div>
</template>

<script>
import { getApiList, schList } from "@/api/table";
export default {
  name: "ApiAction",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      paginationData: {
        page: 1,
        total: 1000,
        pageSize: 10,
        search: ""
      },
      list: null,
      listLoading: true
    };
  },
  created() {
    this.fetchData(this.paginationData.page);
  },
  methods: {
    handleClose() {},

    search() {
      getApiList(this.paginationData).then(response => {
        if (response.code === 200) {
          this.list = response.results;
          this.paginationData.total = response.count;
        } else {
          this.list = response.results;
          alert("未搜索到数据");
        }
      });
    },
    fetchData() {
      this.listLoading = true;
      getApiList(this.paginationData).then(response => {
        this.list = response.results;
        this.listLoading = false;
        this.paginationData.total = response.count;
      });
    },
    gotoNewcases(val) {
      this.$router.push({ path: "/views/table/interface?ID=" + val });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.paginationData.page = val;
      this.fetchData(this.paginationData.page);
    },
    runner(){

    }

  }
};
</script>

<style scoped>
.index {
  margin: 35px 0px 15px 35px;
}
.selectTip {
  margin-right: 25px;
}
.inputTip {
  margin-right: 25px;
}
.stration {
  float: right;
}
.edit-input {
  padding-right: 100px;
}
</style>
