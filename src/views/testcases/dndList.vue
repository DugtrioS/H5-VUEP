<template>
  <div class="components-container">
    <div>
      <code class="code-style">
        <a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">{{casesName}}</a>
      </code>
    </div>
    <div class="input-button-value">
      <el-row>
        名称:<el-input v-model="inputname" placeholder="场景名称" style="width:300px"></el-input>
        描述:<el-input v-model="inputdescrib" placeholder="场景描述" style="width:300px"></el-input>
        <el-button type="primary" @click="saveAction()">保存场景</el-button>
        <el-button  @click="$router.go(-1)">返回</el-button>
      </el-row>
    </div>
    <div class="editor-container">
      <dnd-list :list1="list1" :list2="list2" list1-title="UI用例列" list2-title="场景"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DndList from "@/components/DndList";
import { getUiTestCase, updateUiTestCasesSet } from "@/api/table";

export default {
  name: "DndListDemo",
  components: { DndList },
  data() {
    return {
      casesName:this.$route.query.name?this.$route.query.name:null,
      inputname:this.$route.query.name?this.$route.query.name:null,
      inputdescrib:this.$route.query.describe?this.$route.query.describe:null,
      uuidset:'all',
      list1: [],
      list2: []
    };
  },
  created() {
    this.getData();

  },
  methods: {
    getData() {
      this.listLoading = true;
      getUiTestCase(this.uuidset).then(response => {
        this.list1 = response.data.splice(0, response.data.length);//.splice(0, 5)
        this.list2 = response.data;
        //console.log(response.data)
      });
    },
    saveAction(){
      var jsondata = {};
      var pureidlist = [];
      for (const item of this.list2){
        pureidlist.push(item.id)
      }
      jsondata['name'] = this.inputname;
      jsondata['testCasesId'] = pureidlist;
      jsondata['owner'] = this.$store.getters.name;
      jsondata['id'] = this.$route.query.id?this.$route.query.id:'';
      jsondata['describe'] = this.inputdescrib;
      jsondata['showToAll'] = 1;
      updateUiTestCasesSet(jsondata).then(
        response => {
          if (response.data.message === "更新成功"){
            this.$message({
            message: "更新成功",
            type: "success"
          });
          this.$router.push({ path: "/cases/newuicases/"});
          }
        }
      )
    }
  }
};
</script>


<style scoped>
.input-button-value {
  margin-bottom: 20px;
}
div {
  margin: 5px;
}
.code-style{
  margin-left: 10px;
}
</style>


