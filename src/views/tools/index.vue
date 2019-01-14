<template>
  <div class="FormAll">
    <div class="Dingding">
      <img src="https://gw.alicdn.com/tfs/TB1ayl9mpYqK1RjSZLeXXbXppXa-170-62.png" align="middle">
      <div style="margin:20px">
        <el-input placeholder="请输入token" v-model="token_value">
          <template slot="prepend">TOKEN</template>
        </el-input>
      </div>
      <div style="margin:40px 20px 0px 20px">
        <div class="components-container">
          <div class="editor-container">
            <json-editor ref="jsonEditor" v-model="json_value"/>
          </div>
        </div>
      </div>
      <div style="text-align: center">
        <template>
          <a
            href="https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.769c4a97X5TlsZ&treeId=257&articleId=105735&docType=1"
            target="_blank"
          >点击查看钉钉机器人文档</a>
        </template>
      </div>
      <div style="margin:40px 20px 0px 20px;float:right">
        <el-button @click="pushDingMsg" style="width:300px">发 送</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { pushDingMsg } from "@/api/tools";
import JsonEditor from "@/components/JsonEditor";
export default {
  components: { JsonEditor },
  data() {
    return {
      json_value: null,
      token_value: ""
    };
  },
  methods: {
    pushDingMsg() {
      var push_data = {};
      try {
        var main_value = JSON.parse(this.json_value);
      } catch (error) {
        this.$notify.error({
          title: "错误",
          message: "发送失败，请联系卫星"
        });
      }
      push_data["url"] =
        "https://oapi.dingtalk.com/robot/send?access_token=" +
        String(this.token_value);
      push_data["data"] = main_value;
      pushDingMsg(push_data).then(response => {
        if (response.results[0]["errcode"] === 0) {
          this.$notify({
            title: "成功",
            message: "发送成功",
            type: "success"
          });
        } else {
          this.$notify.error({
            title: "错误",
            message: "发送失败，请联系卫星"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.editor-container {
  position: relative;
  height: 100%;
}
.FormAll {
  margin: 5px;
  background: #e5e9f277;
  width: auto;
  overflow: auto;
  min-height: 600px;
}
.Dingding {
  margin: 5px;
  width: auto;
  height: 100%;
  background: #e5e9f29c;
}
</style>
