<template>
  <div class="board-column">
    <div class="board-column-header">{{ headerText }}</div>
    <draggable :list="list" :options="options" class="board-column-content">
      <div v-for="element in list" :key="element.id" class="board-item">
        <!-- {{ element.name }} {{ element.id }} -->
        <el-collapse :v-if="activeStatus">
          <el-collapse-item v-if="activeStatus" :title="element['base_data'][0]['api_name']">
            <div class="interface">
              <div>
                <el-button >
                  123
                </el-button>
              </div>
              <div class="main-nav clearfix" :class="{ 'isFix': isFixed}">
                <ul class="fr">

                  <li class="fl">
                    <a href="#basic">#基础信息</a>
                  </li>
                  <li class="fl">
                    <a href="#header">#请求头</a>
                  </li>
                  <li class="fl">
                    <a href="#request">#请求参数</a>
                  </li>
                  <li class="fl">
                    <a href="#response">#断言</a>
                  </li>
                </ul>
              </div>
              <div class="main-content">
                <div class="section" id="basic">
                  <p>基础信息（带 * 的为必填项）   当前位置 : {{element['base_data'][0]['api_name']}}</p>
                  <div class="content">
                    <table
                      class="table"
                      border="1"
                      cellspacing="0"
                      cellpadding="0"
                      bordercolor="#ddd"
                      width="100%"
                    >
                      <tr>
                        <td class="tc w100">接口名称 *</td>
                        <td class="tc">
                          <el-input
                            v-model="element['base_data'][0]['api_name']"
                            class="w100p"
                            type="text"
                            maxlength="50"
                            placeholder="示例：获取订单列表接口"
                          ></el-input>
                        </td>
                        <td class="tc w100">HOST *</td>
                        <td class="tc">
                          <el-select
                            class="w100p"
                            v-model="element['base_data'][0]['host']"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in options1"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </td>
                      </tr>
                      <tr>
                        <td class="tc">URL *</td>
                        <td clas="tc" colspan="3">
                          <el-input
                            v-model="element['base_data'][0]['api_url']"
                            class="w100p"
                            type="text"
                            placeholder="示例：http://api.crap.cn/CustomerOrder/{id}"
                          ></el-input>
                        </td>
                      </tr>
                      <tr>
                        <td class="tc w100">请求方式 *</td>
                        <td class="tc">
                          <el-select
                            class="w100p"
                            v-model="element['base_data'][0]['method']"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in options2"
                              :key="item.value"
                              :label="item.label"
                              :value="item.label"
                            ></el-option>
                          </el-select>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="section" id="header">
                  <p>请求头  当前位置 : {{element['base_data'][0]['api_name']}}</p>
                  <div class="content">
                    <el-table :data="element['rq_header']" style="width:100%" fit>
                      <el-table-column prop="name" label="KEY" min-width="110%">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.key"
                            class="w100p"
                            type="text"
                            placeholder="KEY"
                            border="none"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="name" label="VALUE" min-width="110%">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.value"
                            class="w100p"
                            type="text"
                            placeholder="VALUE"
                            border="none"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="operation" label="操作" min-width="15%">
                        <template slot-scope="scope" class="clearfix">
                          <el-button
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            class="fl"
                            @click="delline(element['rq_header'],scope.$index)"
                          ></el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div
                      style="margin-top:5px;margin-right: 5px;text-align:right;"
                      @click="addMoreData(element['rq_header'])"
                    >+ 添加一行</div>
                  </div>
                </div>
                <div class="section" id="request">
                  <p>请求参数  当前位置 : {{element['base_data'][0]['api_name']}}</p>
                  <div class="content">
                    <el-table :data="element['rq_params']" style="width: 100%" fit>
                      <el-table-column prop="name" label="KEY" min-width="90%">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.key"
                            class="w100p"
                            type="text"
                            placeholder="KEY"
                            border="none"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="name" label="VALUE" min-width="90%">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.value"
                            class="w100p"
                            type="text"
                            placeholder="VALUE"
                            border="none"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="type" label="类型" min-width="50%">
                        <template slot-scope="scope">
                          <el-select class="w100p no-border" v-model="scope.row.check_type" placeholder>
                            <el-option
                              v-for="item in options7"
                              :key="item.value"
                              :label="item.label"
                              :value="item.label"
                            ></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column prop="operation" label="操作" min-width="15%">
                        <template slot-scope="scope" class="clearfix">
                          <el-button type="danger" icon="el-icon-delete" circle class="fl"
                          @click="delline(element['rq_params'],scope.$index)"
                          ></el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div 
                    style="margin-top:5px;margin-right: 5px;text-align:right;"
                    @click="addMoreData(element['rq_params'])"
                    >+ 添加一行</div>
                  </div>
                </div>
                <div class="section" id="response">
                  <p>断言  当前位置 : {{element['base_data'][0]['api_name']}}</p>
                  <div class="content">
                    <el-table :data="element['assert_data']" style="width: 100%" fit>
                      <el-table-column prop="name" label="实际参数" min-width="100%">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.actual_params"
                            class="w100p"
                            type="text"
                            placeholder
                            border="none"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <!-- <el-table-column prop="need" label="必填" width="100">
                          <template slot-scope="scope">
                            <el-select class="w100p no-border" v-model="value6" placeholder="">
                              <el-option
                                v-for="item in options6"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                      </el-table-column>-->
                      <el-table-column prop="type" label="比较符" min-width="30%">
                        <template slot-scope="scope">
                          <el-select class="w100p no-border" v-model="scope.row.compare" placeholder>
                            <el-option
                              v-for="item in options8"
                              :key="item.value"
                              :label="item.label"
                              :value="item.label"
                            ></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column prop="default" label="期望参数" min-width="100%">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.expect_params"
                            class="w100p"
                            type="text"
                            placeholder
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="type" label="类型" min-width="50%">
                        <template slot-scope="scope">
                          <el-select
                            class="w100p no-border"
                            v-model="scope.row.check_type"
                            placeholder
                          >
                            <el-option
                              v-for="item in options9"
                              :key="item.value"
                              :label="item.label"
                              :value="item.label"
                            ></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column prop="operation" label="操作" min-width="20%">
                        <template slot-scope="scope" class="clearfix">
                          <el-button 
                          @click="delline(element['assert_data'],scope.$index)"
                          type="danger" icon="el-icon-delete" circle class="fl"></el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div 
                    @click="addMoreAssertData(element['assert_data'])"
                    style="margin-top:5px;margin-right: 5px;text-align:right;">+ 添加一行</div>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item v-else :title="element['base_data'][0]['api_name']">{{element.desc}}</el-collapse-item>
        </el-collapse>
      </div>
    </draggable>
  </div>
</template>
<script>
import { getEnv } from "@/api/env";
import draggable from "vuedraggable";

export default {
  data() {
    return {
      list2: [],
      isFixed: false,
      activeNames: ["1"],
      id: null,
      // 基础信息
      isFixed: false,
      value: 1,
      options1: [],
      value2: 1,
      options2: [
        { label: "GET", value: 1 },
        { label: "POST", value: 2 },
        { label: "PUT", value: 3 },
        { label: "WS", value: 3 }
      ],
      value3: 1,
      options3: [
        { label: "已上线", value: 1 },
        { label: "开发中", value: 2 },
        { label: "测试中", value: 3 },
        { label: "废弃", value: 4 }
      ],
      value4: 1,
      options4: [
        { label: "application/json", value: 1 },
        { label: "text/html", value: 2 },
        { label: "x-application", value: 3 },
        { label: "application/xml", value: 4 }
      ],
      value5: 1,
      options5: [
        { label: "erro1", value: 1 },
        { label: "erro2", value: 2 },
        { label: "erro3", value: 3 },
        { label: "erro4", value: 4 }
      ],
      requestData: [
        { name: "", need: "", type: "", default: "", mark: "", operation: "" }
      ],
      options7: [
        { label: "NORMAL", value: 1 },
        { label: "URL_PARAM", value: 2 }
      ],
      options8: [
        { label: ">", value: 1 },
        { label: "<", value: 2 },
        { label: ">=", value: 3 },
        { label: "<=", value: 4 },
        { label: "==", value: 5 },
        { label: "?", value: 6 },
        { label: "!", value: 7 },
        { label: "⊆", value: 8 }
      ],
      options9: [
        { label: "SQL", value: 1 },
        { label: "WS_SERV", value: 2 },
        { label: "K_V", value: 3 }
      ]
    };
  },
  name: "DragKanbanDemo",
  components: {
    draggable
  },
  mounted() {
    this.getEnvs();
    window.addEventListener("scroll", this.handleScroll);
    this.id = this.$route.query.id;
  },
  props: {
    headerText: {
      type: String,
      default: "Header"
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    activeStatus: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  methods: {
    getEnvs(){
      getEnv().then(response =>{
        this.options1 = response.results;
      })
    },
    addMoreData(valueA) {
      console.log(this.list);
      valueA.push({
        key: "",
        value: ""
      });
    },
    addMoreAssertData(valueA) {
      valueA.push({
        expect_params: "",
        actual_params: "",
        check_type:"",
        compare:""
      });
    },
    delline(valueB,valueC) {
      {
        valueB.splice(valueC, 1);
        // if (valueB.length === 0) {
        //   valueB.push({ key: "", value: "" });
        // }
      }
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop >= 50;
    }
  }
};
</script>
<style lang="scss">
.interface {
  position: relative;
  background-color: #f2f3f7;
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .clearfix {
    &::after {
      display: table;
      content: "";
      clear: both;
    }
  }
  .main-nav {
    font-size: 12px;
    width: 100%;
    padding: 10px 20px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #ffffff;
    .btn {
      width: 68px;
      height: 30px;
      border-radius: 10px;
    }
    .btn-default {
      color: #333333;
      background-color: #ffffff;
      margin-right: 10px;
    }
    .btn-primary {
      color: #ffffff;
      background-color: #005eef;
    }
    ul {
      list-style: none;
      font-size: 14px;
      margin: 0;
      padding: 0;
      cursor: pointer;
      li {
        margin-left: 20px;
        color: #999999;
        line-height: 30px;
      }
    }
  }
  .isFix {
    position: fixed;
    top: 0;
    left: 180px;
    margin: 0;
    width: calc(100% - 180px);
    z-index: 1001;
  }
  .main-content {
    box-sizing: border-box;
    padding: 10px 20px;
    p {
      margin: 0;
      padding-left: 20px;
      line-height: 40px;
      background-color: #f2f3f7;
    }
    #basic {
      border-top: 3px solid #005eef;
    }
    #header {
      border-top: 3px solid #ff4530;
    }
    #request {
      border-top: 3px solid #5bc0de;
    }
    #response {
      border-top: 3px solid #f0ad4e;
    }
    #demo {
      border-top: 3px solid #5cb85c;
    }
    .section {
      background-color: #ffffff;
      box-shadow: 0 0 1px 1px #ddd;
      margin-bottom: 20px;
      .content {
        width: 100%;
        padding: 15px 20px;
        .table {
          color: #666;
          tr {
            .w100 {
              width: 100px;
            }
            .w120 {
              width: 120px;
            }
            .w100p {
              width: 100%;
            }
            .h150 {
              height: 150px;
            }
            .no-border {
              border: none !important;
            }
            td {
              padding: 10px;
              input {
                width: 100%;
                border-radius: 5px;
                border: 1px solid #ddd;
                padding: 5px 10px;
              }
              .text {
                border: 1px solid #dcdfe6;
                border-radius: 10px;
                width: 100%;
                padding: 10px;
              }
              .format {
                background-color: #fff;
                color: #333;
                border-radius: 5px;
                height: 30px;
                font-size: 12px;
                margin: 5px auto;
              }
            }
          }
        }
      }
    }
  }
}
.board-column {
  // min-width: 250px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .board-item {
      cursor: pointer;
      width: 100%;
      height: 64%;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>

