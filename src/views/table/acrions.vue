<template>
    <el-container style="background:black" >
        <el-transfer
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入城市拼音"
            v-model="value2"
            :data="data2"
            style="height:700px">
        </el-transfer>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "123"
      }
    };
  },
  methods() {}
};
</script>

<style scoped>

</style>


