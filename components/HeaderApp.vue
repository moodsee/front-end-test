<template >   
  <div v-show="sessionAuth || email">   
    <el-menu :default-active="$route.path" mode="horizontal" active-text-color="#78AEFF" router>
      <el-menu-item index="/listing">Listar </el-menu-item>
      <el-menu-item index="/minha-conta">Cadastrar</el-menu-item>
      <el-menu-item style="float:right;">
        <el-popover placement="top" width="160">
          <span style="font-family: sans-serif;font-size: 9pt;">Olá {{email}}, não é você?<br>
          <el-button type="text" @click="logout" style="float:right;">Sair</el-button></span>
          <el-button slot="reference" @click="updateName"><i class="el-icon-user-solid"></i></el-button>
        </el-popover>            
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  
  export default {
    name: "HeaderApp",
    computed: {
      sessionAuth() {
        return this.$store.state.sessionAuth.logged;
      }
    },
    data() {
      return {
        menuHorizontal: '1',
        email: ''
      };
    },
    mounted(){
      if(!this.sessionAuth){
        try{        
          this.email = this.$cookies.get("email")
        }catch{
        }
      }else{    
        this.email = this.userLogged 
      }
    },
    methods: {
      logout() {        
        this.$store.commit('sessionAuth/logout')      
        if(!this.$cookies.get("email")){
          this.email = ''
          this.$router.push('/login')
        }
          
      },
      updateName () {
        this.email = this.$cookies.get("email")
        if(this.email == '')
          this.sessionAuth = false;
      }

    }
  }
</script>
<style>

</style>