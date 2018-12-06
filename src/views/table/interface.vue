<template>
  <div class="interface">
    <div class="main-nav clearfix" :class="{ 'isFix': isFixed}">
      <el-button type="primary" @click="goBack">返 回</el-button>
      <el-button type="primary" @click="goSave">保 存</el-button>
      <ul class="fr">
        <li class="fl"><a href="#basic">#基础信息</a></li>
        <li class="fl"><a href="#header">#请求头</a></li>
        <li class="fl"><a href="#request">#请求参数</a></li>
        <li class="fl"><a href="#response">#断言</a></li>
      </ul>
    </div>
    <div class="main-content">
      <div class="section" id="basic">
        <p>基础信息（带 * 的为必填项）</p>
        <div class="content">
          <table class="table" border="1" cellspacing="0" cellpadding="0" bordercolor="#ddd" width="100%">
            <tr>
              <td class="tc w100">接口名称 *</td>
              <td class="tc">
                <el-input class="w100p" type="text" required="" maxlength="50" placeholder="示例：获取订单列表接口"></el-input>
              </td>
              <td class="tc w100">模块名 *</td>
              <td class="tc">
                <el-select class="w100p" v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
                <td class="tc">URL *</td>
                <td clas="tc" colspan="3">
                  <el-input class="w100p" type="text" placeholder="示例：http://api.crap.cn/CustomerOrder/{id}"></el-input>
                </td>
            </tr>
            <tr>
              <td class="tc w100">请求方式 *</td>
              <td class="tc">
                <el-select class="w100p" v-model="value2" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="tc w100">返回类型 *</td>
              <td class="tc">
                <el-select class="w100p" v-model="value4" placeholder="请选择">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
                <td class="tc">接口说明</td>
                <td clas="tc h150" colspan="3">
                  <textarea name="" id="" cols="30" rows="10" class="text"></textarea>
                </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="section" id="header">
        <p>请求头</p>
        <div class="content">
          <el-table :data="headerData" style="width: 100%" fit>
            <el-table-column prop="name" label="KEY" width="500">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" class="w100p" type="text" placeholder="KEY" border="none"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="VALUE" width="500">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" class="w100p" type="text" placeholder="VALUE" border="none"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="120">
              <template slot-scope="scope" class="clearfix">
                <button class="fl" style="margin-right:5px">删除</button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top:5px;margin-right: 5px;text-align:right;" @click="addMoreData()"> + 添加一行</div>
        </div>
      </div>
      <div class="section" id="request">
        <p>请求参数</p>
        <div class="content">
          <el-table :data="requestData" style="width: 100%" fit>
            <el-table-column prop="name" label="KEY" width="450">
              <template slot-scope="scope">
                <el-input class="w100p" type="text" placeholder="KEY" border="none"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="VALUE" width="450">
              <template slot-scope="scope">
                <el-input class="w100p" type="text" placeholder="VALUE" border="none"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="need" label="必填" width="100">
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
            </el-table-column>
            <el-table-column prop="type" label="类型">
              <template slot-scope="scope">
                <el-select class="w100p no-border" v-model="value7" placeholder="">
                  <el-option
                    v-for="item in options7"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="mark" label="备注">
              <template slot-scope="scope">
                <el-input class="w100p" type="text" placeholder="备注"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="120">
              <template slot-scope="scope" class="clearfix">
                <button class="fl" style="margin-right:5px" >删除</button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top:5px;margin-right: 5px;text-align:right;"> + 添加一行</div>
        </div>
      </div>
      <div class="section" id="response">
        <p>断言</p>
        <div class="content">
          <el-table :data="headerData" style="width: 100%" fit>
            <el-table-column prop="name" label="实际参数" width="450">
              <template slot-scope="scope">
                <el-input class="w100p" type="text" placeholder="" border="none"></el-input>
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
            </el-table-column> -->
            <el-table-column prop="type" label="比较符">
              <template slot-scope="scope">
                <el-select class="w100p no-border" v-model="value7" placeholder="">
                  <el-option
                    v-for="item in options8"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="default" label="期望参数" width="450">
              <template slot-scope="scope">
                <el-input class="w100p" type="text" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型">
              <template slot-scope="scope">
                <el-select class="w100p no-border" v-model="value7" placeholder="">
                  <el-option
                    v-for="item in options9"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="120">
              <template slot-scope="scope" class="clearfix">
                <button class="fl" style="margin-right:5px">删除</button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top:5px;margin-right: 5px;text-align:right;"> + 添加一行</div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      // 基础信息
      isFixed: false,
      value: 1,
      options: [
        { label: "模块1", value: 1 },
        { label: "模块2", value: 2 },
        { label: "模块3", value: 3 }
      ],
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
      // 请求头
      headerData: [
        { name: "", need: "", type: "", default: "", mark: "", operation: "" }
      ],
      requestData: [
        { name: "", need: "", type: "", default: "", mark: "", operation: "" }
      ],
      value6: 1,
      options6: [{ label: "是", value: 1 }, { label: "否", value: 2 }],
      value7: 1,
      options7: [
        { label: "string", value: 1 },
        { label: "int", value: 2 },
        { label: "float", value: 3 },
        { label: "long", value: 4 },
        { label: "byte", value: 5 },
        { label: "double", value: 6 },
        { label: "number", value: 7 },
        { label: "boolean", value: 8 },
        { label: "object", value: 9 },
        { label: "array", value: 10 },
        { label: "array[string]", value: 11 },
        { label: "array[int]", value: 12 },
        { label: "array[float]", value: 13 },
        { label: "array[long]", value: 14 },
        { label: "array[byte]", value: 15 },
        { label: "array[double]", value: 16 },
        { label: "array[number]", value: 17 },
        { label: "array[boolean]", value: 18 },
        { label: "array[object]", value: 19 },
        { label: "file", value: 20 }
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
      options9:[
        { label: "SQL", value: 1 },
        { label: "WS_SERV", value: 2 },
        { label: "K_V", value: 3 }
      ]
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.id = this.$route.query.id;
  },
  methods: {
    addMoreData() {
      console.log(this.headerData);
      this.headerData.push({
        name: "",
        need: "",
        type: "",
        default: "",
        mark: "",
        operation: ""
      });
    },
    setClass() {
      return "isFix";
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

<style lang="scss" scoped>
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
</style>
