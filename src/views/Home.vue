<template>
  <div>
    <TopBar />
    <div class="container">
      <div v-for="el in menuItens" :key="el.titulo" class="card">
        <div class="card-sub">imagem</div>
        <div class="card-content">
          <h2>{{ el.titulo }}</h2>
          <div class="card-text">
            {{ el.descricao }}
          </div>
          <v-btn color="primary" block @click="goTo(el.to)">Abrir</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TopBar from "@/components/TopBar.vue";

interface MenuItem {
  titulo: string;
  descricao: string;
  to: string;
}

@Component({
  components: {
    TopBar,
  },
})
export default class Home extends Vue {
  medicos: MenuItem = {
    titulo: "Médicos",
    descricao:
      "Tenha acesso a todos os dados referentes aos Médicos da sua clínica. Adicione novos, exclua-os ou edite suas informações.",
    to: "/medicos",
  };
  atendentes: MenuItem = {
    titulo: "Atendentes",
    descricao:
      "Tenha acesso a todos os dados referentes aos Atendentes da sua clínica. Adicione novos, exclua-os ou edite suas informações.",
    to: "/atendentes",
  };
  pacientes: MenuItem = {
    titulo: "Pacientes",
    descricao:
      "Tenha acesso a todos os dados referentes aos Pacientes da sua clínica. Adicione novos, exclua-os ou edite suas informações.",
    to: "/pacientes",
  };
  menuItens: MenuItem[] = [];
  constructor() {
    super();
    this.menuItens.push(this.medicos);
    this.menuItens.push(this.atendentes);
    this.menuItens.push(this.pacientes);
  }
  goTo(link: string) {
    this.$router.push(link);
  }
}
</script>

<style scoped>
.container {
  padding: 20px 10%;
  display: flex;
  justify-content: space-around;
}
.card {
  width: 250px;
  height: 450px;
  border-radius: 35px;
  background-color: var(--secondary);
}
.card-sub {
  text-align: center;
  width: 250px;
  height: 240px;
  border-radius: 35px;
  background-color: var(--accent);
}
.card-content {
  padding: 15px;
  color: white;
}
.card-text {
  height: 100px;
}
</style>
