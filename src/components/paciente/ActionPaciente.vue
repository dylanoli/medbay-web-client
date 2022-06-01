<template>
  <div>
    <v-text-field
      v-model="target.document"
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
      v-model="target.name"
      label="Nome*"
      type="text"
      outlined
      :rules="[(v) => !!v || 'nome é obrigatório']"
      dense
    ></v-text-field>
    <div v-if="!readonly">
      <v-btn
        class="mr-5 mb-5"
        :color="target.gender == 'MALE' ? 'primary' : ''"
        @click="target.gender = 'MALE'"
        >Masculino</v-btn
      >
      <v-btn
        class="mb-5"
        :color="target.gender == 'FEMALE' ? 'primary' : ''"
        @click="target.gender = 'FEMALE'"
        >Feminino</v-btn
      >
    </div>
    <v-text-field
      v-else
      :value="target.gender == 'MALE' ? 'Masculino' : 'Feminino'"
      label="Gênero"
      outlined
      dense
      readonly
    />
    <v-text-field
      :readonly="readonly"
      v-model="target.birth"
      label="Data de nascimento"
      type="text"
      v-mask="'##/##/####'"
      outlined
      dense
    ></v-text-field>
    <EnderecoInput :target.sync="target.address" :readonly="readonly" />
    <v-text-field
      v-for="(el, index) in target.medaData"
      :key="index"
      :readonly="readonly"
      v-model="el.value"
      :label="el.key"
      type="text"
      outlined
      dense
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EnderecoInput from "@/components/EnderecoInput.vue";
import PessoaDTO from "@/models/PessoaDTO";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    EnderecoInput,
  },
})
export default class ActionPaciente extends Vue {
  @Prop({ default: false }) readonly!: boolean;
  @Prop({ required: true }) target!: PessoaDTO;

  constructor() {
    super();
  }
}
</script>

<style scoped>
</style>