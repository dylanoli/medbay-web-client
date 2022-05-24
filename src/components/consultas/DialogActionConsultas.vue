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
        <v-btn>Cadastrar Paciente</v-btn>
        <v-text-field
          class="mt-7"
          :readonly="mode == 'view'"
          v-model="data"
          label="Data "
          type="text"
          v-mask="'##/##/#### ##:##'"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          :readonly="mode == 'view'"
          v-model="observacao"
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

@Component({
  components: {
    EnderecoInput,
  },
})
export default class DialogActionConsultas extends Vue {
  @Prop({ required: true }) dialog!: boolean;
  @Prop() pessoaId!: number;
  @Prop({ default: "add" }) mode!: string;
  @Watch("dialog")
  dialogRootChange() {
    this.$emit("update:dialog", this.dialog);
    if (this.mode !== "add") {
      this.findMedicos();
      this.findPaciente();
    }
  }
  @Watch("pessoaId")
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
  medico: MedicoDTO | string = "";
  medicos: any[] = [];

  paciente: PessoaDTO | string = "";
  pacientes: any[] = [];
  observacao = "";
  data = moment().format("DD/MM/yyyy HH:mm");

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
  async save() {
    try {
      let consulta = new ConsultaDTO();
      consulta.data = this.data;
      consulta.medico = this.medico as MedicoDTO;
      consulta.paciente = this.paciente as PessoaDTO;
      consulta.observacoes.push(this.observacao);

      // if (this.mode == "add") await MedicoService.create(pessoa);
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
    this.findMedicos();
    this.findPaciente();
  }
  constructor() {
    super();
  }
}
</script>

<style scoped>
</style>