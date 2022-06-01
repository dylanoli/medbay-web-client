<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5" v-if="mode == 'add'">
        Cadastro do Paciente
      </v-card-title>
      <v-card-title class="text-h5" v-if="mode == 'view'">
        Paciente
      </v-card-title>
      <v-card-title class="text-h5" v-if="mode == 'edit'">
        Alterar Paciente
      </v-card-title>
      <div style="margin: 20px">
        <action-paciente :target.sync="pessoa" :readonly="mode == 'view'" />
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
import ActionPaciente from "@/components/paciente/ActionPaciente.vue";
import EnderecoInput from "@/components/EnderecoInput.vue";
import PessoaDTO from "@/models/PessoaDTO";
import PacienteService from "@/services/PacienteService";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    EnderecoInput,
    ActionPaciente,
  },
})
export default class DialogActionPaciente extends Vue {
  @Prop({ required: true }) dialog!: boolean;
  @Prop() pessoaId!: number;
  @Prop({ default: "add" }) mode!: string;
  @Watch("dialog")
  dialogRootChange() {
    this.$emit("update:dialog", this.dialog);
    if (this.mode !== "add") {
      this.find();
    }
  }
  @Watch("pessoaId")
  changePessoaId() {
    if (this.mode !== "add") {
      this.find();
    }
  }
  @Watch("mode")
  changeMode() {
    if (this.mode !== "add") {
      this.find();
    }
  }

  cpf = "";
  nome = "";
  dataNascimento = "";
  genero = "Masculino";

  pessoa = new PessoaDTO();
  async find() {
    this.pessoa = (await PacienteService.find(this.pessoaId)) as any;
  }
  async save() {
    this.pessoa.username = this.pessoa.document;
    this.pessoa.password = "senha123";

    if (this.mode == "add") await PacienteService.create(this.pessoa);
    if (this.mode == "edit") {
      this.pessoa.id = this.pessoaId;
      await PacienteService.update(this.pessoa);
    }
    this.dialog = false;
  }
  constructor() {
    super();
    this.pessoa.medaData = [
      {
        id: 0,
        key: "Restrições médicas",
        value: "",
        createdAt: new Date(),
      },
      {
        id: 0,
        key: "Observação",
        value: "",
        createdAt: new Date(),
      },
      {
        id: 0,
        key: "Contato de um terceiro",
        value: "",
        createdAt: new Date(),
      },
      {
        id: 0,
        key: "Tipo Sanguíneo",
        value: "",
        createdAt: new Date(),
      },
    ];
  }
}
</script>

<style scoped>
</style>