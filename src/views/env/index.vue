<template>
  <div class="app-container">
    <el-form :inline="true" class="form-inline">
      <!-- <el-select class="selectTip" v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select> -->
      <!-- <el-form-item>
            <el-input placeholder=""></el-input>
            </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="newEnv()">新 增 环 境</el-button>
      </el-form-item>

    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column type="selection" width="40" align="center">
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="环境名称" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="域名" width="400" align="center">
        <template slot-scope="scope">
          {{ scope.row.env }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width=auto align="center">
        <template slot-scope="scope">
          <el-button :disabled="disabled" @click="handleClick(scope.row.id)" type="info" size="small">{{btntxt}}</el-button>
          <el-button type="primary" size="small" @click="dialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- <span>这是一段信息</span> -->
      <el-form ref="form" :data="formdialog" label-width="80px">
        <el-form-item label="环境名称">
          <el-input v-model.lazy="formdialog.title"></el-input>
        </el-form-item>
        <el-form-item label="域名地址">
          <el-input v-model="formdialog.path"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveInfo()">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="newdialogVisible" width="30%">
      <!-- <span>这是一段信息</span> -->
      <el-form ref="form" :data="newformdialog" label-width="80px">
        <el-form-item label="环境名称">
          <el-input v-model.lazy="newformdialog.name"></el-input>
        </el-form-item>
        <el-form-item label="域名地址">
          <el-input v-model="newformdialog.env"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newInfo()">保 存</el-button>
      </span>
    </el-dialog>
    <!-- <div class="stration">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[20, 30, 40, 50]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div> -->

  </div>
</template>

<script>
import { getEnv, createEnv, getEnvById, updateEnv, touchEnv } from "@/api/env";
export default {
  filters: {},
  data() {
    return {
      btntxt:"测试连接",
      disabled: false,
      time: 0,
      list: null,
      listLoading: true,
      dialogVisible: false,
      newdialogVisible: false,
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
      options: [],
      value: null,
      formdialog: {
        title: null,
        path: null,
        id: null
      },
      newformdialog: {
        name: null,
        path: null
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleClick(id) {
      touchEnv(id).then(response => {
        if (response.code === 400) {
          this.time = 15;
          this.disabled = true;
          this.timer();
          this.$message.error(response.status);
        } else {
          this.time = 15;
          this.disabled = true;
          this.timer();
          this.$message({
            message: response.status,
            type: "success"
          });
        }
      });
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s,后重新测试";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "测试连接";
        this.disabled = false;
      }
    },
    newEnv() {
      this.newdialogVisible = true;
    },
    fetchData() {
      this.listLoading = true;
      getEnv().then(response => {
        this.list = response.results;
        this.listLoading = false;
      });
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.dialogVisible = false;
        })
        .catch(_ => {});
    },
    dialog(dataScope) {
      this.dialogVisible = true;
      this.formdialog.title = dataScope.name;
      this.formdialog.path = dataScope.env;
      this.formdialog.id = dataScope.id;
    },
    saveInfo() {
      // console.log(this.form);

      updateEnv(
        this.formdialog.id,
        this.formdialog.path,
        this.formdialog.title
      ).then(response => {
        if (response.code === 200) {
          this.fetchData();
        } else {
          alert("=====================");
        }
        this.dialogVisible = false;
      });
    },
    newInfo() {
      createEnv(this.newformdialog.env, this.newformdialog.name).then(
        response => {
          if (response.code === 200) {
            this.fetchData();
          } else {
            alert("=====================");
            this.newdialogVisible = false;
          }
          this.newdialogVisible = false;
        }
      );
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
</style>
