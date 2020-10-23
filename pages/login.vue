<template>
  <div class="login">
    <el-card >
      <h2><center>Login</center></h2>

      <br>
      <Notification :messageNotification="error" :sucess="false" v-if="error"/>
      <br>

      <el-form class="login-form" :model="formLogin" :rules="rules" ref="form" @submit.native.prevent="login">
        <el-row>
          <el-col :xs="22" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item prop="email">
              <el-input v-model="formLogin.email" placeholder="email" prefix-icon="el-icon-message"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="22" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item>
              <el-button class="login-button" type="primary" native-type="submit" :loading="wait" block>Login</el-button>
            </el-form-item>
          </el-col>
        </el-row>        
      </el-form>
    </el-card>
  </div>
</template>
    
<script>
  import Notification from '~/components/Notification'
    
  export default {
    components: {
      Notification,
    },
    middleware: "guests",
    data() {
      return {
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        formLogin: {
          email: '',
        },
        rules: {
          email: [{ required: true, message: "Email é obrigatório", trigger: "blur" },]
        },
        error: null,
        wait: false
      };
    },
    methods: {
      login() {
        this.wait = true;
        
        if (this.formLogin.email === '') {
          this.wait = false;
          this.error = "Não foi possível autenticar!";
        }else if(!this.reg.test(this.formLogin.email)){
          this.wait = false;
          this.error = "Email inválido"
        }else{            
          this.$store.commit('sessionAuth/login', this.formLogin.email)
          this.$router.push('/listing');                    
        } 
      } 
    },
  }
</script>

<style scoped>
  .login {
    margin-top: 50px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }  
  .login-button {
    width: 100%;
    margin-top: 40px;
  }
  
  .login-form {
    width: 290px;
  }
  
</style>