<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5"> Consulta </v-card-title>
      <div style="margin: 20px">
        <strong>Medico:</strong> {{ medico.name }}
        <br />
        <strong>Paciente:</strong>
        <div><strong>Nome:</strong> {{ paciente.name }}</div>

        <!-- <v-btn>Cadastrar Paciente</v-btn> -->
        <v-menu
          ref="menuData"
          v-model="menuData"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              outlined
              v-model="dateFormat"
              label="Data"
              dense
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-card elevation="2">
            <v-card-text>
              <v-date-picker v-model="date" no-title scrollable>
              </v-date-picker>
              <v-time-picker
                no-title
                scrollable
                format="24hr"
                v-model="time"
              ></v-time-picker>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="primary" @click="menuData = false"> OK </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-text-field
          v-if="mode == 'add'"
          v-model="observação"
          label="Observação"
          type="text"
          outlined
          dense
        ></v-text-field>
        <div v-for="(obs, index) in consulta.observations" :key="index">
          <p>{{ obs }}</p>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false"> Fechar </v-btn>
        <v-btn color="primary" dark @click="save()" v-if="mode == 'add'">
          Cadastrar
        </v-btn>
        <v-btn color="primary" dark @click="save()" v-if="mode == 'edit'">
          Alterar
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialogDelete" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h5">Apagar consulta</v-card-title>
        <v-card-text>
          Tem certeza que deseja apagar essa consulta?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"> Cancelar </v-btn>
          <v-btn color="red darken-1" dark @click="deletePessoa()">
            Apagar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

@Component({
  components: {},
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