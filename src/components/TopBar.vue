<template>
  <div class="bar mb-5">
    <div class="ml-5"><img src="../assets/banner.png" height="60px" /></div>
    <a class="mr-5" @click="logout"
      ><div class="btn">
        <v-icon large color="primary">mdi-logout</v-icon>Log out
      </div></a
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import jwt_decode from "jwt-decode";
import UserDTO from "../models/UserDTO";
import Component from "vue-class-component";

@Component
export default class TopBar extends Vue {
  logout() {
    this.$router.push("/login");
  }

  constructor() {
    super();
    const token = localStorage.getItem("token");

    if (token == null) {
      this.$router.push("/login");
    } else {
      var decoded = jwt_decode(token) as any;
      var user = new UserDTO();
      user.username = decoded.sub;
      user.roles = decoded.ROLE;
      this.$store.commit("setUser", user);
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 5px;
  margin: 10px;
}
.bar {
  display: flex;
  justify-content: space-between;
}
</style>