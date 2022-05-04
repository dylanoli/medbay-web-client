<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5" v-if="mode == 'add'">
        Cadastro do Atendente
      </v-card-title>
      <v-card-title class="text-h5" v-if="mode == 'view'">
        Atendente
      </v-card-title>
      <v-card-title class="text-h5" v-if="mode == 'edit'">
        Alterar Atendente
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
            :color="genero == 'Masculino' ? 'primary' : ''"
            @click="genero = 'Masculino'"
            >Masculino</v-btn
          >
          <v-btn
            class="mb-5"
            :color="genero == 'Feminino' ? 'primary' : ''"
            @click="genero = 'Feminino'"
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
import PessoaDTO from "@/models/PessoaDTO";
import AtendenteService from "@/services/AtendenteService";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    EnderecoInput,
  },
})
export default class DialogActionAtendentes extends Vue {
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
  endereco = new EnderecoDTO();
  async find() {
    const pessoa = (await AtendenteService.find(this.pessoaId)) as any;
    this.cpf = pessoa.document;
    this.nome = pessoa.name;
    this.genero = pessoa.gender == "MALE" ? "Masculino" : "Feminino";
    this.dataNascimento = pessoa.birth;

    this.endereco.cep = pessoa.address.cep;
    this.endereco.rua = pessoa.address.street;
    this.endereco.numero = pessoa.address.number;
    this.endereco.bairro = pessoa.address.country;
    this.endereco.cidade = pessoa.address.city;
    this.endereco.uf = pessoa.address.uf;
  }
  async save() {
    let pessoa = new PessoaDTO();
    pessoa.document = this.cpf;
    pessoa.name = this.nome;
    pessoa.username = this.cpf;
    pessoa.password = "senha123";

    const dataVet = this.dataNascimento.split("/");
    pessoa.birth = `${dataVet[0]}/${dataVet[1]}/${dataVet[2]}`;
    pessoa.gender = this.genero == "Masculino" ? "MALE" : "FEMALE";
    pessoa.address.cep = this.endereco.cep;
    pessoa.address.street = this.endereco.rua;
    pessoa.address.number = this.endereco.numero;
    pessoa.address.country = this.endereco.bairro;
    pessoa.address.city = this.endereco.cidade;
    pessoa.address.uf = this.endereco.uf;
    if (this.mode == "add") await AtendenteService.create(pessoa);
    if (this.mode == "edit") {
      pessoa.id = this.pessoaId;
      await AtendenteService.update(pessoa);
    }
    this.dialog = false;
  }
  constructor() {
    super();
  }
}
</script>

<style scoped>
</style>