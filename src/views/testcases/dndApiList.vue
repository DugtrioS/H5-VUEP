<template>
    <div>
        <div class="form-container">
           <el-form ref="form" :model="form" label-width="120px" style="margin:10px">
                <el-form-item label="Activity name:">
                    <el-input style="width:300px" v-model="form.name"/>
                </el-form-item>
                <el-form-item label="Describe :">
                    <el-input type="textarea" style="width:300px;" v-model="form.describe"/>
                </el-form-item>
           </el-form>
        </div>
        <div class="components-container board">
            <div style="display:inline-block">
                <Kanban :key="1" :list="list1" :options="options" class="kanban todo" header-text="接口用例列表" style="width:300px"/>
            </div>
            <div style="display:inline-block">
                <Kanban :key="2" :list="list2" :options="options" class="kanban working" header-text="接口场景"  style="width:1200px"/>
            </div>
        </div>
    </div>
</template>
<script>
import Kanban from "@/components/Kanban";

export default {
  name: "DragKanbanDemo",
  components: {
    Kanban
  },
  data() {
    return {
      form: {
        name: null,
        describe:null
      },
      options: {
        group: "mission"
      },
      list1: [
        { name: "Mission", id: 1 },
        { name: "Mission", id: 2 },
        { name: "Mission", id: 3 },
        { name: "Mission", id: 4 }
      ],
      list2: [
        { name: "Mission", id: 5 },
        { name: "Mission", id: 6 },
        { name: "Mission", id: 7 }
      ]
    };
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

