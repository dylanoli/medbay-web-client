<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5"> Consulta </v-card-title>
      <div style="margin: 20px">
        <strong>Medico:</strong> {{ medico.name }}
        <br />
        <strong>Paciente:</strong>
        <ActionPaciente :readonly="true" :target.sync="paciente" />
        <v-text-field
          outlined
          v-model="dateFormat"
          label="Data da consulta"
          dense
          prepend-icon="mdi-calendar"
          readonly
        ></v-text-field>
        Observações:
        <div v-for="(obs, index) in consulta.observations" :key="index">
          <p>{{ obs }}</p>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false"> Fechar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import MedicoService from "@/services/MedicoService";
import PessoaDTO from "@/models/PessoaDTO";
import MedicoDTO from "@/models/MedicoDTO";
import PacienteService from "@/services/PacienteService";
import moment from "moment";
import ConsultaDTO from "@/models/ConsultaDTO";
import ConsultaService from "@/services/ConsultaService";
import ActionPaciente from "../paciente/ActionPaciente.vue";

@Component({
  components: {
    ActionPaciente,
  },
})
export default class DialogMedicoConsultas extends Vue {
  @Prop({ required: true }) dialog!: boolean;
  @Prop() consultaId!: number;

  dialogDelete = false;
  @Watch("dialog")
  dialogRootChange() {
    this.$emit("update:dialog", this.dialog);
  }
  @Watch("consultaId")
  changePessoaId() {
    this.find();
  }

  get dateFormat() {
    const vetData = this.date.split("-");
    return `${vetData[2]}/${vetData[1]}/${vetData[0]} ${this.time}`;
  }
  menuData = false;
  medico: MedicoDTO = new MedicoDTO();

  paciente: PessoaDTO = new PessoaDTO();
  observacao = "";
  date = moment().format("YYYY-MM-DD");
  time = moment().format("HH:mm");
  consulta: ConsultaDTO = new ConsultaDTO();

  async deletePessoa() {
    await ConsultaService.delete(this.consultaId);
    this.dialogDelete = false;
    this.dialog = false;
  }
  async find() {
    this.consulta = await ConsultaService.find(this.consultaId);
    this.medico = await MedicoService.find(this.consulta.doctorId);
    this.paciente = await PacienteService.find(this.consulta.patientId);

    const dataHora = this.consulta.consultationDate.split(" ");
    const data = dataHora[0];
    const hora = dataHora[1];
    const dataVet = data.split("/");
    this.date = `${dataVet[2]}-${dataVet[1]}-${dataVet[0]}`;
    this.time = hora;
  }

  async save() {
    try {
      this.consulta.observations.push(this.observacao);
      await ConsultaService.update(this.consulta);
      this.dialog = false;
    } catch (error) {
      console.log(error);
    }
  }
  mounted() {
    this.find();
  }
  constructor() {
    super();
  }
}
</script>

<style scoped>
</style>