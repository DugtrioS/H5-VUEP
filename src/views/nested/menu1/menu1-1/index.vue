<template >
  <div style="width:1200px;background-color:black">
    <el-progress text-inside="weixing" :stroke-width="25" :percentage="100" status="success"></el-progress>
  </div>
</template>


<script>
export default {
  data(){
    return{
      testinside:"123456789"
    }
  }
}
</script>
