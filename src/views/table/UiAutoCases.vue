<template>
  <div class="app-container">
    <el-form :inline="true" class="form-inline">
      <el-form-item>
        <el-button type="primary" plain @click="gotoNewUiCase">添加单个用例喵</el-button>  
      </el-form-item> 
      <el-form-item>
        <el-input placeholder="请输入内容" style="width:450px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()" style="width:110px">搜 索</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-button type="primary" plain @click="1">执行选中</el-button> -->
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
          {{ scope.row.caseName }}
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          {{ scope.row.describe }}
        </template>
      </el-table-column>
      <!-- <el-table-column width="150" label="开始步骤">
        <template slot-scope="scope">
          {{ scope.row.caseName }}
        </template>
      </el-table-column>
      <el-table-column width="150" label="结束步骤">
        <template slot-scope="scope">
          {{ scope.row.caseName }}
        </template>
      </el-table-column> -->
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
      <!-- <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.parameter | statusFilter">{{ scope.row.parameter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="up_time" label="最近一次执行" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.up_time }}</span>
        </template>
      </el-table-column> -->
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
    <el-dialog
        title="修改|新增"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用例名称">
                <el-input v-model="form.caseName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属产品">
            <el-select v-model="form.region" placeholder="请选择所属产品">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="用例描述">
            <el-input v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="初始步骤">
            <el-input
              height=100px
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="form.beginSteps">
            </el-input>
        </el-form-item>
        <el-form-item label="执行步骤">
            <el-input
              height=100px
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="form.steps">
            </el-input>
        </el-form-item>
        <el-form-item label="结束步骤">
            <el-input
              height=100px
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="form.endSteps">
            </el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="savedialog()">保 存</el-button>
        </span>
    </el-dialog>
  </div>
  
</template>

<script>
import { getUiTestCase ,updateUiTestCases} from "@/api/table";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      textarea: "",
      form: {
        caseName: "",
        describe: "",
        steps: "",
        beginSteps: "",
        endSteps: "",
        platform: "android",
        id:"",
        owner:this.$store.getters.name,
        showToAll:1,
        project:""

      },
      dialogVisible: false,
      list: null,
      listLoading: true,
      uiid: "all"
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getUiTestCase(this.uiid).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    newCase() {
      this.$router.push({ path: "/acrions" });
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.dialogVisible = false;
        })
        .catch(_ => {});
    },
    handleClick(valueA) {
      this.dialogVisible = true;
      this.form.caseName = valueA.caseName;
      this.form.describe = valueA.describe;
      this.form.steps = valueA.steps;
      this.form.beginSteps = valueA.beginSteps;
      this.form.endSteps = valueA.endSteps;
      this.form.id = valueA.id;
      this.form.platform = valueA.platform;
      this.form.owner = valueA.owner;
    },
    gotoNewUiCase() {
      this.dialogVisible = true;
      this.form.caseName = null;
      this.form.describe = null;
      this.form.steps = null;
      this.form.beginSteps = null;
      this.form.endSteps = null;
      this.form.platform = "android";
      this.form.id = null;
    },
    savedialog() {
      updateUiTestCases(this.form).then(
        response => {
          if (response.data.message === "更新成功"){
            this.$message({
            message: "更新成功",
            type: "success"})
            this.dialogVisible = false;
            this.fetchData();
          }
        }
      )
    }
  }
};
</script>
