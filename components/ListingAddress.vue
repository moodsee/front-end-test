<template>
    <div class="centerCard">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>Listagem de endereços cadastrados</span>
            </div>
            <div class="text item">
                <el-table :data="tableData" style="width: 100%" empty-text="Nenhum dado cadastrado!">
                    <el-table-column label="CEP" prop="postal_code"> </el-table-column>
                    <el-table-column label="Endereço" prop="street_name"> </el-table-column>
                    <el-table-column label="Rua" prop="street_number"> </el-table-column>
                    <el-table-column label="Bairro" prop="neighborhood_name"> </el-table-column>
                    <el-table-column label="Cidade" prop="city_name"> </el-table-column>
                    <el-table-column label="Estado" prop="state_initials"> </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                        <el-button type="danger" @click="deleteAddress(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>
  
<script>
    export default {
        name: "ListingAddress",
        props: [],
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
            if (localStorage.getItem(this.$cookies.get("email"))) {
                try {
                    this.tableData = JSON.parse(localStorage.getItem(this.$cookies.get("email")));
                    Object.keys(this.tableData).forEach(itemKey => {
                    this.tableData[itemKey] = JSON.parse(this.tableData[itemKey])
                    });
                } catch(e) {
                }
            }
        },
        methods: {
            deleteAddress(index, row) {    
                this.tableData.splice(index, 1);
                localStorage.setItem(this.$cookies.get("email"), JSON.stringify(this.tableData));
            }
        },
    }
  </script>
  
  <style>
    .box-card {
        margin-top: 20px;
        min-width: 70%;
    }
    .centerCard {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
  </style>
  