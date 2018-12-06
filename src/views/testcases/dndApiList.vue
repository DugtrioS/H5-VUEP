<template>
    <div>
        <div class="form-container">
           <el-form :inline="true" ref="form" :model="form" label-width="100px" style="margin:10px">
                <el-form-item label="场景名称:">
                    <el-input style="width:300px" v-model="form.name"/>
                </el-form-item>
                <el-form-item label="执行环境:">
                    <el-input style="width:300px" v-model="form.name"/>
                </el-form-item>
                <el-form-item label="场景类型:">
                    <el-input style="width:300px" v-model="form.name"/>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input type="textarea" style="width:500px;" v-model="form.describe"/>
                </el-form-item>
           </el-form>
        </div>
        <div class="components-container board">
            <div style="display:inline-block;width:20%">
                <Kanban  :key="1" :list="list1" :options="options" :activeStatus='false' class="kanban todo" header-text="接口用例列表" style="width:100%"/>
            </div>
            <div style="display:inline-block;width:80%">
                <Kanban :key="2" :list="list2" :options="options" class="kanban working" header-text="接口场景"  style="width:100%" />
            </div>
        </div>
    </div>
</template>
<script>
import Kanban from "@/components/Kanban";
import { getApiList1 } from "@/api/action";

export default {
  name: "DragKanbanDemo",
  components: {
    Kanban
  },
  data() {
    return {
      form: {
        name: null,
        describe: null
      },
      options: {
        group: "mission"
      },
      list1: [],
      list2: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
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

