<template>
  <div>
    <TopBar />
    <div class="content-med">
      <CardMain titulo="Consultas" img="consulta" mode="consulta" />
      <div>
        <div style="width: 60vw">
          <v-sheet tile height="54" class="d-flex">
            <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-select
              v-model="type"
              :items="types"
              dense
              outlined
              hide-details
              class="ma-2"
              label="Período"
            ></v-select>
            <v-btn icon class="ma-2" @click="$refs.calendar.next()">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              locale="pt-BR"
              ref="calendar"
              v-model="value"
              :weekdays="weekday"
              :type="type"
              :events="events"
              event-overlap-mode="stack"
              :event-overlap-threshold="30"
              :event-color="getEventColor"
              @change="getEvents"
              @click:event="openVer"
            >
            </v-calendar>
          </v-sheet>
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
import moment, { min } from "moment";
import PessoaTable from "@/models/PessoaTable";
import ConsultaDTO from "@/models/ConsultaDTO";
interface CalendarType {
  text: string;
  value: string;
}
@Component({
  components: {
    TopBar,
    CardMain,
    DialogActionAtendentes,
    DialogDeleteAtendentes,
  },
})
export default class ConsultaAtendenteListar extends Vue {
  type: string = "week";
  types: CalendarType[] = [
    { text: "Mensal", value: "month" },
    { text: "Semanal", value: "week" },
    { text: "Dia", value: "day" },
  ];
  weekday = [0, 1, 2, 3, 4, 5, 6];
  value = "";
  events: any[] = [];
  colors = ["blue", "indigo", "deep-purple", "cyan", "green", "orange"];

  // consultas: ConsultaDTO[] = [];

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

  list() {
    // const list = (await AtendenteService.list()) as any;
    const cons1 = new ConsultaDTO();
    cons1.id = 1;
    cons1.paciente.name = "José Lopes";
    cons1.data = "2022-05-16T14:00";
    const cons2 = new ConsultaDTO();
    cons1.id = 2;
    cons2.paciente.name = "Maria das Chagas";
    cons2.data = "2022-05-16T17:00";
    const cons3 = new ConsultaDTO();
    cons1.id = 3;
    cons3.paciente.name = "Mário Vilela";
    cons3.data = "2022-05-17T14:00";
    const cons4 = new ConsultaDTO();
    cons1.id = 4;
    cons4.paciente.name = "Sandra Maria";
    cons4.data = "2022-05-20T15:00";
    const cons5 = new ConsultaDTO();
    cons1.id = 5;
    cons5.paciente.name = "Sandra Maria";
    cons5.data = "2022-05-19T17:30";
    return [cons1, cons2, cons3, cons4, cons5];
  }

  openVer(e: any) {
    this.idTarget = e.event.id;
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

  getEvents(e: any) {
    const events = [];
    const consultas = this.list();
    for (let i = 0; i < consultas.length; i++) {
      const first = new Date(consultas[i].data);
      let second = new Date(consultas[i].data);
      second.setTime(second.getTime() + 1 * 60 * 60 * 1000);

      events.push({
        id: consultas[i].id,
        name: consultas[i].paciente.name,
        start: first,
        end: second,
        color: this.colors[i % this.colors.length],
        timed: true,
      });
    }

    this.events = events;
  }
  getEventColor(event: any) {
    return event.color;
  }
  rnd(a: number, b: number) {
    return Math.floor((b - a + 1) * Math.random()) + a;
  }
  mounted() {
    const hora = new Date().getHours();
    const minuto = new Date().getMinutes();
    console.log("new Date().getTime()", `${hora - 1}:${minuto}`);
    (this.$refs as any).calendar.scrollToTime(`${hora - 1}:${minuto}`);
  }
  constructor() {
    super();
    this.list();
    // (this.$refs as any).calendar.scrollToTime("08:00");
  }
}
</script>

<style scoped>
.content-med {
  display: flex;
  justify-content: space-around;
}
</style>
