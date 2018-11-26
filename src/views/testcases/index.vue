<template>
    <div>
      <!-- <el-input v-model="input" placeholder="请输入" style="width:100px"></el-input>
      <el-button type="primary" @click="tryZero">搜索用例</el-button> -->
      <div class="updateApk">
          <el-input v-model="updateapk.number" placeholder="请输入版本号" style="width:250px"></el-input>
          <el-select v-model="updateapk.name" placeholder="APK产品">
            <el-option v-for="item in apkline" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            <!-- <el-option label="海风智学中心" value="com.hfjy.LearningCenter"></el-option>
            <el-option label="海风家委会" value="com.hfjy.learningparentphone"></el-option> -->
          </el-select>
          <el-button type="primary" style="position:fixed; margin:0 auto; left:50%" @click="updateAPK()">更新APK</el-button>
      </div>
    </div>
    
</template>

<script>
import { downLoad } from "@/api/download";
export default {
  data() {
    return {
      updateapk: {
        name: "",
        number: ""
      },
      apkline: [
        {
          value: "com.hfjy.LearningCente",
          label: "海风智学中心"
        },
        {
          value: '海风家委会',
          label: "海风家委会"
        }
      ]
    };
  },
  methods: {
    updateAPK() {
      downLoad(this.updateapk).then(response => {
        alert(response)
      });
    }
  }
};
</script>
<style scoped>
.updateApk {
  width: 800px;
  height: 800px;
}
</style>
