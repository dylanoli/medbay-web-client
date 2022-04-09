<template>
  <div>
    <TopBar />
    <div class="container">
      <h1>Paciente</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TopBar from "@/components/TopBar.vue";

@Component({
  components: {
    TopBar,
  },
})
export default class HomePaciente extends Vue {}
</script>

<style scoped>
</style>
