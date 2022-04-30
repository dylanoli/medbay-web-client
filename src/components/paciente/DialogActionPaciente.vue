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
        <v-text-field
          v-model="cpf"
          label="CPF*"
          type="text"
          :readonly="mode == 'view'"
          v-mask="'###.###.###-##'"
          :rules="[(v) => !!v || 'CPF é obrigatório']"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          :readonly="mode == 'view'"
          id="name"
          v-model="nome"
          label="Nome*"
          type="text"
          outlined
          :rules="[(v) => !!v || 'nome é obrigatório']"
          dense
        ></v-text-field>
        <div v-if="mode !== 'view'">
          <v-btn
            class="mr-5 mb-5"
            :color="genero == 'masculino' ? 'primary' : ''"
            @click="genero = 'masculino'"
            >Masculino</v-btn
          >
          <v-btn
            class="mb-5"
            :color="genero == 'feminino' ? 'primary' : ''"
            @click="genero = 'feminino'"
            >Feminino</v-btn
          >
        </div>
        <div v-else>
          <v-text-field
            readonly
            v-model="genero"
            label="Gênero*"
            type="text"
            outlined
            dense
          ></v-text-field>
        </div>
        <v-text-field
          :readonly="mode == 'view'"
          v-model="dataNascimento"
          label="Data de nascimento"
          type="text"
          v-mask="'##/##/####'"
          outlined
          dense
        ></v-text-field>
        <EnderecoInput :target.sync="endereco" :readonly="mode == 'view'" />
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false"> Fechar </v-btn>
        <v-btn color="primary" dark @click="save()" v-if="mode == 'add'">
          Cadastrar
        </v-btn>
        <v-btn
          color="primary"
          dark
          @click="dialog = false"
          v-if="mode == 'edit'"
        >
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
import PessoaDTO from "@/models/PessoaDTO";
import PacienteService from "@/services/PacienteService";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    EnderecoInput,
  },
})
export default class DialogActionMedico extends Vue {
  @Prop({ required: true }) dialog!: boolean;
  @Prop({ default: "add" }) mode!: boolean;
  @Watch("dialog")
  dialogRootChange() {
    this.$emit("update:dialog", this.dialog);
  }
  cpf = "";
  nome = "";
  dataNascimento = "";
  genero = "masculino";
  endereco = new EnderecoDTO();

  async save() {
    let pessoa = new PessoaDTO();
    pessoa.document = this.cpf;
    pessoa.name = this.nome;
    pessoa.username = this.cpf;
    pessoa.password = "senha123";

    const dataVet = this.dataNascimento.split("/");
    pessoa.birth = `${dataVet[0]}-${dataVet[1]}-${dataVet[2]}`;
    pessoa.gender = this.genero == "masculino" ? "MALE" : "FEMALE";
    pessoa.address.cep = this.endereco.cep;
    pessoa.address.street = this.endereco.rua;
    pessoa.address.number = this.endereco.numero;
    pessoa.address.country = this.endereco.bairro;
    pessoa.address.city = this.endereco.cidade;
    pessoa.address.uf = this.endereco.uf;
    await PacienteService.create(pessoa);
    this.dialog = false;
  }
}
</script>

<style scoped>
</style>