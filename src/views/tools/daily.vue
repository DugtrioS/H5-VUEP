<template>
  <div class="FormAll">
    <div class="headerForm">
      <div class="leftHeader">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="产线">
            <el-select v-model="form.products" multiple placeholder="请选择产线" style="width: 95%;">
              <el-option
                v-for="item in prducts_options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="环境">
            <el-select v-model="form.env" placeholder="请选择环境" style="width: 95%;">
              <el-option label="test" value="test"></el-option>
              <el-option label="offline" value="offline"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明">
            <el-input type="textarea" v-model="form.describe" style="width: 95%;" :rows="5"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-col :span="11">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="form.start_time"
                style="width: 100%;"
                value-format="yyyy-MM-dd hh:mm:ss"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div class="rigthHeader">
        <el-table :data="projects" style="width:100%;" :stripe="true" fit>
          <el-table-column label="项目" min-width="40%">
            <template slot-scope="scope">
              <el-input
                autosize
                v-model="scope.row.project_name"
                class="w100p"
                placeholder="NAME"
                border="none"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="TAG" min-width="45%">
            <template slot-scope="scope">
              <el-input
                autosize
                v-model="scope.row.project_tag"
                class="w100p"
                placeholder="VALUE"
                border="none"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="15%">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="delline(projects,scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="operation" label="操作" min-width="15%">
            <template slot-scope="scope" class="clearfix">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                class="fl"
                @click="delline(element['rq_header'],scope.$index)"
              ></el-button>
            </template>
          </el-table-column>-->
        </el-table>
        <div
          @click="addline"
          style="margin-top:5px;margin-right: 5px;text-align:right;font-size:10px"
        >+ 添加一行</div>
      </div>
    </div>
    <div class="bodyForm">
      <el-table :data="sub" border style="width: 100%">
        <el-table-column fixed label="需求名称" width="600">
          <template slot-scope="scope">
            <el-select v-model="scope.row.require_name" placeholder="请选择需求" style="width: 95%;">
              <el-option
                v-for="item in require_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="执行人" width="130px">
          <template slot-scope="scope">
            <el-select v-model="scope.row.runner">
              <el-option
                v-for="item in name_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="222px">
          <template slot-scope="scope">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="scope.row.start_time"
              style="width: 100%;"
              value-format="yyyy-MM-dd hh:mm:ss"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="end_time" label="结束时间" width="222px">
          <template slot-scope="scope">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="scope.row.end_time"
              style="width: 100%;"
              value-format="yyyy-MM-dd hh:mm:ss"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="用例总数" width="auto">
          <template slot-scope="scope">
            <el-input v-model="scope.row.total" width="140px"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="pass_count" label="通过数" width="auto">
          <template slot-scope="scope">
            <el-input v-model="scope.row.pass_count" width="140px"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="fail" label="失败数" width="auto">
          <template slot-scope="scope">
            <el-input v-model="scope.row.fail" width="140px"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="bug" label="bug数" width="auto">
          <template slot-scope="scope">
            <el-input v-model="scope.row.bug" width="140px"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="result" label="结果" width="130px">
          <template slot-scope="scope">
            <el-select v-model="scope.row.result">
              <el-option
                v-for="item in test_result_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="change" label="变更情况" width="300px">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.change"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="jam" label="阻碍" width="300px">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.jam"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="process" label="流程情况" width="300px">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.process"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="regression" label="回归情况" width="300px">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.regression"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="addtablerow" type="text" size="small">新增</el-button>
            <el-button @click="delline(sub,scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="saveInfo()" style="width:100%">提交</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { saveDailyReport } from "@/api/tools";
export default {
  computed: {
    ...mapGetters(["name", "roles"])
  },
  created() {},
  data() {
    return {
      login_user: null,
      form: {
        products: [],
        env: null,
        start_time: null,
        describe: null
      },
      sub: [
        {
          require_name: null,
          runner: null,
          start_time: null,
          end_time: null,
          total: null,
          pass_count: null,
          fail: null,
          bug: null,
          result: null,
          change: null,
          jam: null,
          process: null,
          regression: null
        }
      ],
      prducts_options: [
        {
          value: "授课中心",
          label: "授课中心"
        },
        {
          value: "智学中心",
          label: "智学中心"
        },
        {
          value: "家委会",
          label: "家委会"
        },
        {
          value: "公共项目",
          label: "公共项目"
        }
      ],
      test_result_options: [
        {
          value: "通过",
          label: "通过"
        },
        {
          value: "不通过",
          label: "不通过"
        }
      ],
      require_options: [
        {
          value: "升学院校定位系统--更新升学院校相关信息数据、交互优化",
          label: "升学院校定位系统--更新升学院校相关信息数据、交互优化"
        },
        {
          value: "排课是否显示在客户端+升学课程显示一级目录",
          label: "排课是否显示在客户端+升学课程显示一级目录"
        },
        {
          value: "竞赛/冲刺课程筛选字段调整",
          label: "竞赛/冲刺课程筛选字段调整"
        },
        {
          value: "精品讲义新手指引",
          label: "精品讲义新手指引"
        },
        {
          value: "霍兰德测评--入口更改",
          label: "霍兰德测评--入口更改"
        },
        {
          value: "课程变更提醒功能里新增排课 细化展示排课来源",
          label: "课程变更提醒功能里新增排课 细化展示排课来源"
        },
        {
          value:
            "埋点：作业添加进课件的题目数据追踪至精品讲义下的四个类别以及严选题目的一二三级知识点",
          label:
            "埋点：作业添加进课件的题目数据追踪至精品讲义下的四个类别以及严选题目的一二三级知识点"
        },
        {
          value:
            "【bug】课后评价，老师勾选学生地区不准确，未显示省市区供老师选择",
          label:
            "【bug】课后评价，老师勾选学生地区不准确，未显示省市区供老师选择"
        },
        {
          value: "修复版本 技术支持工作时间",
          label: "修复版本 技术支持工作时间"
        },
        {
          value: "少儿课程引导",
          label: "少儿课程引导"
        },
        {
          value: "课前检测文案优化",
          label: "课前检测文案优化"
        },
        {
          value: "添加换肤功能（固定图片、三端 所有终端）",
          label: "添加换肤功能（固定图片、三端 所有终端）"
        },
        {
          value: "作业提交限制字数修改",
          label: "作业提交限制字数修改"
        },
        {
          value: "教研课件优化",
          label: "教研课件优化"
        },
        {
          value: "【bug】公告取消置顶后，发送时间会变成取消置顶的时间",
          label: "【bug】公告取消置顶后，发送时间会变成取消置顶的时间"
        }
      ],
      name_options: [
        {
          value: "刘卫星",
          label: "刘卫星"
        },
        {
          value: "吕晶",
          label: "吕晶"
        },
        {
          value: "赵梦敏",
          label: "赵梦敏"
        },
        {
          value: "赵银静",
          label: "赵银静"
        },
        {
          value: "赵海萍",
          label: "赵海萍"
        },
        {
          value: "蒋佳乐",
          label: "蒋佳乐"
        },
        {
          value: "王俊飞",
          label: "王俊飞"
        },
        {
          value: "吕平",
          label: "吕平"
        },
        {
          value: "冯乔姗",
          label: "冯乔姗"
        },
        {
          value: "熊勇涛",
          label: "熊勇涛"
        },
        {
          value: "罗小艺",
          label: "罗小艺"
        },
        {
          value: "肖龙英",
          label: "肖龙英"
        },
        {
          value: "常玉风",
          label: "常玉风"
        },
        {
          value: "刘明达",
          label: "刘明达"
        },
        {
          value: "栾宇强",
          label: "栾宇强"
        },
        {
          value: "秦英龙",
          label: "秦英龙"
        },
        {
          value: "荣连付",
          label: "荣连付"
        },
        {
          value: "郎丽",
          label: "郎丽"
        },
        {
          value: "冯姣姣",
          label: "冯姣姣"
        },
        {
          value: "季培红",
          label: "季培红"
        }
      ],
      projects: [{ project_name: null, project_tag: null }]
    };
  },
  methods: {
    addtablerow() {
      this.sub.push({
        require_name: null,
        runner: null,
        start_time: null,
        end_time: null,
        total: null,
        pass_count: null,
        fail: null,
        bug: null,
        result: null,
        change: null,
        jam: null,
        process: null,
        regression: null
      });
    },
    addline() {
      this.projects.push({ project_name: null, project_tag: null });
    },
    delline(valueB, valueC) {
      {
        if (valueB.length === 1) {
          this.$notify.error({
            title: "错误",
            message: "至少存在一条"
          });
        } else {
          valueB.splice(valueC, 1);
        }
      }
    },
    saveInfo() {
      var savedata = this.form;
      savedata["sub"] = this.sub;
      savedata["projects"] = this.projects;
      saveDailyReport(savedata).then(response => {
        if (response.code == 200) {
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success"
          });
          
        } else {
          this.$notify.error({
            title: "错误",
            message: "保存失败，请联系卫星"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.FormAll {
  margin: 5px;
  background: #e5e9f277;
  width: auto;
  overflow: auto;
  min-height: 400px;
}
.headerForm {
  width: 100%;
  height: 100%;
}
.leftHeader {
  margin: 3px;
  width: 49%;
  height: 100%;
  float: left;
}
.rigthHeader {
  margin: 3px;
  width: 50%;
  height: 100%;
  float: right;
}
.bodyForm {
  margin: 3px;
  width: auto;
  height: auto;
}
</style>
