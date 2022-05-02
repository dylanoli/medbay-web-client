<template>
  <div>
    <TopBar />
    <div class="menu-principal"></div>
    <div class="content-usu">
      <div>
        <div style="display: flex; width: 60vw">
          <v-text-field
            label="Pesquisar consultas"
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
            :items="consultas"
            :items-per-page="6"
            class="elevation-1"
          >
            <template v-slot:item.action="{ item }">
              <v-btn icon color="primary" @click="openVer()">
                <v-icon>mdi-eye-outline</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>

    <DialogActionUsuario :dialog.sync="dialogView" mode="view" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TopBar from "@/components/TopBar.vue";
import Consulta from "@/models/Consulta";
//import DialogActionUsuario from "@/components/usuario/DialogActionUsuario.vue";

@Component({
  components: {
    TopBar,
    // DialogActionUsuario,
  },
})
export default class HomeUsuario extends Vue {
  dialogView = false;
  headers: any[] = [
    { text: "Nome", value: "nome" },
    { text: "Local", value: "local" },
    { text: "Valor", value: "valor" },
    { text: "Data", value: "data" },
    { text: " ", value: "action" },
  ];

      consultas: Consulta[] = [
        {
        nome: "Consulta de vista",
        local: "Rua das Flores",
        valor: 40,
        data: "03/04/200"

        },
        {
        nome: "Consulta de vista",
        local: "Rua das Flores",
        valor: 40,
        data: "03/04/200"

        },
        {
        nome: "Consulta de vista",
        local: "Rua das Flores",
        valor: 40,
        data: "03/04/200"

        },
        {
        nome: "Consulta de vista",
        local: "Rua das Flores",
        valor: 40,
        data: "03/04/200"

        },
        {
        nome: "Consulta de vista",
        local: "Rua das Flores",
        valor: 40,
        data: "03/04/200"

        },
        {
        nome: "Consulta de vista",
        local: "Rua das Flores",
        valor: 40,
        data: "03/04/200"

        },
    ]
}

</script>

<style scoped>
.content-usu {
  margin-top: 2%;
  display: flex;
  justify-content: center;
}
.menu-principal {
  margin: 0;
  background-color: #5a189a;
  list-style: none;
  padding: 100px 10px;
}
</style>