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
          <!-- <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ scope.row.create_time }}</span>
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
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更多" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="runner(scope.row.id)"
          >EDIT</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-caret-right"
            @click="prepare_runner(scope.row.id)"
          >RUN</el-button>
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

    <div class="run_dialog">
      <el-dialog
        title="执行板"
        :visible.sync="dialogVisible"
        :fullscreen="istrue"
        :before-close="handleClose"
      >
        <div>
          <el-row style="margin-bottom:15px">
            <div class="process_title" style="width:100%;height:30%">
              <strong>
                <span style="font-size:45px">{{this.process_data.name}}</span>
              </strong>
            </div>
          </el-row>
          <div style="width:100%">
            <el-form ref="form" :model="form" style="width:33%">
              <el-form-item>
                <el-input v-model="form.host" placeholder="请选择执行环境"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="form.host" placeholder="选择忽略用例类型"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-button @click="start_runner()">12345</el-button>
          </div>
          <el-col>
            <el-table
              :key="Math.random()"
              :data="process_data['executed_cases']"
              style="width: 100%"
            >
              <el-table-column label="用例名称" min-width="25%">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column label="PROCESS" min-width="65%">
                <template slot-scope="scope">
                  <el-progress :text-inside="true" :stroke-width="18" :percentage="5"></el-progress>
                </template>
              </el-table-column>
              <el-table-column label="STATUS" min-width="10%">
                <template slot-scope="scope">
                  <span>{{scope.row.status}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getApiAction, prepare_runAction } from "@/api/action";
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
      sit:Object,
      sumnum: 0,
      form: {
        host: null
      },
      istrue: true,
      process_data: {},
      dialogVisible: false,
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
    start_runner() {
      this.sit = setInterval(this.action_runner, 1000);
      while (this.sumnum == 50) {
        clearInterval(this.sit);
        this.sumnum = 0;
      }
    },
    action_runner() {
      prepare_runAction(11, false).then(response => {
        this.process_data = response;
        if (response.code === 200 && response.status === "执行中...") {
          this.sumnum++;
          console.log(response.code, response.status);
        } else {
          console.log(response.code, response.status);
          clearInterval(this.sit);
          this.sumnum = 0;
        }
      });
    },

    prepare_runner(val) {
      prepare_runAction(11, true).then(response => {
        this.process_data = response;
        this.dialogVisible = true;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    search() {
      getApiAction(this.paginationData).then(response => {
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
      getApiAction(this.paginationData).then(response => {
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
    runner(val) {
      this.$router.push({ path: "/views/testcases/dndapilist?id=" + val });
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
