<template>
  <div>
    <div>
      <header>
        <h3>测试报告总汇</h3>
      </header>
    </div>
    <!-- <div id="leftChart">
            <chart height="100%" width="100%" :rawData="list"/>
        </div>
        <div id="rightChart">
            
    </div>-->
    <el-row :gutter="25">
      <el-col :lg="8">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
      <el-col :lg="16">
        <div class="chart-wrapper">
          <chart height="300px" width="100%" :rawData="list"/>
        </div>
      </el-col>
    </el-row>
    <div id="upHere">
      <el-table
        v-loading="listLoading"
        :data="report_form"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="名称: ">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item label="接口地址： ">
                <span>{{ props.row.apiAddress }}</span>
              </el-form-item>
              <el-form-item label="请求方式： ">
                <span>{{ props.row.requestType }}</span>
              </el-form-item>
              <el-form-item label="测试结果： ">
                <span>{{ props.row.result }}</span>
              </el-form-item>
              <el-form-item></el-form-item>
              <el-form-item label="请求头： ">
                <span
                  style="word-break: break-all;overflow:auto;overflow-x:hidden"
                >{{ props.row.header }}</span>
              </el-form-item>
              <el-form-item label="返回头： ">
                <span
                  style="word-break: break-all;overflow:auto;overflow-x:hidden"
                >{{props.row.responseHeader}}</span>
              </el-form-item>
              <el-form-item label="请求参数： ">
                <span
                  style="word-break: break-all;overflow:auto;overflow-x:hidden"
                >{{ props.row.parameter }}</span>
              </el-form-item>
              <el-form-item label="返回结果： ">
                <span
                  style="word-break: break-all;overflow:auto;overflow-x:hidden"
                >{{props.row.responseData}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>-->
        <el-table-column align="center" label="ID" width="80px">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column align="center" label="名称" width="auto">
          <template slot-scope="scope">{{scope.row.action_name}}</template>
        </el-table-column>
        <el-table-column align="center" label="测试时间" width="auto">
          <template slot-scope="scope">
            <span>{{scope.row.start_time | parseTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用例数量" width="auto">
          <template slot-scope="scope">{{scope.row.action_sub_count}}</template>
        </el-table-column>
        <el-table-column align="center" label="PASS个数" width="auto">
          <template slot-scope="scope">{{scope.row.action_sub_success}}</template>
        </el-table-column>
        <el-table-column align="center" label="FAIL个数" width="auto">
          <template slot-scope="scope">{{scope.row.action_sub_failure}}</template>
        </el-table-column>
        <el-table-column align="center" label="环境" width="auto">
          <template slot-scope="scope">{{scope.row.env_info}}</template>
        </el-table-column>
        <el-table-column align="center" label="耗时" width="auto">
          <template slot-scope="scope">{{scope.row.end_time - scope.row.start_time}}S</template>
        </el-table-column>
        <el-table-column align="center" label="执行者" width="auto">
          <template slot-scope="scope">{{scope.row.runner}}mm</template>
        </el-table-column>
        <el-table-column align="center" label="详细" width="150px">
          <template slot-scope="scope">
            <el-tag id="tagStyle" :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
            <el-button
              id="buttonStyle"
              type="primary"
              size="small"
              @click="jumpToDetail(scope.row.id)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {parseTime} from "@/utils";
import PieChart from "@/components/Charts/PieChart";
import G2Line from "@/components/AntV/tingChart";
import Chart from "@/components/Charts/mixChart";
import { getReports } from "@/api/report";
export default {
  components: { Chart, G2Line, PieChart },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        failure: "danger"
      };
      return statusMap[status];
    },
    parseTime(time){
      return parseTime(time, '{y}-{m}-{d} {h}:{i}');
    }
  },
  data() {
    return {
      report_form: null,
      listLoading: false,
      serverData: [
        {
          year: "2010",
          value: 3
        },
        {
          year: "2011",
          value: 4
        },
        {
          year: "2012",
          value: 3.5
        },
        {
          year: "2013",
          value: 5
        },
        {
          year: "2014",
          value: 4.9
        },
        {
          year: "2015",
          value: 6
        },
        {
          year: "2016",
          value: 7
        },
        {
          year: "2017",
          value: 9
        },
        {
          year: "2018",
          value: 13
        }
      ],
      reportlistdata: [
        {
          id: 12,
          status: "gray"
        },
        {
          id: 34,
          status: "danger"
        }
      ],
      list: [
        709,
        1917,
        2455,
        2610,
        1719,
        1433,
        1544,
        3285,
        5208,
        3372,
        2484,
        4078
      ],
      expands: [],
      formatTime: null
    };
  },
  created() {
    this.Reports();
  },
  methods: {
    Reports() {
      getReports().then(response => {
        this.report_form = response.results;
      });
    },
    jumpToDetail(val) {
      this.$router.push({ path: "/report/reportapidetail?id=" + val});
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
#leftChart {
  height: 445px;
  background: lightblue;
  width: 50%;
  float: left;
  margin: 5px;
}

#rightChart {
  height: 445px;
  /* background: lightgreen; */
  width: 48.6%;
  float: right;
  margin: 5px;
}
#tagStyle {
  float: left;
}
#buttonStyle {
  float: right;
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
</style>
