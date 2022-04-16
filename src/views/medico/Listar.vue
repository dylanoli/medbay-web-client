<template>
  <div>
    <TopBar />
    <div class="content-med">
      <CardMain titulo="Médicos" img="medico" />
      <div>
        <div style="display: flex; width: 60vw">
          <v-text-field
            label="pesquisar médico"
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
              <v-btn icon color="primary" @click="openVer()">
                <v-icon>mdi-eye-outline</v-icon>
              </v-btn>
              <v-btn icon color="primary" @click="openEditar()">
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-btn>
              <v-btn icon color="primary" @click="openApagar()">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>

    <DialogActionMedico :dialog.sync="dialogEdit" mode="edit" />
    <DialogActionMedico :dialog.sync="dialogView" mode="view" />
    <DialogDeleteMedico :dialog.sync="dialogApaga" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TopBar from "@/components/TopBar.vue";
import CardMain from "@/components/CardMain.vue";
import DialogActionMedico from "@/components/DialogActionMedico.vue";
import DialogDeleteMedico from "@/components/DialogDeleteMedico.vue";
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
    DialogActionMedico,
    DialogDeleteMedico,
  },
})
export default class MedicoListar extends Vue {
  dialogEdit = false;
  dialogApaga = false;
  dialogView = false;

  openVer() {
    this.dialogView = true;
  }

  openEditar() {
    this.dialogEdit = true;
  }

  openApagar() {
    this.dialogApaga = true;
  }
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
