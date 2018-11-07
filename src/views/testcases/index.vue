<template>
    <div>
      <el-input v-model="input" placeholder="请输入" style="width:100px"></el-input>
      <el-button type="primary" @click="tryZero">搜索用例</el-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  },
  methods: {
    tryZero(){
      if(this.input === "123"){
        this.input="111";
      }else{
        this.input="123";
      }
    }
  }
}
</script>
<style scoped>

</style>
