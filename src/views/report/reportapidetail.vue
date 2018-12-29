<template>
  <div class="body_contain" style="margin:5px">
    <div class="header_contain">
      <div class="action_name_contain">
        <div style="height:50%;text-align:center;line-height:140px">
          <strong>
            <span style="font-size:45px">测 试 报 告</span>
          </strong>
        </div>
        <div style="height:50%;text-align:center;line-height:140px">
          <strong>
            <span style="font-size:40px">{{this.form[0]['action_name']}}</span>
          </strong>
        </div>
      </div>
      <div class="action_sub_detail_contain">
        <div style="margin:2px">
          <table style="width:100%;height:277px">
            <tr>
              <td>执行结果:</td>
              <td>{{this.form[0]['status']}}</td>
              <td>持续时间:</td>
              <td>{{this.form[0]['end_time'] - this.form[0]['start_time']}}S</td>
            </tr>
            <tr>
              <td>执行数量:</td>
              <td>{{this.form[0]['action_sub_count']}}</td>
              <td>环境:</td>
              <td>{{this.form[0]['env_info']}}</td>
            </tr>
            <tr>
              <td>成功率:</td>
              <td>{{this.form[0]['action_sub_success']/this.form[0]['action_sub_count']*100}}%</td>
              <td>执行者:</td>
              <td>{{this.form[0]['runner']}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="detail_contain">
      <div class="detail_name_contain">
        <el-table
          v-loading="listLoading"
          :data="listData"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          :show-header="false"
        >
          <el-table-column align="center" label="ID">
            <template slot-scope="scope">
              <span style="font-size:15px">{{scope.row}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="detail_sub_detail_contain"></div>
    </div>
  </div>
</template>

<script>
import {getReportDetail} from "@/api/report";
export default {
  data() {
    return {
      listLoading:false,
      urlid:null,
      listData: ["获取老师布置的单词_copy"],
      form: {}
    };
  },
  created(){
    this.urlid = this.$route.query.id;
    this.fetch();
  },
  methods:{
    fetch(){
      getReportDetail(this.urlid).then(response =>{
        this.form = response.results;
      })
    }
  }
};
</script>

<style scoped>
.body_contain {
  background-color: rgb(166, 221, 221);
}
.header_contain {
  height: 280px;
  width: 100%;
  background-color: rgb(221, 166, 187);
}
.action_name_contain {
  float: left;
  height: 100%;
  width: 20%;
  background-color: rgb(136, 138, 236);
}
.action_sub_detail_contain {
  float: right;
  height: 100%;
  width: 80%;
  background-color: rgb(136, 236, 174);
}
.detail_contain {
  margin-top: 5px;
  height: 400px;
  width: 100%;
  background-color: rgb(236, 136, 136);
}
.detail_name_contain {
  float: left;
  width: 20%;
  height: 100%;
  background-color: rgb(201, 243, 12);
}
.detail_sub_detail_contain {
  float: right;
  width: 80%;
  height: 100%;
  background-color: rgb(47, 12, 243);
}
table,
th,
td {
  border: 0.3px solid rgba(41, 40, 40, 0.233);
  width: 25%;
}
</style>
