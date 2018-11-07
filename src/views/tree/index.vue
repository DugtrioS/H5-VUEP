<template>
  <span>
    <div class="app-container case-manager-container">
      <el-container style="height: 100%;">
        <el-aside width="360px" >
          <el-input
            class="search-input"
             placeholder="搜索模块"
            v-model="filterText">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div class="tree-hd">
            <span class="tree-hd-left">  
                <svg-icon iconClass="folder">  </svg-icon> 
                <span class="sectionName ">全部用例</span>
            </span>
            <div class="tree-hd-r">
              <el-tooltip class="item" effect="dark" content="收起全部模块" placement="top">
                <el-button @click="isExpanded(false)">
                    <svg-icon iconClass="takeup">  </svg-icon> 
                </el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="展开全部模块" placement="top">
                <el-button @click="isExpanded(true)"> <svg-icon iconClass="takeup">  </svg-icon> </el-button>
              </el-tooltip>
            </div>
            <div class="tree-hd-r tree-hd-r-border">
              <el-tooltip class="item" effect="dark" content="增加模块" placement="top">
                <div @click="appendTree" class="add-tree-item">
                    <svg-icon iconClass="addTree" className="addTree">  </svg-icon> 
                </div>
                </el-tooltip>
              </div>
          </div>
          <div class="custom-tree-container">
            <div class="block">               
              <el-tree
                :data="data6"
                node-key="id"
                ref="tree"
                default-expand-all
                @node-drag-start="handleDragStart"
                @node-drag-enter="handleDragEnter"
                @node-drag-leave="handleDragLeave"
                @node-drag-over="handleDragOver"
                @node-drag-end="handleDragEnd"
                @node-drop="handleDrop"
                draggable
                :filter-node-method="filterNode"
                :allow-drop="allowDrop"
                :allow-drag="allowDrag"
                :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>
                    <img src="src/icons/img/folder.png" alt="" class="folder-icon">
                    <el-input 
                      ref="saveTagInput"
                      v-model="inputVModel" 
                      placeholder="请输入内容" 
                      v-show="editId === data.id"   
                      @keyup.enter.native="editInputChange(node, data)">
                    </el-input>
                    <span v-show="editId !== data.id">{{ node.label }}</span>
                  </span>                   
                  <span class="hover-state">
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => append(data)">
                      <i class="el-icon-circle-plus"></i>
                    </el-button>
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => edit(data)">
                      <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button
                      type="text"
                      size="mini"
                      @click="removeTree(node, data)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </span>
                </span>
              </el-tree>
            </div>        
          </div>
        </el-aside>       
        <el-container>
          <tree-right> </tree-right>
        </el-container>
      </el-container>
    </div>
  </span>
</template>
<script>
  import treeRight from './treeRight.vue'
  let id = 1000
  export default {
    data() {     
      return {
        data6: [
          {
            id: 1,
            label: "一级 1",
            children: [
              {
                id: 4,
                label: "二级 1-1",
                children: [
                  {
                    id: 9,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 10,
                    label: "三级 1-1-2"
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: "一级 2",
            children: [
              {
                id: 5,
                label: "二级 2-1"
              },
              {
                id: 6,
                label: "二级 2-2"
              }
            ]
          },
          {
            id: 3,
            label: "一级 3",
            children: [
              {
                id: 7,
                label: "二级 3-1"
              },
              {
                id: 8,
                label: "二级 3-2",
                children: [
                  {
                    id: 11,
                    label: "三级 3-2-1"
                  },
                  {
                    id: 12,
                    label: "三级 3-2-2"
                  },
                  {
                    id: 13,
                    label: "三级 3-2-3"
                  }
                ]
              }
            ]
          }
        ],
        defaultProps: {
          children: "children",
          label: "label"
        },
        editId: null,
        removeId: null,
        inputVModel: '',
        visible2: false,
        filterText: ''
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
        console.log("filterText", val)
      }
    },
    components: {
      treeRight
    },
    methods: {
      handleDragStart(node, ev) {
        console.log("drag start", node)
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log("tree drag enter: ", dropNode.label)
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log("tree drag leave: ", dropNode.label)
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log("tree drag over: ", dropNode.label)
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log("tree drag end: ", dropNode && dropNode.label, dropType)
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log("tree drop: ", dropNode.label, dropType)
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === "二级 3-1") {
          return type !== "inner"
        } else {
          return true
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf("三级 3-2-2") === -1
      },
      append(data) { 
        this.editId = data.id
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
        const newChild = { id: id++, label: 'testtest', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
        console.log(data, 'append')
      },
      edit(data) {
        this.editId = data.id
        this.inputVModel = data.label   
        console.log(data, 'edit')
      },
      removeTree (node, data) {       
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.id === data.id)
          children.splice(index, 1)
          console.log(this.data6)
          console.log(data, 'removeTree')
          this.$nextTick(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            }) 
          })              
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })          
        })
      },
      // 收起展开全部模块
      isExpanded (isOpen) {
        this.recursiveTreeNode(this.$refs.tree.$children, isOpen)
        console.log(this.$refs.tree, isOpen)
      },
      recursiveTreeNode (children, isOpen) {
        children.forEach((child) => {
          if (child.node && child.node.expanded !== isOpen) {
            child.node.expanded = isOpen
          }
          if (child.$children.length) this.recursiveTreeNode(child.$children, isOpen)
        })
      },
      // 编辑
      editInputChange(node, data) {
        data.label = this.inputVModel
        this.editId = null
        console.log(node, data)
      },
      // 过滤查找
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      // 添加模块
      appendTree() { 
        this.$prompt('请输入请输入模块名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          const newChild = { id: id++, label: value, children: [] }
          this.data6.push(newChild)
          console.log(this.data6)
          this.$message({
            type: 'success',
            message: '你的模块名称是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })       
        })       
      },
    }
  }
</script>
