<template>
  <div>
    <TopBar />
    <div class="content-med">
      <CardMain titulo="Pacientes" />
      <div>
        <div style="display: flex; width: 60vw">
          <v-text-field
            label="pesquisar pacientes"
            prepend-icon="mdi-magnify"
            outlined
            dense
            class="mr-5"
          ></v-text-field>
          <v-btn color="primary">buscar</v-btn>
        </div>
        <div class="table">
          <v-data-table
            :headers="headers"
            :items="medicos"
            :items-per-page="6"
            class="elevation-1"
          >
            <template v-slot:item.action="{ item }">
              <v-btn icon color="primary">
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-btn>
              <v-btn icon color="primary">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TopBar from "@/components/TopBar.vue";
import CardMain from "@/components/CardMain.vue";
import Medico from "@/models/Medico";

interface MenuItem {
  titulo: string;
  descricao: string;
  to: string;
}

@Component({
  components: {
    TopBar,
    CardMain,
  },
})
export default class PacientesListar extends Vue {
  headers: any[] = [
    { text: "CRM", value: "crm" },
    { text: "Nome", value: "nome" },
    { text: "CPF", value: "cpf" },
    { text: "Idade", value: "idade" },
    { text: " ", value: "action" },
  ];
  medicos: Medico[] = [
    {
      crm: "00000000-0/BR",
      nome: "Joao Macedo Cunha",
      cpf: "000.000.000-00",
      idade: 40,
    },
    {
      crm: "00000000-0/BR",
      nome: "Joao Macedo Cunha",
      cpf: "000.000.000-00",
      idade: 40,
    },
    {
      crm: "00000000-0/BR",
      nome: "Joao Macedo Cunha",
      cpf: "000.000.000-00",
      idade: 40,
    },
    {
      crm: "00000000-0/BR",
      nome: "Joao Macedo Cunha",
      cpf: "000.000.000-00",
      idade: 40,
    },
    {
      crm: "00000000-0/BR",
      nome: "Joao Macedo Cunha",
      cpf: "000.000.000-00",
      idade: 40,
    },
    {
      crm: "00000000-0/BR",
      nome: "Joao Macedo Cunha",
      cpf: "000.000.000-00",
      idade: 40,
    },
    {
      crm: "00000000-0/BR",
      nome: "Joao Macedo Cunha",
      cpf: "000.000.000-00",
      idade: 40,
    },
    {
      crm: "00000000-0/BR",
      nome: "Joao Macedo Cunha",
      cpf: "000.000.000-00",
      idade: 40,
    },
    {
      crm: "00000000-0/BR",
      nome: "Joao Macedo Cunha",
      cpf: "000.000.000-00",
      idade: 40,
    },
    {
      crm: "00000000-0/BR",
      nome: "Joao Macedo Cunha",
      cpf: "000.000.000-00",
      idade: 40,
    },
    {
      crm: "00000000-0/BR",
      nome: "Joao Macedo Cunha",
      cpf: "000.000.000-00",
      idade: 40,
    },
  ];
}
</script>

<style scoped>
.content-med {
  display: flex;
  justify-content: space-around;
}
</style>
