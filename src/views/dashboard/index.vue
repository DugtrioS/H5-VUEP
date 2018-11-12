<template>
  <div class="dashboard-container">
    <div class="dashboard-text">登陆者:{{ name }}</div>
    <div class="dashboard-text">TO DO AND DOING:</div>
    <!-- <span v-for="role in roles" :key="role">{{ role }}</span> -->
    <!-- <div>
      <el-switch
      v-model="value2"
      active-color="#13ce66"
      inactive-color="#ff4949">
      </el-switch>
    </div> -->
    <div>
      <ul>
        <li v-for='(list) in value3' v-bind:key='list'>{{list}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  data() {
    return {
      value1: true,
      value2: true,
      value3: [          
          '环境管理',
          '用户管理',
          '接口管理',
          '接口维护',
          '接口表关系维护',
          '业务管理',
          '功能点维护',
          '用例管理',
          '接口用例',
          '功能用例',
          'UI用例',
          '性能测试',
          'app稳定性',
          'app兼容性',
          '接口性能',
          '安全测试',
          '报告管理',
          '集群控制',
          '设备管理',
          '计划任务',
          '监控管理',
          '项目管理',
          'bug管理',
          '数据统计与分析']
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
