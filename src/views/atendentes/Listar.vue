<template>
  <div>
    <TopBar />
    <div class="content-med">
      <CardMain titulo="Atendentes" img="atendente" mode="atendente" />
      <div>
        <div style="display: flex; width: 60vw">
          <v-text-field
            v-model="searchText"
            label="pesquisar atendentes"
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
            :items="atendentesSearch"
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
    <DialogActionAtendentes
      :dialog.sync="dialogEdit"
      mode="edit"
      :pessoaId="idTarget"
    />
    <DialogActionAtendentes
      :dialog.sync="dialogView"
      mode="view"
      :pessoaId="idTarget"
    />
    <DialogDeleteAtendentes :dialog.sync="dialogApaga" :pessoaId="idTarget" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import TopBar from "@/components/TopBar.vue";
import CardMain from "@/components/CardMain.vue";
import DialogActionAtendentes from "@/components/atendentes/DialogActionAtendentes.vue";
import DialogDeleteAtendentes from "@/components/atendentes/DialogDeleteAtendentes.vue";
import AtendenteService from "@/services/AtendenteService";
import moment from "moment";
import PessoaTable from "@/models/PessoaTable";

interface MenuItem {
  titulo: string;
  descricao: string;
  to: string;
}

@Component({
  components: {
    TopBar,
    CardMain,
    DialogActionAtendentes,
    DialogDeleteAtendentes,
  },
})
export default class AtendentesListar extends Vue {
  headers: any[] = [
    { text: "Nome", value: "nome" },
    { text: "CPF", value: "cpf" },
    { text: "Idade", value: "idade" },
    { text: " ", value: "action" },
  ];
  atendentesSearch: PessoaTable[] = [];
  atendentes: PessoaTable[] = [];

  dialogEdit = false;
  dialogApaga = false;
  dialogView = false;
  idTarget = 0;

  searchText = "";

  @Watch("dialogEdit")
  changedialogEdit(val: boolean) {
    if (!val) this.list();
  }

  @Watch("dialogApaga")
  changedialogApaga(val: boolean) {
    if (!val) this.list();
  }
  search() {
    this.atendentesSearch = this.atendentes.filter(
      (el) =>
        el.nome.toLowerCase().includes(this.searchText.toLowerCase()) ||
        el.cpf.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  async list() {
    const list = (await AtendenteService.list()) as any;
    this.atendentes = list.content.map((item: any) => {
      const today = moment().format("yyyy");
      const dataVet = item.birth.split("/");
      const birth = moment(`${dataVet[2]}/${dataVet[1]}/${dataVet[0]}`).format(
        "yyyy"
      );
      return {
        id: item.id,
        nome: item.name,
        cpf: item.document,
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
  constructor() {
    super();
    this.list();
  }
}
</script>

<style scoped>
.content-med {
  display: flex;
  justify-content: space-around;
}
</style>
