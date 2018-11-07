<template>
  <div class="app-container">
    <el-button type="primary" plain @click="gotoNewcases">添加用例</el-button>
    <el-button type="primary" plain @click="1">执行选中</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column
      type="selection"
      width="40"
      align="center"
      >
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="用例名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="管理者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.owner }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column> -->
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.parameter | statusFilter">{{ scope.row.parameter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="up_time" label="最近一次执行" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.up_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
        align="center">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="handleClick(scope.row)">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
  
</template>

<script>
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then(response => {
        this.list = response.results;
        this.listLoading = false;
      }
      );
    },
    newCase() {
      this.$router.push({ path: "/acrions" });
    },
    handleClick(){
      alert('1231231223')
    },
    gotoNewcases(val) {
      this.$router.push({ path: "/views/table/interface?ID=" + val });
    }
  }
};
</script>
