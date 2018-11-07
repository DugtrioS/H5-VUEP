<template>
    <div>
        <div>
            <header>
                <h3> 测试报告总汇</h3>
            </header>
        </div>
        <div id="leftChart">
            <chart height="100%" width="100%" :rawData="list"/>
        </div>
        <div id="rightChart">
            
        </div>
        <div id="upHere">
            <el-table
            v-loading="listLoading"
            :data="reportlistdata"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
            @row-click="rowClick">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="名称: ">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item>
                            </el-form-item>
                            <el-form-item label="接口地址： ">
                                <span>{{ props.row.apiAddress }}</span>
                            </el-form-item>
                            <el-form-item label="请求方式： ">
                                <span>{{ props.row.requestType }}</span>
                            </el-form-item>
                            <el-form-item label="测试结果： ">
                                <span>{{ props.row.result }}</span>
                            </el-form-item>
                            <el-form-item>
                            </el-form-item>
                            <el-form-item label="请求头： ">
                                <span style="word-break: break-all;overflow:auto;overflow-x:hidden">{{ props.row.header }}</span>
                            </el-form-item>
                            <el-form-item label="返回头： ">
                                <span style="word-break: break-all;overflow:auto;overflow-x:hidden">{{props.row.responseHeader}}</span>
                            </el-form-item>
                            <el-form-item label="请求参数： ">
                                <span style="word-break: break-all;overflow:auto;overflow-x:hidden">{{ props.row.parameter }}</span>
                            </el-form-item>
                            <el-form-item label="返回结果： ">
                                <span style="word-break: break-all;overflow:auto;overflow-x:hidden">{{props.row.responseData}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="ID" width="80px">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="名称" width="auto">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="测试时间" width="auto">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="用例数量" width="auto">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="PASS个数" width="auto">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="FAIL个数" width="auto">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="环境" width="auto">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="耗时" width="auto">
                    <template slot-scope="scope">
                        {{scope.row.id}}mm
                    </template>
                </el-table-column>
                <el-table-column align=center label="详细" width="150px">
                    <template slot-scope="scope">
                        <el-tag id="tagStyle" :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
                        <el-button id="buttonStyle" type="primary" size="small" @click="jumpToDetail(scope.row.id)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import G2Line from "@/components/AntV/tingChart";
import Chart from "@/components/Charts/mixChart";
export default {
  components: { Chart, G2Line },
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
      expands: []
    };
  },
  methods: {
    jumpToDetail(val) {
      alert("123123213");
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
#upHere {
  margin: 325px 5px auto 5px;
}
#tagStyle {
  float: left;
}
#buttonStyle {
  float: right;
}
</style>
