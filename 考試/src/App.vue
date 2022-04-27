<template>
  <div id="app">
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input type="number" v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleConfirm()">確認</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableRow" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="age" label="年齡"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {apiCreate,apiRead,apiDelete,apiEdit} from "./api"

export default {
  name: "App",
  data() {
    return {
      res: null,
      ruleForm: { id: null, name: "", age: null },
      tableRow:"",
      isExisted:false
    };
  },
  mounted(){
    this.fetchData()
  },
  methods: {
    async handleConfirm(){
      const {id,name,age} = this.ruleForm
      if(!this.isExisted){
        await apiCreate(name,age)
      }else{
        await apiEdit(id,name,age)
      }
      await this.fetchData()
      this.isExisted = false
    },
    async fetchData(){
      const res = await apiRead()
      console.log(res);
      const {data:{result},status} = res
      if(status !==200)return
      this.tableRow = result
    },
    async handleDelete(index,row){
      console.log(index,row);
      const {id} = row
      await apiDelete(id)
      this.fetchData()
      this.handleCancel()
    },
    async handleEdit(index,row){
      const {id,name,age} = row
      this.ruleForm.id = id
      this.ruleForm.name = name
      this.ruleForm.age = age
      this.isExisted = true
    },
    handleCancel(){
      this.ruleForm={id: null, name: "", age: null}
      this.isExisted = true
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>