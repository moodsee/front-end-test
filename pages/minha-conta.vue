<template>
  <div class="centerCard">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Cadastrar Endereços</span>
      </div>
      <div class="text item">
        <el-form :model="formRegister" :rules="rules" ref="formRegister" label-width="150px">
          <el-row>
            <el-col :xs="24" :sm="15" :md="15" :lg="15" :xl="15">
              <el-form-item label="CEP" prop="postal_code">
                <el-input v-model="formRegister.postal_code" @keyup.native="searchPostalCode()"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="15" :md="15" :lg="15" :xl="15">
              <el-form-item label="Nome da Rua" prop="street_name">
                <el-input v-model="formRegister.street_name" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="Número" prop="street_number">
                <el-input v-model="formRegister.street_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="15" :md="15" :lg="15" :xl="15">
              <el-form-item label="Bairro" prop="neighborhood_name">
                <el-input v-model="formRegister.neighborhood_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="15" :md="15" :lg="15" :xl="15">
              <el-form-item label="Cidade" prop="city_name">
                <el-input v-model="formRegister.city_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="15">
              <el-form-item label="Estado" prop="state_initials">
                <el-input v-model="formRegister.state_initials"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item style="float:right;">
                <el-button type="primary" :loading="wait" :disabled="disableBottom" @click="submitForm('formRegister')">Cadastrar</el-button>
              </el-form-item>                        
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
  
<script>
  import { Message } from 'element-ui';
  import cache from "../store/storageCache";

  export default {
    middleware: "auth",
    data() {
      return {
        valuesStorage: [],
        cepCache: [],
        wait: false,
        disableBottom: false,
        formRegister: {
          postal_code: '',
          street_name: '',
          street_number: '',
          neighborhood_name: '',
          city_name: '',
          state_initials: ''
        },
        rules: {
          postal_code: [
            { required: true, message: 'O campo CEP é obrigatório', trigger: 'blur' },
            { min: 8, message: 'O campo CEP deve ter 8 dígitos', trigger: 'blur' }
          ],
          street_name: [
            { required: true, message: 'O campo Nome da Rua é obrigatório', trigger: 'blur' }
          ],
          street_number: [
            { required: true, message: 'O campo Número é obrigatório', trigger: 'blur' }
          ],
          neighborhood_name: [
            { required: true, message: 'O campo Bairro é obrigatório', trigger: 'blur' }
          ],
          city_name: [
            { required: true, message: 'O campo Cidade é obrigatório', trigger: 'blur' }
          ],
          state_initials: [
            { required: true, message: 'O campo Estado é obrigatório', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const resultsForm = (this.formRegister);
            if (localStorage.getItem(this.$cookies.get("email"))) {
              this.valuesStorage = JSON.parse(localStorage.getItem(this.$cookies.get("email")));
            }
            this.valuesStorage.push(resultsForm);
            localStorage.setItem(this.$cookies.get("email"), JSON.stringify(this.valuesStorage));
            this.$message({showClose: true,message: 'Endereço salvo com sucesso!', type: 'success'});
            this.$refs[formName].resetFields();
          } else {
            this.$message({showClose: true, message: 'Erro ao salvar o endereço!', type: 'error'});
            this.disableBottom = true;
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async searchPostalCode(){
        var postal_code = this.formRegister.postal_code;
        if( postal_code!=undefined && postal_code.length == 8 ){
          this.wait = true;

          try{
            var cepCache = await cache.getData( "invalidPostalCode", "/arrayPostalCode.json");
          }catch{
            var cepCache = null
          }
    
          if(cepCache != null && cepCache.some(data => data === postal_code)){
            this.$message({ showClose: true, message: 'CEP inválido!', type: 'error'});
            this.wait = false;
            this.disableBottom=true;
          }else{
            try {
              const res = await this.$axios.get("https://dev-addresses-api.proximaporta.com/v1/postal-code/"+this.formRegister.postal_code);
              var infoAddress = res.data.item;
              this.formRegister.postal_code= infoAddress["postal_code"];
              this.formRegister.street_name= infoAddress["street_abbreviation"];
              this.formRegister.street_number= infoAddress["street_number"];
              this.formRegister.neighborhood_name= infoAddress["neighborhood_name"];
              this.formRegister.city_name= infoAddress["city_name"];
              this.formRegister.state_initials= infoAddress["state_initials"];
              this.wait = false;
              this.disableBottom = false;  
            } catch (error) {
              this.$message({ showClose: true, message: 'CEP inválido!', type: 'error'});
              this.cepCache.push(postal_code);
              cache.setCache(JSON.stringify(this.cepCache), "invalidPostalCode", "/arrayPostalCode.json")
              this.wait = false;
              this.disableBottom = true;
            }
          }
        }
      }
    }
  }
</script>
  
<style>
 .centerCard {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    font-size: 14px;
  }  
  .item {
    margin-bottom: 18px;
  }  
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }  
  .box-card {
    margin-top: 20px;
    min-width: 70%;
  }
</style>