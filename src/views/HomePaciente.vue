<template>
  <div>
    <TopBar />
    <div class="menu-principal">
      <div class="foto-perfil">
        <img src="../assets/icon-user.png" height="80px" />
      </div>
      <div class="perfil">
        <h3 class="nome">
          Olá, <br />
          {{ user.name }}
        </h3>
      </div>
    </div>
    <h1 class="titulo">Consultas</h1>
    <div class="content-usu">
      <div>
        <div class="table">
          <v-data-table
            :headers="headers"
            :items="consultas"
            :items-per-page="6"
            class="elevation-1"
          >
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
import UserDTO from "@/models/UserDTO";
import ConsultaDTO from "@/models/ConsultaDTO";
import ConsultaService from "@/services/ConsultaService";
import MedicoService from "@/services/MedicoService";
//import DialogActionUsuario from "@/components/usuario/DialogActionUsuario.vue";
type Consulta = {
  local: string;
  medico: string;
  data: string;
};
@Component({
  components: {
    TopBar,
  },
})
export default class HomeUsuario extends Vue {
  dialogView = false;

  get user() {
    return this["$store"].state.user as UserDTO;
  }
  headers: any[] = [
    { text: "Local", value: "local" },
    { text: "Medico", value: "medico" },
    { text: "Data", value: "data" },
  ];

  consultas: Consulta[] = [];

  async list() {
    const list = await ConsultaService.list();
    for (const iterator of list) {
      iterator.doctor = await MedicoService.find(iterator.doctorId);
    }
    this.consultas = list.map((el) => ({
      local: "Clínica Medbay",
      medico: el.doctor.name,
      data: el.consultationDate,
    }));
  }
  mounted() {
    this.list();
  }
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
.foto-perfil {
  margin-left: 20%;
  width: 7%;
  display: inline-block;
}
.perfil {
  width: 7%;
  display: inline-block;
}
.nome {
  color: white;
}
.sub-menu ul {
  margin: 0%;
  background-color: white;
  list-style: none;
}
.titulo {
  margin-top: 2%;
  margin-left: 20%;
}
</style>