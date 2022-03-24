<template>
  <div class="grid-login">
    <div class="col-left">
      <h1 class="space">Login.</h1>
      <p>Acesse com os dados utilizados no seu cadastro.</p>
      <div>
        <v-form ref="form">
          <v-text-field
            label="Login"
            outlined
            type="text"
            :rules="[(v) => !!v || 'login é obrigatório']"
            dense
            required
            v-model="cpf"
          ></v-text-field>
          <v-text-field
            v-model="senha"
            label="Senha"
            type="password"
            @keydown.enter="login()"
            outlined
            :rules="[(v) => !!v || 'a senha é obrigatório']"
            dense
          ></v-text-field>
        </v-form>
        <v-btn
          block
          depressed
          color="primary"
          v-on:click="login()"
          :loading="loadingLogin"
          >Entrar
        </v-btn>
      </div>
    </div>
    <div class="col-right">
      <h3>Gerenciamento Inteligente</h3>
      <p>
        O MedBay® – Sistema de Gestão Hospitalar, é um ERP que promove a
        excelência na gestão de instituições de saúde de todos os portes, além
        de clínicas.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class LoginPage extends Vue {
  cpf: string = "";
  senha: string = "";
  loadingLogin: boolean = false;
  async login() {
    this.loadingLogin = true;
    this.$router.push("/");
    this.loadingLogin = false;
  }
}
</script>

<style scoped>
.grid-login {
  display: flex;
}
.col-left {
  width: 50%;
  text-align: left;
  padding: 15% 9%;
  height: 100vh;
}
.col-right {
  width: 50%;
  text-align: center;
  padding: 15% 9%;
  color: white;
  height: 100vh;
  background-color: var(--primary);
}
</style>