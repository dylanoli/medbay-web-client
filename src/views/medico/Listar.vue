<template>
  <div>
    <TopBar />
    <div class="content-med">
      <CardMain titulo="Médicos" img="medico" />
      <div>
        <div style="display: flex; width: 60vw">
          <v-text-field
            v-model="searchText"
            label="pesquisar médico"
            prepend-icon="mdi-magnify"
            outlined
            dense
            class="mr-5"
            @keyup.enter="search()"
          ></v-text-field>
          <v-btn color="primary" @click="search()">buscar</v-btn>
        </div>
        <div class="table">
          <v-data-table
            :headers="headers"
            :items="medicosSearch"
            :items-per-page="6"
            class="elevation-1"
          >
            <template v-slot:item.action="{ item }">
              <v-btn icon color="primary" @click="openVer(item.id)">
                <v-icon>mdi-eye-outline</v-icon>
              </v-btn>
              <v-btn icon color="primary" @click="openEditar(item.id)">
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-btn>
              <v-btn icon color="primary" @click="openApagar(item.id)">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>

    <DialogActionMedico
      :dialog.sync="dialogEdit"
      mode="edit"
      :pessoaId="idTarget"
    />
    <DialogActionMedico
      :dialog.sync="dialogView"
      mode="view"
      :pessoaId="idTarget"
    />
    <DialogDeleteMedico :dialog.sync="dialogApaga" :pessoaId="idTarget" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import TopBar from "@/components/TopBar.vue";
import CardMain from "@/components/CardMain.vue";
import DialogActionMedico from "@/components/medicos/DialogActionMedico.vue";
import DialogDeleteMedico from "@/components/medicos/DialogDeleteMedico.vue";
import moment from "moment";
import MedicoService from "@/services/MedicoService";
import MedicoTable from "@/models/MedicoTable";

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

  idTarget = 0;
  searchText = "";
  medicosSearch: MedicoTable[] = [];
  medicos: any[] = [];

  @Watch("dialogEdit")
  changedialogEdit(val: boolean) {
    if (!val) this.list();
  }

  @Watch("dialogApaga")
  changedialogApaga(val: boolean) {
    if (!val) this.list();
  }

  constructor() {
    super();
    this.list();
  }

  search() {
    console.log("ola");
    this.medicosSearch = this.medicos.filter(
      (el) =>
        el.nome.toLowerCase().includes(this.searchText.toLowerCase()) ||
        el.cpf.toLowerCase().includes(this.searchText.toLowerCase()) ||
        el.crm.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  async list() {
    const list = await MedicoService.list();
    this.medicos = list.map((item: any) => {
      const today = moment().format("yyyy");
      const dataVet = item.birth.split("/");
      const birth = moment(`${dataVet[2]}/${dataVet[1]}/${dataVet[0]}`).format(
        "yyyy"
      );
      return {
        id: item.id,
        nome: item.name,
        cpf: item.document,
        crm: item.crm,
        idade: +today - +birth,
      };
    });
    this.search();
  }
  openVer(id: number) {
    this.idTarget = id;
    this.dialogView = true;
  }

  openEditar(id: number) {
    this.idTarget = id;
    this.dialogEdit = true;
  }

  openApagar(id: number) {
    this.idTarget = id;
    this.dialogApaga = true;
  }
  headers: any[] = [
    { text: "CRM", value: "crm" },
    { text: "Nome", value: "nome" },
    { text: "CPF", value: "cpf" },
    { text: "Idade", value: "idade" },
    { text: " ", value: "action" },
  ];
}
</script>

<style scoped>
.content-med {
  display: flex;
  justify-content: space-around;
}
</style>
