<template>
  <div>
    <div class="form-container" style="width:100%">
      <div>
        <el-form :inline="true" ref="form" :model="form" label-width="100px" style="margin:10px;">
          <el-form-item label="场景名称:">
            <el-input style="width:300px;font-size:20px;font-weight:bold" v-model="form.name"/>
          </el-form-item>
          <el-form-item label="场景类型:">
            <el-select v-model="form.action_type" placeholder="请选择场景类型">
              <el-option
                v-for="item in action_type_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="执行环境:">
                    <el-input style="width:300px" v-model="form.name"/>
                </el-form-item>
                <el-form-item label="场景类型:">
                    <el-input style="width:300px" v-model="form.name"/>
          </el-form-item>-->
          <el-form-item label="描述:">
            <el-input type="textarea" style="width:500px;" v-model="form.describe"/>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:center">
        <el-button
          v-if="this.urlid!=0"
          type="primary"
          style="font-weight:bold;width:98%;"
          @click="saveActionFuc()"
        >保 存 场 景</el-button>
        <el-button
          v-if="this.urlid==0"
          type="primary"
          style="font-weight:bold;width:98%;"
          @click="newActionFuc()"
        >新 增 场 景</el-button>
        <div style="margin-top:5px">
          <el-input style="width:90%;" v-model="serch_page"/>
          <el-button style="width:8%;" @click="serch_()">搜 索 用 例</el-button>
        </div>
      </div>
    </div>
    <div class="components-container board">
      <div style="display:inline-block;width:20%">
        <Kanban
          :key="1"
          :list="list1"
          :options="options"
          :activeStatus="false"
          class="kanban todo"
          header-text="接口用例列表"
          style="width:100%"
        />
      </div>
      <div style="display:inline-block;width:80%">
        <Kanban
          :key="2"
          :list="list2"
          :options="options"
          class="kanban working"
          header-text="接口场景"
          style="width:100%"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Kanban from "@/components/Kanban";
import {
  getApiList1,
  getActionById,
  saveAction,
  getApiListByKey,
  newAction
} from "@/api/action";

export default {
  name: "DragKanbanDemo",
  components: {
    Kanban
  },
  data() {
    return {
      serch_page: "",
      action_type_options: [
        { label: "普通", value: 1 },
        { label: "可被继承", value: 2 }
      ],
      urlid: this.$route.query.id ? this.$route.query.id : 0,
      form: {
        name: null,
        describe: null,
        importance: 5,
        action_sub: this.list2,
        action_type: null
      },
      options: {
        group: "mission"
      },
      list1: [],
      list2: []
    };
  },
  created() {
    this.fetchData();
    this.fetchDatalist2();
  },
  methods: {
    compareArr(arra, arrb) {
      for (var i = 0; i < arra.length; i++) {
        for (var j = 0; j < arrb.length; j++) {
          if (arra[i]["id"] === arrb[j]["id"]) {
            arra.splice(i, 1);
          }
        }
      }
      return arra;
    },
    serch_() {
      getApiListByKey(this.serch_page).then(response => {
        if (response.code === 200) {
          this.list1 = this.compareArr(response.results, this.list2);
        }
      });
    },
    saveActionFuc() {
      saveAction(this.urlid, this.form).then(response => {
        if (response.code === 200) {
          // alert("===============");
          this.$notify({
            title: "成功",
            message: "保存成功 >0<",
            type: "success"
          });
          console.log(this.form);
        } else {
          this.$notify({
            title: "错误",
            message: "出现了未知的问题！！！"
          });
        }
      });
    },
    newActionFuc() {
      newAction(this.form).then(response => {
        if (response.code === 200) {
          // alert("===============");
          this.$notify({
            title: "成功",
            message: "保存成功 >0<",
            type: "success"
          });
          console.log(this.form);
        } else {
          this.$notify({
            title: "错误",
            message: "出现了未知的问题！！！"
          });
        }
      });
    },
    onEnd() {
      alert("1234567890");
    },
    trya() {
      let a = "['a','v','c',23]";
      console.log(a.slice(1, -1).split(","));
    },
    fetchData() {
      getApiList1().then(response => {
        this.list1 = response.results;
      });
    },
    fetchDatalist2() {
      let id = this.urlid;
      console.log(id);
      if (this.urlid != 0) {
        getActionById(id).then(response => {
          this.list2 = response.results[0]["action_sub"];
          // this.form.describe = response.results[0]['describe'];
          this.form = response.results[0];
          console.log(this.form);
        });
      }
    }
  }
};
</script>
<style lang="scss">
.board {
  width: 100%;
  margin-top: 10px;
  display: inline-flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
  background-color: #ececec;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4a9ff9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
}
</style>

