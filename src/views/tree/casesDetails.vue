<template>
  <el-container>
   <section class="content cases-details-box"> 
      <div class="BackButton"  @click="back">
        <svg-icon iconClass="backButton">  </svg-icon> 
      </div>
      <div class="case-id"> 37 </div>
      <h2 class="case-title">
        下单未支付的订单可在【未支付】Tab 页查询到
      </h2>
      <el-breadcrumb separator="/"> 
        <el-breadcrumb-item :to="{ path: '/' }">  <svg-icon iconClass="folder">  </svg-icon> 个人中心</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      </el-breadcrumb>
      <h3>前置条件</h3>
      <p>适用广泛的基础用法。</p>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">       
          <el-form-item label="步骤描述
          ">
          <el-popover
             ref="popover"
              placement="bottom"
              :title= false
              width="200"
              trigger="click"
              v-model="isShowPopover"
          >
            <el-button slot="reference" >更改类型</el-button>
            <div class="cases-flex-box" @click="showTextDescription">
              <div class="flex-box">
                <div class="hd"> 文本描述</div>
                <span class="is-right"> <svg-icon iconClass="savcases"> </svg-icon></span>
              </div>
              <p>适用于简单的测试场景，没有明确
                测试步骤。
              </p>
            </div>
            <div class="cases-flex-box" @click="showTableDescription">
                <div class="flex-box">
                  <div class="hd"> 步骤描述</div>
                  <span class="is-right"> <svg-icon iconClass="step"> </svg-icon></span>
                </div>
                <p>适用于需要每一个步骤进行测试的场景，有明确的测试步骤、预期结果。
                </p>
              </div>
            </el-popover>
          </el-form-item> 
          <el-input
            v-if="isShowInput"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea3">
          </el-input>  
          <el-table
          v-if="isShowTable"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            width="20"
            type="index"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            label="步骤"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px"><el-input v-model="input1" placeholder="请输入内容"></el-input></span>
            </template>
          </el-table-column>
          <el-table-column
            label="预期"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px"><el-input v-model="input2" placeholder="请输入内容"></el-input></span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>    
        </el-form>
      
   </section>
  </el-container>
  </template> 
  <script> 
  export default {
    data() {     
      return {
        isShowInput: false,
        isShowTable:false,
        isShowPopover: false,
        input1: '',
        input2: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      };
    },
  
    methods: {
      back () {
        this.$router.back()
      },
      showTextDescription () {
        this.isShowInput = true
        this.isShowPopover = false
      },
      showTableDescription() {
        this.isShowTable = false
        this.isShowPopover = false
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      indexMethod(index) {
        return index * 2;
      }
    }
  };
  </script>

  
  
  