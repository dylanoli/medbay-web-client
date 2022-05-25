<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5" v-if="mode == 'add'">
        Cadastro consulta
      </v-card-title>
      <v-card-title class="text-h5" v-if="mode == 'view'">
        Consulta
      </v-card-title>
      <v-card-title class="text-h5" v-if="mode == 'edit'">
        Alterar consulta
      </v-card-title>
      <div style="margin: 20px">
        <v-combobox
          :readonly="mode == 'view'"
          :items="medicos"
          label="Médico"
          v-model="medico"
          outlined
          dense
        ></v-combobox>
        <v-combobox
          :readonly="mode == 'view'"
          :items="pacientes"
          label="Paciente"
          v-model="paciente"
          outlined
          dense
        ></v-combobox>
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
        <v-text-field
          v-for="(obs, index) in observacoes"
          :key="index"
          :readonly="mode == 'view'"
          :value="obs"
          label="Observação"
          type="text"
          outlined
          dense
        ></v-text-field>
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
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EnderecoDTO from "@/models/EnderecoDTO";
import EnderecoInput from "@/components/EnderecoInput.vue";
import { Prop, Watch } from "vue-property-decorator";
import MedicoService from "@/services/MedicoService";
import PessoaDTO from "@/models/PessoaDTO";
import MedicoDTO from "@/models/MedicoDTO";
import PacienteService from "@/services/PacienteService";
import moment from "moment";
import ConsultaDTO from "@/models/ConsultaDTO";
import ConsultaService from "@/services/ConsultaService";

@Component({
  components: {
    EnderecoInput,
  },
})
export default class DialogActionConsultas extends Vue {
  @Prop({ required: true }) dialog!: boolean;
  @Prop() consultaId!: number;
  @Prop({ default: "add" }) mode!: string;
  @Watch("dialog")
  dialogRootChange() {
    this.$emit("update:dialog", this.dialog);
    if (this.mode !== "add") {
      this.findMedicos();
      this.findPaciente();
    }
  }
  @Watch("consultaId")
  changePessoaId() {
    if (this.mode !== "add") {
      this.findMedicos();
      this.findPaciente();
    }
  }
  @Watch("mode")
  changeMode() {
    if (this.mode !== "add") {
      this.findMedicos();
      this.findPaciente();
    }
  }
  menuData = false;
  medico: MedicoDTO | string = "";
  medicos: any[] = [];

  paciente: PessoaDTO | string = "";
  pacientes: any[] = [];
  observação = "";
  observacoes: string[] = [];
  date = moment().format("YYYY-MM-DD");
  time = moment().format("HH:mm");

  get dateFormat() {
    const vetData = this.date.split("-");
    return `${vetData[2]}/${vetData[1]}/${vetData[0]} ${this.time}`;
  }

  async findMedicos() {
    this.medicos = (await MedicoService.list()).map((el) => ({
      text: el.name,
      value: el,
    }));
  }
  async findPaciente() {
    this.pacientes = (await PacienteService.list()).map((el) => ({
      text: el.name,
      value: el,
    }));
  }

  async find() {
    const consulta = await ConsultaService.find(this.consultaId);
    console.log("consulta", consulta);
    this.medico = (await MedicoService.find(consulta.doctorId)).name;
    this.paciente = (await PacienteService.find(consulta.patientId)).name;
    this.observacoes = consulta.observations;

    const dataHora = consulta.consultationDate.split(" ");
    const data = dataHora[0];
    const hora = dataHora[1];
    const dataVet = data.split("/");
    this.date = `${dataVet[2]}-${dataVet[1]}-${dataVet[0]}`;
    this.time = hora;
  }

  async save() {
    try {
      let consulta = new ConsultaDTO();

      consulta.consultationDate = this.dateFormat;
      consulta.doctorId = ((this.medico as any).value as MedicoDTO).id;
      consulta.patientId = ((this.paciente as any).value as PessoaDTO).id;
      consulta.observations.push(this.observação);
      consulta.scheduled = moment().format("DD/MM/YYYY HH:mm");
      if (this.mode == "add") await ConsultaService.create(consulta);
      // if (this.mode == "edit") {
      //   pessoa.id = this.pessoaId;
      //   await MedicoService.update(pessoa);
      // }
      this.dialog = false;
    } catch (error) {
      console.log(error);
    }
  }
  mounted() {
    if (this.mode == "add" || this.mode == "edit") {
      this.findMedicos();
      this.findPaciente();
    }
    if (this.mode == "view" || this.mode == "edit") {
      this.find();
    }
  }
  constructor() {
    super();
  }
}
</script>

<style scoped>
</style>