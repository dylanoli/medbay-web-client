<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-alert
      class="alert"
      type="error"
      transition="scale-transition"
      id="alert-error"
      v-show="showErrorMessage()"
    >
      Erro: {{ error }}
      <v-btn icon x-small v-on:click="closeError()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-alert>

    <v-alert
      class="alert"
      type="success"
      transition="scale-transition"
      id="alert-success"
      v-show="showSuccessMessage()"
    >
      {{ success }}
      <v-btn icon x-small v-on:click="closeSuccess()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-alert>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import jwt_decode from "jwt-decode";
@Component({})
export default class App extends Vue {
  constructor() {
    super();
    const token = localStorage.getItem("token");

    if (token == null) {
      this.$router.push("/login");
    } else {
      var decoded = jwt_decode(token);
      console.log(decoded);
    }
  }
  get error() {
    return this["$store"].state.error;
  }
  get success() {
    return this["$store"].state.success;
  }
  closeError() {
    this["$store"].commit("setError", false);
  }
  showErrorMessage(): boolean {
    const { error } = this.$store.state;
    if (typeof error !== "boolean") {
      if (error && error.toString().length)
        setTimeout(this.closeError, error.toString().length * 80);
      else setTimeout(this.closeError, 5000);
    }
    return typeof error !== "boolean";
  }
  closeSuccess() {
    this["$store"].commit("setSuccess", false);
  }
  showSuccessMessage(): boolean {
    const { success } = this["$store"].state;
    if (typeof success !== "boolean")
      setTimeout(this.closeSuccess, success.length * 110);
    return typeof success !== "boolean";
  }
}
</script>


<style>
:root {
  overflow: auto;
  --primary: #7b2cbf;
  --secondary: #9d4edd;
  --accent: #c77dff;
}
</style>
