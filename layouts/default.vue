<template>
  <el-container class='container'>
    <el-header><HeaderApp /></el-header>
    <el-main><nuxt/></el-main>
    <el-footer><FooterApp /></el-footer>
  </el-container>
</template>
<script>
  import HeaderApp from '~/components/HeaderApp';
  import FooterApp from '~/components/FooterApp';
  
  export default{
    components:{
      HeaderApp,
      FooterApp
    },  
    data(){
      return{
      }
    }    
  }
</script>
<style> 
  .el-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    background-color: white;
  }
  .el-header{
    width: 100%;
    height: 100%;
    background-color: white;
    font-family: sans-serif;
  }
  html, body, .container{
    width: 100%;
    min-height: 100%;
    background-color: #F2F6FC;
    font-family: sans-serif;
    overflow-x: hidden;    
    overflow-y: visible;
  }
</style>

