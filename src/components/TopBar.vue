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
import Component from "vue-class-component";

@Component
export default class TopBar extends Vue {
  logout() {
    this.$router.push("/login");
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