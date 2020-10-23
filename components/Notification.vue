<template>
    <el-alert
      title="Operação realizada com sucesso!" type="success" :description="this.message" show-icon v-if='sucess'>
    </el-alert>
  </template>
  <template v-else>
    <el-alert title="Erro" type="error" :description = "this.message" show-icon>
    </el-alert>
  </template>
  
  <script>
  export default {
    name: 'Notification',
    props: ["messageNotification",'success'],
    data() {
      return{
        message: this.$props.messageNotification
      }
    }
  }
  </script>