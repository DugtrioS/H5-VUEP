<template>
  <div class="app-container">
    <div class="addaction">
      <el-button type="primary" plain @click="gotoNewUiAction">添加场景</el-button>
    </div>
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
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column wideth=auto label="场景id排序::自左向右">
        <template slot-scope="scope">
          {{ scope.row.testCasesId }}
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
      <!-- <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.parameter | statusFilter">{{ scope.row.parameter }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="up_time" label="描述" width="200">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"/> -->
          <span>{{ scope.row.describe }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
        align="center">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="handleClick(scope.row)">编辑</el-button>
        <el-button type="primary" size="small" @click="runCases(scope.row)">执行</el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="环境名称">
                <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属产品">
            <el-select v-model="form.region" placeholder="请选择所属产品">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="域名地址">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
        </span>
    </el-dialog> -->
  </div>
  
</template>

<script>
import { getUiTestCaseSet, runUiCases } from "@/api/table";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      form: {

      },
      dialogVisible: false,
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
      getUiTestCaseSet('all').then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleClick(valueA) {
      this.$router.push({path:"/views/testcases/dndlist",query: {id:valueA.id,name:valueA.name,describe:valueA.describe}});
    },
    gotoNewUiAction() {
      this.$router.push({path:"/views/testcases/dndlist"});
    },
    runCases(valueId){
      this.$message({
              message: "发送执行队列,执行中",
              type: "success"})
      var ids = {
        id:valueId.id,
        runner:this.$store.getters.name?this.$store.getters.name:'ADMIN'
      }
      runUiCases(ids).then(
          response=>{
            if(response.code === 200){
              this.$message({
              message: "执行完毕",
              type: "success"})
              }
          }
      )
    }
  }
};
</script>

<style scoped>
.addaction{
  margin-bottom: 10px;
}
</style>


