<template>
  <div class="body_contain" style="margin:5px">
    <div class="header_contain">
      <div class="action_name_contain">
        <div style="height:50%;text-align:center;line-height:140px">
          <strong>
            <span style="font-size:45px">测 试 报 告</span>
          </strong>
        </div>
        <div style="height:50%;text-align:center;line-height:140px">
          <strong>
            <span style="font-size:40px">test-01-12</span>
          </strong>
        </div>
      </div>
      <div class="action_sub_detail_contain">
        <div style="margin:2px">
          <table style="width:100%;height:277px">
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
            </tr>
            <tr>
              <td>Jill</td>
              <td>Smith</td>
              <td>50</td>
            </tr>
            <tr>
              <td>Eve</td>
              <td>Jackson</td>
              <td>94</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="detail_contain">
      <div class="detail_name_contain"></div>
      <div class="detail_sub_detail_contain"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        time: null
      }
    };
  }
};
</script>

<style scoped>
.body_contain {
  background-color: rgb(166, 221, 221);
}
.header_contain {
  height: 280px;
  width: 100%;
  background-color: rgb(221, 166, 187);
}
.action_name_contain {
  float: left;
  height: 100%;
  width: 20%;
  background-color: rgb(136, 138, 236);
}
.action_sub_detail_contain {
  float: right;
  height: 100%;
  width: 80%;
  background-color: rgb(136, 236, 174);
}
.detail_contain {
  margin-top: 5px;
  height: 400px;
  width: 100%;
  background-color: rgb(236, 136, 136);
}
.detail_name_contain {
  float: left;
  width: 20%;
  height: 100%;
  background-color: rgb(201, 243, 12);
}
.detail_sub_detail_contain {
  float: right;
  width: 80%;
  height: 100%;
  background-color: rgb(47, 12, 243);
}
table, th, td {
  border: 1px solid black;
}
</style>
