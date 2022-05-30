<template>
  <div style="margin: 20px">
    <v-text-field
      v-model="pessoa.document"
      label="CPF*"
      type="text"
      :readonly="readonly"
      v-mask="'###.###.###-##'"
      :rules="[(v) => !!v || 'CPF é obrigatório']"
      outlined
      dense
    ></v-text-field>
    <v-text-field
      :readonly="readonly"
      id="name"
      v-model="pessoa.name"
      label="Nome*"
      type="text"
      outlined
      :rules="[(v) => !!v || 'nome é obrigatório']"
      dense
    ></v-text-field>
    <div v-if="!readonly">
      <v-btn
        class="mr-5 mb-5"
        :color="pessoa.gender == 'MALE' ? 'primary' : ''"
        @click="pessoa.gender = 'MALE'"
        >Masculino</v-btn
      >
      <v-btn
        class="mb-5"
        :color="pessoa.gender == 'FEMALE' ? 'primary' : ''"
        @click="pessoa.gender = 'FEMALE'"
        >Feminino</v-btn
      >
    </div>
    <v-text-field
      v-else
      :value="pessoa.gender == 'MALE' ? 'Masculino' : 'Feminino'"
      label="Gênero"
      outlined
      dense
      readonly
    />
    <v-text-field
      :readonly="readonly"
      v-model="pessoa.birth"
      label="Data de nascimento"
      type="text"
      v-mask="'##/##/####'"
      outlined
      dense
    ></v-text-field>
    <EnderecoInput :target.sync="pessoa.address" :readonly="readonly" />
  </div>
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
export default class ActionPaciente extends Vue {
  @Prop({ default: false }) readonly!: boolean;
  @Prop({ required: true }) target!: PessoaDTO;

  @Watch("target")
  changeTarget() {
    this.pessoa = this.target;
  }

  pessoa = new PessoaDTO();

  constructor() {
    super();
  }
}
</script>

<style scoped>
</style>