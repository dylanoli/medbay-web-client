<template>
  <div>
    <TopBar />
    <div class="content-med">
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
    <DialogMedicoConsultas
      :dialog.sync="dialogView"
      modeInit="view"
      :consultaId="idTarget"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import TopBar from "@/components/TopBar.vue";
import CardMain from "@/components/CardMain.vue";
import ConsultaService from "@/services/ConsultaService";
import PacienteService from "@/services/PacienteService";
import DialogMedicoConsultas from "@/components/consultas/DialogMedicoConsultas.vue";
interface CalendarType {
  text: string;
  value: string;
}
@Component({
  components: {
    TopBar,
    CardMain,
    DialogMedicoConsultas,
  },
})
export default class ConsultaMedicoListar extends Vue {
  type: string = "day";
  types: CalendarType[] = [
    { text: "Mensal", value: "month" },
    { text: "Semanal", value: "week" },
    { text: "Dia", value: "day" },
  ];
  weekday = [0, 1, 2, 3, 4, 5, 6];
  value = "";
  events: any[] = [];
  colors = ["blue", "indigo", "deep-purple", "cyan", "green", "orange"];

  dialogEdit = false;
  dialogView = false;
  idTarget = 0;

  searchText = "";

  @Watch("dialogEdit")
  changedialogEdit(val: boolean) {
    if (!val) this.getEvents();
  }

  async list() {
    const list = await ConsultaService.list();
    for (const iterator of list) {
      iterator.patient = await PacienteService.find(iterator.patientId);
    }

    return list;
  }

  openVer(e: any) {
    this.idTarget = e.event.id;
    this.dialogView = true;
  }

  openEditar(id: number) {
    this.idTarget = id;
    this.dialogEdit = true;
  }

  async getEvents() {
    const events = [];
    const consultas = await this.list();
    console.log("consultas", consultas);
    for (let i = 0; i < consultas.length; i++) {
      const dataHoraVet = consultas[i].consultationDate.split(" ");
      const data = dataHoraVet[0];
      const hora = dataHoraVet[1];
      const dataVet = data.split("/");
      const dateFormatted = `${dataVet[2]}-${dataVet[1]}-${dataVet[0]}T${hora}`;
      console.log("dateFormatted", dateFormatted);
      const first = new Date(dateFormatted);
      let second = new Date(dateFormatted);
      second.setTime(second.getTime() + 1 * 60 * 60 * 1000);

      events.push({
        id: consultas[i].id,
        name: consultas[i].patient.name,
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
