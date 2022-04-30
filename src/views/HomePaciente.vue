<template>
  <div>
    <TopBar />
    <div class="container">
      <h1>Paciente</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import TopBar from "@/components/TopBar.vue";
import UserDTO from "@/models/UserDTO";

@Component({
  components: {
    TopBar,
  },
})
export default class HomePaciente extends Vue {
  get user() {
    return this["$store"].state.user as UserDTO;
  }

  @Watch("user")
  changeUser() {
    if (this.user.roles.some((el) => el.authority !== "ROLE_PACIENTE")) {
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
</style>
