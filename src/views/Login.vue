<template>
  <div class="grid-login">
    <div class="col-left">
      <img src="../assets/banner.png" />
      <h1 class="space">Login.</h1>
      <p>Acesse com os dados utilizados no seu cadastro.</p>
      <div>
        <v-form ref="form">
          <v-text-field
            id="login"
            label="Login"
            outlined
            type="text"
            v-model="auth.username"
            :rules="[(v) => !!v || 'login é obrigatório']"
            dense
            required
            rounded
          ></v-text-field>
          <v-text-field
            id="password"
            v-model="auth.password"
            label="Senha"
            type="password"
            rounded
            @keydown.enter="login()"
            outlined
            :rules="[(v) => !!v || 'a senha é obrigatório']"
            dense
          ></v-text-field>
        </v-form>
        <v-btn
          block
          depressed
          rounded
          color="primary"
          v-on:click="login()"
          :loading="loadingLogin"
          >Entrar
        </v-btn>
      </div>
    </div>
    <div class="col-right">
      <img src="../assets/logo-white.png" height="250px" />
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
import AuthDTO from "@/models/AuthDTO";
import AuthService from "@/services/AuthService";

@Component
export default class LoginPage extends Vue {
  auth: AuthDTO = new AuthDTO();
  loadingLogin: boolean = false;

  async login() {
    this.loadingLogin = true;
    if ((this.$refs as any).form.validate()) {
      try {
        const token = await AuthService.login(this.auth);
        localStorage.setItem("token", token);
        this.$router.push("/");
      } catch (error) {
        this.$store.commit("setError", error);
      }
      this.loadingLogin = false;
    }
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
  padding: 12% 9%;
  height: 100vh;
}
.col-right {
  width: 50%;
  text-align: center;
  padding: 12% 9%;
  color: white;
  height: 100vh;
  background-color: var(--primary);
}
</style>