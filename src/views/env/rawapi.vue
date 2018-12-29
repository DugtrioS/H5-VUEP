<template>
    <div class="app-container">
        <el-form :inline="true" class="form-inline">

            <el-form-item>
                <el-input class="inputTip" v-model="paginationData.search" placeholder="请输入内容" style="width:450px"></el-input>
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" @click="search()" style="width:110px">搜 索</el-button>
            </el-form-item>
        </el-form>
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
      <el-table-column align="left" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="接口名称" align="left" width=auto>
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="附有参数" width=auto align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.parameter }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="方法" width="110px" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.method }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="URI" width="400" align="left">
        <template slot-scope="scope">
          {{ scope.row.path }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        align="center">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="dialogVisible = true">查 看</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-dialog
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
    </el-dialog>

    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="paginationData.page"
      :page-size="paginationData.pageSize"
      layout="prev, pager, next"
      :total="paginationData.total">
    </el-pagination>
    </div>

</template>

<script>
import { getApiList , schList} from "@/api/table";
export default {
  data() {
    return {
      paginationData: {
        page: 1,
        total: 1000,
        pageSize: 10,
        search:""
      },
      list: null,
      listLoading: true,
      dialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      options: null,
      value: null,
      input: null
    };
  },
  created() {
    this.fetchData(this.paginationData.page);
  },
  methods: {
    handleClose(){

    },

    search() {
      getApiList(this.paginationData).then(
        response => {
          if (response.code === 200){
            this.list = response.results;
            this.paginationData.total = response.count;
          } else {
            this.list = response.results;
            alert("未搜索到数据")
          }
        }
      )
      
    },
    fetchData() {
      this.listLoading = true;
      getApiList(this.paginationData).then(response => {
        this.list = response.results;
        this.listLoading = false;
        this.paginationData.total = response.count;
      });
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.paginationData.page = val;
      this.fetchData(this.paginationData.page);

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
</style>
