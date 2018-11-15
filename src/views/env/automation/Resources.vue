<template>
  <div class="app-container">
    <el-form :inline="true" class="form-inline">
      <el-form-item>
        <el-button type="primary" @click="newEnv()">新 增 资 源</el-button>
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
      <el-table-column label="资源名称" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="平台" width="400" align="center">
        <template slot-scope="scope">
          {{ scope.row.env }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="图片资源地址" width="400" align="center">
        <template slot-scope="scope">
          {{ scope.row.db_config }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width=auto align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="dialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :data="formdialog" label-width="80px">
        <el-form-item label="资源名称">
          <el-input v-model.lazy="formdialog.title"></el-input>
        </el-form-item>
        <el-form-item label="平台">
          <el-select v-model="form.region" placeholder="选择平台">
            <el-option label="Zone one" value="shanghai"/>
            <el-option label="Zone two" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片">
          <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveInfo()">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="newdialogVisible" width="30%">
      <el-form ref="form" :data="newformdialog" label-width="80px">
        <el-form-item label="资源名称">
          <el-input v-model.lazy="newformdialog.name"></el-input>
        </el-form-item>
        <el-form-item label="平台">
          <el-select v-model="form.region" placeholder="选择平台">
            <el-option label="Zone one" value="shanghai"/>
            <el-option label="Zone two" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片">
          <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newInfo()">保 存</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import Dropzone from "@/components/Dropzone";
export default {
  name: "DropzoneDemo",
  components: { Dropzone },
  filters: {},
  data() {
    return {
      form:{
        region:null
      },
      btntxt: "测试连接",
      disabled: false,
      time: 0,
      list: null,
      listLoading: true,
      dialogVisible: false,
      newdialogVisible: false,
      value: null,
      formdialog: {
        title: null,
        path: null,
        id: null,
        dbconf: null
      },
      newformdialog: {
        name: null,
        path: null,
        dbconf: null
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    dropzoneS(file) {
      console.log(file);
      this.$message({ message: "Upload success", type: "success" });
    },
    dropzoneR(file) {
      console.log(file);
      this.$message({ message: "Delete success", type: "success" });
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
      this.formdialog.dbconf = dataScope.db_config;
    },
    saveInfo() {
      // console.log(this.form);
      updateEnv(
        this.formdialog.id,
        this.formdialog.path,
        this.formdialog.title,
        this.formdialog.dbconf
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
      createEnv(
        this.newformdialog.env,
        this.newformdialog.name,
        this.newformdialog.dbconf
      ).then(response => {
        if (response.code === 200) {
          this.fetchData();
        } else {
          alert("=====================");
          this.newdialogVisible = false;
        }
        this.newdialogVisible = false;
      });
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
